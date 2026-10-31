# Multi-representation scenes

## Goal

Let users compose multiple representations in a single rendered scene — e.g.
a SAS surface plus a ball-and-stick model on the same molecule, or two
molecules overlaid. The API should follow Julia's compositional plot idiom
(Makie / Plots `plot!`): single-call constructors for the common case, and
mutating `!` variants for incremental composition.

```julia
# one-liner (unchanged from today's UX)
ball_and_stick(sys)

# composing in a single scene
scene = Scene()
ball_and_stick!(scene, sys1)
sas!(scene, sys2; coloring = "chain")
scene                                  # shown via display(scene)

# chaining
scene = sas!(Scene(), sys; coloring = "chain")
ball_and_stick!(scene, sys)
```

## Non-goals (this design doc)

- A sidebar UI for adding/removing/reordering representations. Tracked as a
  follow-up; the API in this doc is the prerequisite.
- Coordinating menus (Model/Color/Density) across multiple representations.
  In this first pass, those menus continue to drive a single "active"
  representation; the rest are read-only.
- Cross-representation linking (synchronised camera between two scenes,
  shared selection highlight across reps, etc.).

---

## Julia types

```julia
# A representation packaged for rendering. `repr` is the existing
# Representation{T} (primitives + colors + meta + flags + mesh). We also keep
# the inputs that produced it so we can rebuild on coloring/density change.
mutable struct DisplayedRepresentation{T<:Real}
    repr::Representation{T}
    source::AbstractAtomContainer            # what produced this repr
    type::String                              # "BALL_AND_STICK" | "STICK" | "VAN_DER_WAALS" | "SAS" | "SES"
    coloring::String                          # element / chain / residue / residue_index / solid
    density::String                           # density level name ("low" / "medium" / "high" / "ultra")
    probe_radius::Real
    solid_color::String
    visible::Bool
end

# A composable scene. Holds an ordered list of representations plus
# display-wide state.
mutable struct Scene
    representations::Vector{DisplayedRepresentation}
    style::String                             # "default" | "qutemol"
    width::String                             # CSS sizing for the cell
    height::String
    # Index of the representation the menu bar currently targets.
    # 0 = no active rep (empty scene); otherwise 1-based index into
    # `representations`.
    active::Int
end

Scene(; style = "default", width = "80%", height = "60%") =
    Scene(DisplayedRepresentation[], style, width, height, 0)
```

## User-facing API

Every existing display function gets a mutating sibling. The non-mutating
variant continues to do what it does today and is now implemented in terms of
the mutating one.

```julia
# Mutating (new) — adds one representation to the scene, returns scene for chaining
ball_and_stick!(scene::Scene, ac::AbstractAtomContainer; kwargs...)::Scene
stick!(scene, ac; kwargs...)
van_der_waals!(scene, ac; kwargs...)
sas!(scene, ac; kwargs...)
ses!(scene, ac; kwargs...)

# Non-mutating (existing API; unchanged semantics) — wraps a single rep in a
# fresh scene and renders it.
ball_and_stick(ac; kwargs...) = (s = Scene(); ball_and_stick!(s, ac; kwargs...); s)
# (display(s) happens via the show MIME machinery — see "Display path" below)
```

Optional helpers for managing a scene:

```julia
delete!(scene::Scene, i::Integer)             # remove rep at index i
empty!(scene::Scene)                          # clear all reps
set_active!(scene::Scene, i::Integer)         # change which rep menus target
set_visible!(scene::Scene, i::Integer, on::Bool)
```

## Display path

Today `display_model` builds an `App() do session ... end`. The
mutating-API world becomes:

- `Scene` overloads `Base.show(io::IO, ::MIME"text/html", s::Scene)` (and the
  juliavscode/Bonito MIME types), which spins up the same `App() do session
  ... end` machinery but seeded with `s.representations` instead of a freshly
  computed single representation.
- The convenience constructors (`ball_and_stick(ac)` etc.) build the scene
  and return it; the REPL/IJulia/VSCode then triggers `show(..., MIME"text/html"(), scene)`.
- An explicit `display(scene)` works the same way (Base.display picks the
  right MIME).

This avoids changing the entry-point shape for the simple case — the
existing test driver and notebook flow keep working.

## Wire format

Current single-rep payload from Julia → JS:

```
{ representation: <Representation>, active: <type>, coloring: <c>, density: <d> }
```

New multi-rep payload (atomic state update — every change ships the full
list):

```
{
  representations: [
    {
      repr:     <Representation>,    # existing struct
      type:     "STICK",
      coloring: "element",
      density:  "medium",
      visible:  true,
    },
    ...
  ],
  active: 1,                          # 1-based index into representations
}
```

`Representation` itself is unchanged on the wire; we just allow many of them
per message. Pushing the full list every time keeps the protocol stateless
on the JS side — no per-rep diff logic needed.

## TS / Babylon side

Currently `rendering.ts:renderRepresentation` builds one set of meshes (root
sphere + instances, root cylinder + instances, optional surface mesh) for a
single representation. The minimal change:

- Wrap that logic in a function that takes one representation and returns
  the meshes it produced, tagged with a representation index.
- On `add-representation`, clear all previous representation meshes, iterate
  the new list, build one set per representation. Materials, instance
  buffers, highlight layer all live per-representation.
- Visibility toggle: walk the meshes for that rep index, set `isVisible`.

Babylon's Scene comfortably holds many MeshInstanced groups, so this is
mechanically cheap. The cost is memory for the additional materials and
geometry — a SAS + ball-and-stick scene roughly doubles GPU usage vs either
alone, which is fine.

## Menus (this first pass)

Existing menu bar buttons fall into two camps:

- **Global** (one setting for the whole scene): Style, Lighting, Mouse,
  SSAO, Debug, Screenshot. Stay as-is.
- **Per-representation** (Model, Color, Density): drive only the
  representation at `scene.active`. The button labels show the active rep's
  current setting; clicking cycles that rep's setting only.

`scene.active` defaults to `length(scene.representations)` (most recently
added). User-facing way to change it later is `set_active!(scene, i)`. A UI
mechanism (`Active rep: 1 / 3` cycle button, plus → / ← hotkeys) is part of
the follow-up sidebar work, NOT this design.

## Rebuild flow

Today a coloring/density/model change comes in via Bonito Observable, Julia
runs `rebuild()` which produces a new single representation and pushes it
back through `repr_obs`.

With multi-rep, the request needs to include WHICH representation to
rebuild. Two options:

- **Option A** — bake the rep index into the request: `bv-request-coloring`
  becomes `{ coloring: "chain", rep: 2 }`. Julia rebuilds rep #2 and pushes
  back the entire scene state.
- **Option B** — JS keeps no knowledge of which rep is active. The cycle
  buttons just dispatch the new value; Julia knows from `scene.active` which
  rep to rebuild.

Option B is simpler (no protocol changes to the existing events) and
matches the "global menu drives active rep" UX. We go with B for this pass.
Option A becomes natural when the sidebar UI lets the user click on a
specific rep in the list to make it active.

## Implementation steps

Suggested order — each step is independently testable and gives a usable
intermediate state.

1. **Introduce `Scene` + `DisplayedRepresentation` types** in
   `src/core/representation.jl` (alongside the existing `Representation`).
   Add the helper functions: `set_active!`, `set_visible!`, `delete!`,
   `empty!`.

2. **Refactor `display_model` into `Scene.show`**, moving the App logic.
   Build the initial scene-with-one-rep from inside the legacy convenience
   functions; otherwise the existing notebooks keep working unchanged. The
   wire format gains the `representations: [...]` shape but with one entry.

3. **Add the mutating `!` variants** for each model type. They call the
   existing `prepare_*_model` and push the result into `scene.representations`.

4. **TS-side multi-rep rendering**: iterate over `representations` array,
   build per-rep mesh groups. Visibility toggle per rep. Tag each
   meshGroup with its rep index (for the eventual delete/show/hide work).

5. **Per-active-rep menu wiring**: the existing `model_request` /
   `coloring_request` / `density_request` observables resolve to
   `scene.active` on the Julia side. Add cycle button "Active rep: 1/3" (or
   number-only) to the menu.

6. *(deferred)* Sidebar UI with per-rep controls.

After (1)–(5), a user can do:

```julia
scene = Scene()
sas!(scene, sys; coloring = "chain")
ball_and_stick!(scene, sys)
scene
```

…and see both representations overlaid, with the menu bar driving the most
recently added one.

## Open questions

- Hydrogen toggle: stays global (acts on all reps that have H-bearing
  primitives) — or per-rep? I'd keep it global for the first pass.
- Default density for SES on a 5000-atom system at `ultra=12` is going to be
  expensive. Worth a soft cap or a "this would take a long time, are you
  sure?" warning later, but out of scope for the type-introduction step.
- Picking + atom inspection: currently the modal in `SceneComponent.tsx`
  shows the atom info for the clicked sphere. Multi-rep means the same atom
  might be drawn twice (ball-and-stick + surface vertex). Picking should
  prefer instanced atoms over surface mesh vertices; surface is already
  `isPickable = false` so this just works.
- Naming: `set_active!` vs `select!` / `focus!`. `active` matches the JS
  side's `activeModel`; I'd stick with `set_active!` for consistency.

---

## Compatibility

The existing public surface — `ball_and_stick(ac)`, `stick(ac)`,
`van_der_waals(ac)`, `sas(ac)`, `ses(ac)` — keeps identical behavior. The
existing notebooks (`docs/examples/multiple_plots.ipynb`,
`docs/examples/visualize_structure.ipynb`) continue to work without
modification. The wire-format change is additive (single-rep is just a
length-1 list).
