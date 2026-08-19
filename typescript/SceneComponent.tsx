import { useEffect, useRef, useState } from 'react';

import {
  Scene, Engine, ArcRotateCamera, Mesh, AbstractMesh,
  SSAORenderingPipeline, SSAO2RenderingPipeline,
  EngineInstrumentation,
  SceneInstrumentation,
  PointLight,
  HemisphericLight,
  DirectionalLight,
  HighlightLayer,
  Observer,
  StandardMaterial,
  Tools,
  Vector3,
  PointerEventTypes,
  PointerInfo,
  Color4,
} from '@babylonjs/core';

// @babylonjs/inspector intentionally NOT imported here. It pulled in
// monaco-editor and other heavy GUI panels (~5-7 MB of bundle plus
// substantial runtime memory) and was the chief offender of per-tab
// memory ceilings that crashed Chrome/Safari with multiple plots.
// The HUD panel below provides the runtime info we actually care
// about for users (FPS, GPU/CPU frame time, draw calls, active mesh
// count). Re-add a dev-only Inspector path if/when needed for
// debugging this package itself.

import { AdvancedDynamicTexture, StackPanel, TextBlock, Control } from '@babylonjs/gui';

import { renderScene } from './rendering';
import { changeSSAOMode, SsaoCache } from './ssao';
import { RenderStyle, RENDER_STYLES, applyRenderStyle } from './style';
import { LightingMode, LIGHTING_MODES, applyLightingMode } from './lighting';
import { MouseMode, MOUSE_MODES, applyMouseMode } from './mouse';

type SceneComponentProps = {
  id: string;
  width: string;
  height: string;
};

type DebugText = {
  fpsText: TextBlock,
  frameRenderTimeCPU: TextBlock,
  interFrameTimeCPU: TextBlock,
  frameRenderTimeGPU: TextBlock,
  frameRenderTimeGPUAverage: TextBlock,
  evalActiveMeshes: TextBlock,
  drawCallsCount: TextBlock,
};

export type ModelType =
  | "BALL_AND_STICK" | "STICK" | "VAN_DER_WAALS" | "SAS" | "SES"
  | "BACKBONE" | "RIBBON" | "CARTOON";
export const MODEL_TYPES: ModelType[] = [
  "BALL_AND_STICK", "STICK", "VAN_DER_WAALS", "SAS", "SES",
  "BACKBONE", "RIBBON", "CARTOON",
];

export type ColoringMethod = "element" | "chain" | "residue" | "residue_index" | "solid";
export const COLORING_METHODS: ColoringMethod[] =
  ["element", "chain", "residue", "residue_index", "solid"];

// Surface triangulation density. Only used by SAS / SES models; ignored
// elsewhere. The Julia side maps these to numeric density values that
// it passes to `triangulate_sas` / `triangulate_ses`.
export type DensityLevel = "low" | "medium" | "high" | "ultra";
export const DENSITY_LEVELS: DensityLevel[] = ["low", "medium", "high", "ultra"];

export type AppControls = {
  setDebug: (on: boolean) => void,
  setHAtomsVisible: (on: boolean) => void,
  setSSAOMode: (mode: number) => void,
  setRenderStyle: (style: RenderStyle) => void,
  setModel: (model: ModelType) => void,
  setColoring: (method: ColoringMethod) => void,
  setDensity: (level: DensityLevel) => void,
  setLightingMode: (mode: LightingMode) => void,
  setMouseMode: (mode: MouseMode) => void,
  takeScreenshot: () => void,
  syncActiveLabels: (model: ModelType, coloring: ColoringMethod, density: DensityLevel) => void,
};

export type AppContext = {
  scene: Scene,
  engine: Engine,
  camera: ArcRotateCamera,

  meshes: Array<Mesh | AbstractMesh>,
  representationMaterials: StandardMaterial[],
  representationLayers: HighlightLayer[],
  highlightMesh?: Mesh,
  pickedMesh?: Mesh,

  ssaoPipeline: SSAORenderingPipeline | SSAO2RenderingPipeline | null,
  ssaoPipelineName: string,
  ssaoMode: number,
  ssaoCache: SsaoCache,

  pointerMoved: boolean,
  hAtomsVisible: boolean,
  // True while any rep renders with alpha < 1. Transparent materials
  // use needDepthPrePass (→ checkReadyOnEveryCall), which a frozen
  // scene silently stops drawing — so freezing is skipped while set.
  sceneHasTransparency: boolean,
  debug: boolean,
  renderStyle: RenderStyle,
  activeModel: ModelType,
  activeColoring: ColoringMethod,
  activeDensity: DensityLevel,

  ambientLight: HemisphericLight,
  pointLight: PointLight,
  directionalLight: DirectionalLight,
  lightingMode: LightingMode,
  // Per-frame observer that updates light direction (used by `follow`
  // and `directional` modes); cleared when the mode changes.
  lightingObserver: Observer<Scene> | null,

  mouseMode: MouseMode,
  // Custom pointer observer used by the BALLView mouse mode; cleared
  // when switching back to default.
  mouseObserver: Observer<PointerInfo> | null,
  // Extra DOM listener cleanup installed by the BALLView mode
  // (pointercancel safety net); called when the mode changes.
  mouseModeCleanup: (() => void) | null,

  hudPanel: StackPanel,
  debugText: DebugText,
  controls?: AppControls,
  update: (data: any) => void,

  // The React-mounted outer div for *this* plot. JS→Julia request
  // events dispatch on this node so each notebook plot only drives
  // its own Bonito session.
  sceneRoot: HTMLDivElement,
};

type ModalState = { open: boolean; text: string };

// ---------------------------------------------------------------------------
// Setup helpers — each does one piece of `init` and is independently readable.
// ---------------------------------------------------------------------------

const setupCamera = (scene: Scene, canvas: HTMLCanvasElement) => {
  const camera = new ArcRotateCamera(
    "camera",
    -2 * Math.PI,
    2 * Math.PI,
    12,
    Vector3.Zero(),
    scene
  );
  camera.attachControl(canvas, true);
  camera.useFramingBehavior = true;
  if (camera.framingBehavior) {
    camera.framingBehavior.elevationReturnTime = -1;
  }
  // Without this, mouse-wheel over the canvas zooms the camera AND
  // scrolls the surrounding notebook page. preventDefault stops the
  // event from propagating up to the page scroller. passive:false is
  // required for preventDefault to take effect on wheel.
  canvas.addEventListener("wheel", (e) => e.preventDefault(), { passive: false });
  return camera;
};

const setupLights = (scene: Scene, camera: ArcRotateCamera) => {
  const ambient = new HemisphericLight("ambientLight", new Vector3(0, 1, 0), scene);
  ambient.intensity = 0.3;

  const point = new PointLight("pointLight", new Vector3(0, 0, 0), scene);
  point.intensity = 0.7;
  point.parent = camera;

  // Off by default; the "directional" lighting mode turns it on and
  // recomputes its world direction from the camera transform each frame.
  const directional = new DirectionalLight(
    "directionalLight",
    new Vector3(0, -1, 0),
    scene,
  );
  directional.intensity = 0;
  directional.parent = camera;

  return { ambient, point, directional };
};

// WebXR setup intentionally removed. In a notebook context the XR path
// is never used, but `createDefaultXRExperienceAsync` and the
// webxr-polyfill load probed Chrome's GPU process in ways that
// correlated with renderer crashes (STATUS_ACCESS_VIOLATION) on tabs
// with multiple plots. Re-add behind a flag if VR display ever
// becomes a target.

// Babylon's AdvancedDynamicTexture renders into the engine's backbuffer
// pixel grid by default. With adaptToDeviceRatio:true on a retina
// display the backbuffer is 2× the canvas CSS pixels — so anything
// sized in "Xpx" (button widths, font sizes, …) takes half as much CSS
// space as expected, producing the "unreadably small HUD" the user
// hit. Setting idealWidth/Height to the canvas's CSS dimensions makes
// the UI coordinate space match CSS pixels regardless of DPR.
const _scaleUIToCSS = (ui: AdvancedDynamicTexture, engine: Engine) => {
  const canvas = engine.getRenderingCanvas();
  if (!canvas) return;
  ui.idealWidth  = canvas.clientWidth;
  ui.idealHeight = canvas.clientHeight;
  ui.useSmallestIdeal = true;
};

const setupHUD = (scene: Scene): { panel: StackPanel, debugText: DebugText } => {
  const ui = AdvancedDynamicTexture.CreateFullscreenUI("hud", true, scene);
  _scaleUIToCSS(ui, scene.getEngine() as Engine);

  const panel = new StackPanel();
  panel.adaptWidthToChildren = false;
  panel.width = "320px";
  panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
  panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
  panel.left = "8px";
  panel.top = "8px";
  panel.isVisible = false;  // hidden until set-render-mode { debug: true } arrives
  ui.addControl(panel);

  const makeText = (initial: string) => {
    const tb = new TextBlock();
    tb.text = initial;
    tb.color = "white";
    tb.fontSize = 12;
    tb.fontFamily = "monospace";
    tb.height = "16px";
    tb.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    tb.shadowColor = "black";
    tb.shadowBlur = 2;
    panel.addControl(tb);
    return tb;
  };

  const debugText: DebugText = {
    fpsText:                   makeText("FPS: --"),
    frameRenderTimeCPU:        makeText("CPU frame: --"),
    interFrameTimeCPU:         makeText("CPU inter-frame: --"),
    frameRenderTimeGPU:        makeText("GPU frame: --"),
    frameRenderTimeGPUAverage: makeText("GPU avg: --"),
    evalActiveMeshes:          makeText("Mesh eval: --"),
    drawCallsCount:            makeText("Draw calls: --"),
  };

  return { panel, debugText };
};

const setupInstrumentation = (
  ctx: AppContext,
  engineInst: EngineInstrumentation,
  sceneInst: SceneInstrumentation
) => {
  ctx.scene.registerBeforeRender(() => {
    const c = engineInst.gpuFrameTimeCounter;
    if (!c) return;
    ctx.debugText.frameRenderTimeGPU.text        = `GPU frame: ${(c.current * 1e-6).toFixed(2)}ms`;
    ctx.debugText.frameRenderTimeGPUAverage.text = `GPU avg: ${(c.average * 1e-6).toFixed(2)}ms`;
  });

  ctx.scene.onAfterRenderObservable.add(() => {
    ctx.debugText.frameRenderTimeCPU.text = `CPU frame: ${sceneInst.renderTimeCounter.current.toFixed(2)}ms`;
    ctx.debugText.interFrameTimeCPU.text  = `CPU inter-frame: ${sceneInst.interFrameTimeCounter.current.toFixed(2)}ms`;
    ctx.debugText.evalActiveMeshes.text   = `Mesh eval: ${sceneInst.activeMeshesEvaluationTimeCounter.current.toFixed(2)}ms`;
    ctx.debugText.drawCallsCount.text     = `Draw calls: ${sceneInst.drawCallsCounter.current}`;
  });

  ctx.engine.runRenderLoop(() => {
    ctx.scene.render();
    ctx.debugText.fpsText.text = `FPS: ${ctx.engine.getFps().toFixed(2)}`;
  });
};

// Mirror of the view-affecting ctx fields, held as React state so the
// sidebar's "View" section re-renders when a control (or Julia, via
// syncActiveLabels) changes something. The Babylon side stays the
// single source of truth for behavior; this is display state only.
export type ViewState = {
  model:    ModelType;
  coloring: ColoringMethod;
  density:  DensityLevel;
  style:    RenderStyle;
  lighting: LightingMode;
  mouse:    MouseMode;
  ssaoMode: number;   // 1 = SSAOv1, 2 = SSAOv2, 3 = off
  hAtoms:   boolean;
  debug:    boolean;
};

// Wire up ctx.controls. The controls used to live in a Babylon-GUI
// menu bar rendered into the canvas; ten fixed-width buttons overflowed
// and became unreachable on narrow viewports (no scrolling inside a
// GUI texture). They are now DOM widgets in the sidebar's "View"
// section — `patch` pushes label state into React; behavior stays here.
const setupControls = (
  ctx: AppContext,
  patch: (p: Partial<ViewState>) => void,
) => {
  ctx.controls = {
    setDebug: (on) => {
      ctx.debug = on;
      ctx.hudPanel.isVisible = on;
      patch({ debug: on });
    },

    setHAtomsVisible: (on) => {
      ctx.hAtomsVisible = on;
      patch({ hAtoms: on });
      ctx.scene.unfreezeActiveMeshes();
      for (const mesh of ctx.meshes) {
        const md = mesh.metadata as any;
        // Hide H spheres themselves
        if (mesh.name === "childSphere" && md?.meta?.[1] === "H") {
          mesh.isVisible = on;
        }
        // Hide both halves of any bond involving an H so the cylinders
        // don't extend into empty space when the sphere is gone.
        if (mesh.name === "childCylinder" && md?.isHBond === true) {
          mesh.isVisible = on;
        }
      }
      // See applyScene: freezing kills needDepthPrePass materials.
      if (!ctx.sceneHasTransparency) ctx.scene.freezeActiveMeshes();
    },

    setSSAOMode: (mode) => {
      ctx.ssaoMode = mode;
      patch({ ssaoMode: mode });
      changeSSAOMode(ctx);
    },

    setRenderStyle: (style) => {
      applyRenderStyle(ctx, style);
      patch({ style });
    },

    setModel: (model) => {
      if (model === ctx.activeModel) return;
      // Optimistically update local state; the actual rebuild happens on
      // the Julia side and the new representation arrives via an
      // add-representation event.
      ctx.activeModel = model;
      patch({ model });
      ctx.sceneRoot.dispatchEvent(new CustomEvent("bv-request-model", {
        detail: { type: model },
      }));
    },

    setColoring: (method) => {
      if (method === ctx.activeColoring) return;
      // Same pattern as setModel: optimistic local state, Julia rebuilds
      // and ships back via add-representation. Only meaningful for the
      // surface models (SAS/SES) today, but harmless on atom models.
      ctx.activeColoring = method;
      patch({ coloring: method });
      ctx.sceneRoot.dispatchEvent(new CustomEvent("bv-request-coloring", {
        detail: { coloring: method },
      }));
    },

    setDensity: (level) => {
      if (level === ctx.activeDensity) return;
      // Density only affects SAS/SES triangulation. Julia ignores the
      // request when an atom model is active but still records the
      // setting so a subsequent switch to SAS/SES uses it.
      ctx.activeDensity = level;
      patch({ density: level });
      ctx.sceneRoot.dispatchEvent(new CustomEvent("bv-request-density", {
        detail: { density: level },
      }));
    },

    setLightingMode: (mode) => {
      applyLightingMode(ctx, mode);
      patch({ lighting: mode });
    },

    setMouseMode: (mode) => {
      applyMouseMode(ctx, mode);
      patch({ mouse: mode });
    },

    takeScreenshot: () => {
      Tools.CreateScreenshot(ctx.engine, ctx.camera, { precision: 2 });
    },

    // Update the model/coloring/density selections from the active rep
    // WITHOUT dispatching back to Julia. Used by update() when a new
    // scene_obs lands so the sidebar reflects the current active rep —
    // e.g. after `stick(sys)` the View section shows "stick" instead of
    // the initial "ball+stick".
    syncActiveLabels: (model: ModelType, coloring: ColoringMethod, density: DensityLevel) => {
      patch({ model, coloring, density });
    },
  };
};

// Dispose every resource owned by the previous representation. Leaves
// lights, camera, ground, SSAO, and other scene infrastructure intact.
const clearRepresentation = (ctx: AppContext) => {
  ctx.meshes.forEach((mesh) => mesh.dispose());
  ctx.representationMaterials.forEach((m) => m.dispose());
  ctx.representationLayers.forEach((l) => l.dispose());
  ctx.meshes = [];
  ctx.representationMaterials = [];
  ctx.representationLayers = [];
  ctx.highlightMesh = undefined;
  ctx.pickedMesh = undefined;
};

// Tear down every previously rendered representation and build the
// freshly-shipped list. Used by the initial add-representation event
// and by every Julia → JS scene rebuild.
//
// Freezing the active-mesh list is a big win for large molecules, but
// it is incompatible with the transparent path: needDepthPrePass sets
// checkReadyOnEveryCall on the material, and a frozen scene silently
// stops drawing such meshes (empirically: freeze on → any alpha < 1
// vanishes; freeze off → renders correctly). So the scene stays
// unfrozen exactly while a translucent rep exists.
const applyScene = (ctx: AppContext, reps: any[]) => {
  ctx.scene.unfreezeActiveMeshes();
  clearRepresentation(ctx);
  renderScene(ctx, reps);
  applyRenderStyle(ctx, ctx.renderStyle);
  ctx.scene.createOrUpdateSelectionOctree();
  if (!ctx.sceneHasTransparency) ctx.scene.freezeActiveMeshes();
};

const setupPicking = (
  ctx: AppContext,
  setModal: (m: ModalState) => void
) => {
  ctx.scene.onPointerObservable.add((pointerInfo) => {
    switch (pointerInfo.type) {
      case PointerEventTypes.POINTERDOWN:
        ctx.pointerMoved = false;
        break;

      case PointerEventTypes.POINTERMOVE:
        ctx.pointerMoved = true;
        break;

      case PointerEventTypes.POINTERUP: {
        if (ctx.pointerMoved) return;
        // Only left-click selects atoms; right/middle are reserved for the camera.
        if ((pointerInfo.event as PointerEvent).button !== 0) return;

        ctx.scene.unfreezeActiveMeshes();
        const result = ctx.scene.pick(ctx.scene.pointerX, ctx.scene.pointerY);
        const meta = (result.pickedMesh?.metadata as any)?.meta as (string | number)[] | undefined;

        if (
          result.hit &&
          meta &&
          result.pickedMesh !== ctx.pickedMesh &&
          result.pickedMesh !== ctx.highlightMesh
        ) {
          // re-enable the previously picked mesh before swapping
          ctx.pickedMesh?.setEnabled(true);
          ctx.pickedMesh = result.pickedMesh as Mesh;
          ctx.pickedMesh.setEnabled(false);

          if (ctx.highlightMesh) {
            ctx.highlightMesh.setEnabled(true);
            ctx.highlightMesh.position.copyFrom(ctx.pickedMesh.position);
            ctx.highlightMesh.scaling.copyFrom(ctx.pickedMesh.scaling);
            ctx.highlightMesh.rotation.copyFrom(ctx.pickedMesh.rotation);
          }

          const p = ctx.pickedMesh.position;
          setModal({
            open: true,
            text:
              `Element:    ${meta[1]}\n` +
              `Atom name:  ${meta[0]}\n` +
              `Atom idx:   ${meta[2]}\n` +
              `Chain:      ${meta[3]}\n` +
              `Fragment:   ${meta[4]}\n` +
              `Position:   (${p.x.toFixed(3)}, ${p.y.toFixed(3)}, ${p.z.toFixed(3)})`
          });
        }
        ctx.scene.freezeActiveMeshes();
        break;
      }
    }
  });
};

// ---------------------------------------------------------------------------
// React component
// ---------------------------------------------------------------------------

// Compact summary of one representation that the sidebar renders from.
// Mirrors the wire fields from Julia's _serialize_rep, minus the heavy
// `repr` payload which the sidebar doesn't need.
type RepSummary = {
  type:      ModelType;
  coloring:  ColoringMethod;
  density:   DensityLevel;
  visible:   boolean;
  alpha:     number;   // 0..1
  wireframe: boolean;
};

export const SceneComponent = (props: SceneComponentProps) => {
  const { id, width = '100%', height = '100%' } = props;

  const webComponentRef  = useRef<HTMLDivElement | null>(null);
  const canvasWrapperRef = useRef<HTMLDivElement | null>(null);
  const canvas           = useRef<HTMLCanvasElement | null>(null);
  const context          = useRef<AppContext | null>(null);
  const [modal, setModal]   = useState<ModalState>({ open: false, text: "" });
  const [reps,  setReps]    = useState<RepSummary[]>([]);
  const [active, setActive] = useState<number>(0);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  // Sidebar "View" section state. Must match the ctx defaults set in
  // init() — setupControls patches it on every change thereafter.
  const [view, setView] = useState<ViewState>({
    model:    "BALL_AND_STICK",
    coloring: "element",
    density:  "medium",
    style:    "default",
    lighting: "headlight",
    mouse:    "ballview",
    ssaoMode: 3,
    hAtoms:   true,
    debug:    false,
  });
  // Connection-health watchdog: if the first scene state hasn't
  // arrived within a short window, show a visible banner so the user
  // knows something's amiss. Two stages:
  //   0 = silent (data arrived, or still in the grace window).
  //   1 = "Waiting for Julia kernel…" — subtle, kernel may just be
  //       precompiling. Fires after CONNECTION_WAIT_MS.
  //   2 = "Connection seems stuck — recovery steps below." Loud,
  //       red, includes the recovery checklist. Fires after
  //       CONNECTION_HELP_MS without data.
  // Both clear immediately on the first valid scene event.
  const [waitStage, setWaitStage] = useState<0 | 1 | 2>(0);
  const receivedDataRef = useRef<boolean>(false);
  // Engine + cancellation refs are tracked outside `context` because
  // `context.current` is only populated late in the async `init()`.
  // If unmount fires before that assignment (React StrictMode does
  // this routinely; JupyterLab's "Run All" → rapid cell remount
  // produces the same race), the cleanup can't reach the Engine and
  // it leaks a WebGL context. Browsers cap WebGL contexts (Chrome
  // ~16) and exceeding the cap → renderer crash ("Aw, snap!"). Keep
  // the Engine in a ref so cleanup is unconditional.
  const engineRef     = useRef<Engine | null>(null);
  const initAbortedRef = useRef<boolean>(false);

  // Handle a full scene state shipped from Julia. Wire format is
  //   { representations: [{ repr, type, coloring, density, visible }, ...], active: 1-based }
  // The menu bar labels mirror the *active* rep, so we pull its
  // type / coloring / density into ctx for the buttons to read; the
  // sidebar mirrors the entire list.
  const update = (data: any) => {
    if (!context.current || !Array.isArray(data?.representations)) return;

    // First state from Julia: the WebSocket round-trip is alive. Clear
    // any pending "disconnected" banner.
    receivedDataRef.current = true;
    setWaitStage(0);

    const reps: any[] = data.representations;
    const newActive = typeof data.active === "number" ? data.active : 0;

    // Empty scene (after the last delete) — clear meshes, clear sidebar.
    if (reps.length === 0) {
      clearRepresentation(context.current);
      setReps([]);
      setActive(0);
      return;
    }

    const activeRep =
      newActive > 0 && newActive <= reps.length ? reps[newActive - 1] : null;

    if (activeRep) {
      if (MODEL_TYPES.includes(activeRep.type)) {
        context.current.activeModel = activeRep.type as ModelType;
      }
      if (COLORING_METHODS.includes(activeRep.coloring)) {
        context.current.activeColoring = activeRep.coloring as ColoringMethod;
      }
      if (DENSITY_LEVELS.includes(activeRep.density)) {
        context.current.activeDensity = activeRep.density as DensityLevel;
      }
      // Push the active rep's settings into the menu bar so the labels
      // match the rendered scene — covers both the initial render
      // (e.g. `stick(sys)` → menu starts at "Model: stick") and every
      // subsequent Julia → JS push.
      context.current.controls?.syncActiveLabels(
        context.current.activeModel,
        context.current.activeColoring,
        context.current.activeDensity,
      );
    }

    setReps(reps.map(r => ({
      type:      r.type,
      coloring:  r.coloring,
      density:   r.density,
      visible:   r.visible !== false,
      alpha:     typeof r.alpha === "number" ? r.alpha : 1,
      wireframe: r.wireframe === true,
    })));
    setActive(newActive);

    applyScene(context.current, reps);
  };

  // Sidebar → Julia event dispatchers. The detail object always
  // carries a 1-based `rep` index; Julia's _resolve_rep_idx routes the
  // mutation to that rep.
  const requestActive     = (i: number) =>
    webComponentRef.current?.dispatchEvent(
      new CustomEvent("bv-request-active", { detail: { rep: i } }));
  const requestVisibility = (i: number, visible: boolean) =>
    webComponentRef.current?.dispatchEvent(
      new CustomEvent("bv-request-visibility", { detail: { rep: i, visible } }));
  const requestDelete     = (i: number) =>
    webComponentRef.current?.dispatchEvent(
      new CustomEvent("bv-request-delete", { detail: { rep: i } }));
  const requestAlpha      = (i: number, alpha: number) =>
    webComponentRef.current?.dispatchEvent(
      new CustomEvent("bv-request-alpha", { detail: { rep: i, alpha } }));
  const requestWireframe  = (i: number, wireframe: boolean) =>
    webComponentRef.current?.dispatchEvent(
      new CustomEvent("bv-request-wireframe", { detail: { rep: i, wireframe } }));

  const resizeHandler = () => {
    if (!context.current || !canvas.current || !canvasWrapperRef.current) return;

    // The sidebar shrinks the canvas-bearing column; use the wrapper's
    // actual layout box rather than the outer cell so the WebGL
    // backbuffer matches what's drawn.
    const containerWidth  = canvasWrapperRef.current.offsetWidth;
    const containerHeight = canvasWrapperRef.current.offsetHeight;

    canvas.current.setAttribute("width",  String(containerWidth));
    canvas.current.setAttribute("height", String(containerHeight));
    canvas.current.style.width  = "100%";
    canvas.current.style.height = "100%";

    context.current.scene.getEngine().resize();
  };

  const init = async () => {
    if (!canvas.current || !webComponentRef.current) return;
    // Bail out early if React already unmounted us before init began.
    if (initAbortedRef.current) return;

    // Engine options.
    //   - adaptToDeviceRatio MUST be true: on retina, Babylon's HUD
    //     (StackPanel sized at "320px") is measured against the
    //     backbuffer; a CSS-pixel backbuffer makes the menu overflow
    //     and the top toolbar gets cropped.
    //   - stencil MUST be true: HighlightLayer (atom-pick overlay)
    //     writes to the stencil buffer and silently produces a black
    //     canvas without it.
    // The rest stay off — antialias can come back as a FXAA
    // post-process; audio + context-loss handling we don't use.
    const engine = new Engine(canvas.current, false, {
      adaptToDeviceRatio:     true,
      preserveDrawingBuffer:  false,
      stencil:                true,
      audioEngine:            false,
      doNotHandleContextLost: true,
    });
    // Pin to ref *before* doing anything else so cleanup can dispose
    // even if we get unmounted mid-init.
    engineRef.current = engine;

    if (initAbortedRef.current) {
      // Race: cleanup fired between `new Engine` and now. Drop the
      // engine ourselves and don't continue setting up the scene.
      engine.dispose();
      engineRef.current = null;
      return;
    }
    const scene  = new Scene(engine);
    scene.clearColor = new Color4(0, 0, 0, 1);

    const engineInst = new EngineInstrumentation(engine);
    engineInst.captureGPUFrameTime = true;

    const sceneInst = new SceneInstrumentation(scene);
    sceneInst.captureActiveMeshesEvaluationTime = true;
    sceneInst.captureRenderTime    = true;
    sceneInst.captureInterFrameTime = true;

    const camera = setupCamera(scene, canvas.current);
    const { ambient: ambientLight, point: pointLight, directional: directionalLight } = setupLights(scene, camera);
    const { panel: hudPanel, debugText } = setupHUD(scene);

    const ctx: AppContext = {
      scene,
      engine,
      camera,
      meshes: [],
      representationMaterials: [],
      representationLayers: [],
      ssaoPipeline: null,    // active pipeline ref, populated by changeSSAOMode
      ssaoPipelineName: "",
      ssaoMode: 3,
      ssaoCache: {},         // pipelines created on first use, never disposed
      pointerMoved: false,
      hAtomsVisible: true,
      sceneHasTransparency: false,
      debug: false,
      renderStyle: "default",
      activeModel: "BALL_AND_STICK",
      activeColoring: "element",
      activeDensity: "medium",
      ambientLight,
      pointLight,
      directionalLight,
      lightingMode: "headlight",
      lightingObserver: null,
      mouseMode: "ballview",
      mouseObserver: null,
      mouseModeCleanup: null,
      hudPanel,
      debugText,
      update,
      sceneRoot: webComponentRef.current,
    };
    context.current = ctx;

    setupInstrumentation(ctx, engineInst, sceneInst);
    setupPicking(ctx, setModal);
    setupControls(ctx, (p) => setView((v) => ({ ...v, ...p })));
    // Apply the initial mouse mode so the BALLView pointer observer is
    // actually wired up (the default mode is BALLView; flipping the
    // string alone wouldn't attach the observer).
    applyMouseMode(ctx, ctx.mouseMode);

    window.addEventListener("resize", resizeHandler);
  };

  // Custom-event bridge from the Julia/Bonito side.
  useEffect(() => {
    // Reset the cancellation flag for THIS mount. Cleanup sets it to
    // true; without resetting, a re-mount (StrictMode, fast refresh,
    // etc.) would see initAborted=true at startup and bail.
    initAbortedRef.current = false;
    receivedDataRef.current = false;

    const handleAddRepresentation: EventListener = (event) => {
      if (event instanceof CustomEvent) update(event.detail);
    };

    const handleSetFocus: EventListener = (event) => {
      if (event instanceof CustomEvent && context.current) {
        const f = event.detail.focus_point;
        context.current.camera.setTarget(new Vector3(f[0], f[1], f[2]));
      }
    };

    const handleSetRenderMode: EventListener = (event) => {
      if (event instanceof CustomEvent && context.current?.controls) {
        if ("ssao_mode" in event.detail) {
          context.current.controls.setSSAOMode(event.detail.ssao_mode);
        }
        if ("debug" in event.detail) {
          context.current.controls.setDebug(!!event.detail.debug);
        }
        if ("style" in event.detail) {
          context.current.controls.setRenderStyle(event.detail.style as RenderStyle);
        }
      }
    };

    // Two-stage watchdog (see waitStage docstring above):
    //  - 8s: subtle "Waiting…" banner (kernel may just be precompiling).
    //  - 25s: loud "Connection seems stuck" banner with recovery steps.
    const CONNECTION_WAIT_MS = 8_000;
    const CONNECTION_HELP_MS = 25_000;
    const watchdogWait = window.setTimeout(() => {
      if (!receivedDataRef.current) setWaitStage((s) => (s < 1 ? 1 : s));
    }, CONNECTION_WAIT_MS);
    const watchdogHelp = window.setTimeout(() => {
      if (!receivedDataRef.current) setWaitStage((s) => (s < 2 ? 2 : s));
    }, CONNECTION_HELP_MS);

    init().then(() => {
      const root = webComponentRef.current;
      if (!root) return;
      root.addEventListener("add-representation", handleAddRepresentation);
      root.addEventListener("set-focus",          handleSetFocus);
      root.addEventListener("set-render-mode",    handleSetRenderMode);
      root.dispatchEvent(new CustomEvent('bv-scene-mounted', { bubbles: true, composed: true }));
      setTimeout(() => requestAnimationFrame(resizeHandler), 0);
    });

    return () => {
      // Signal init() to abort if it's still running (it may have
      // constructed the Engine but not yet set context.current).
      initAbortedRef.current = true;
      window.clearTimeout(watchdogWait);
      window.clearTimeout(watchdogHelp);

      // Explicit teardown — `engine.dispose()` should cascade, but
      // Babylon has known gaps where SSAO render pipelines,
      // HighlightLayers, AdvancedDynamicTexture HUDs, and cached
      // post-process pipelines retain framebuffers and shader
      // resources. We've seen JupyterLab tabs accumulate gigabytes of
      // RAM over repeated cell re-runs; tearing each piece down
      // explicitly stops the bleed.
      const ctx = context.current;
      if (ctx) {
        try {
          // Cached SSAO pipelines (we create them once per mode and
          // reuse) — `scene.dispose()` won't reach those that aren't
          // currently attached.
          try { ctx.ssaoCache.ssao?.dispose(); }  catch { /* */ }
          try { ctx.ssaoCache.ssao2?.dispose(); } catch { /* */ }
          ctx.ssaoCache = {};
          try { ctx.ssaoPipeline?.dispose(); } catch { /* */ }
          ctx.ssaoPipeline = null;

          // HUD: AdvancedDynamicTexture under the StackPanel is a
          // full-screen render target. Find via its host scene.
          try {
            const host = (ctx.hudPanel as any)?.host;
            host?.dispose?.();
          } catch { /* */ }

          // Per-rep resources (materials, highlight layers, mesh
          // instances). Defensive: engine.dispose() should reach
          // these via the Scene, but if any are detached they'd
          // leak.
          for (const m of ctx.representationMaterials) {
            try { m.dispose(); } catch { /* */ }
          }
          for (const l of ctx.representationLayers) {
            try { l.dispose(); } catch { /* */ }
          }
          for (const mesh of ctx.meshes) {
            try { mesh.dispose(); } catch { /* */ }
          }
          ctx.representationMaterials = [];
          ctx.representationLayers    = [];
          ctx.meshes                  = [];
        } catch { /* best-effort cleanup; never throw out of cleanup */ }
      }

      // Final cascade.
      if (engineRef.current) {
        try { engineRef.current.dispose(); } catch { /* best effort */ }
        engineRef.current = null;
      }
      context.current = null;
      window.removeEventListener("resize", resizeHandler);
      const root = webComponentRef.current;
      if (root) {
        root.removeEventListener("add-representation", handleAddRepresentation);
        root.removeEventListener("set-focus",          handleSetFocus);
        root.removeEventListener("set-render-mode",    handleSetRenderMode);
      }
    };
  }, []);

  return (
    <div
      ref={webComponentRef}
      id={id + "-div"}
      style={{ width, height, position: "relative" }}
    >
      <div
        ref={canvasWrapperRef}
        style={{ width: "100%", height: "100%", position: "relative" }}
      >
        {/* touchAction none: without it, mobile browsers claim touch
            moves for page scroll/zoom and camera gestures never reach
            the canvas. */}
        <canvas style={{ width: "100%", height: "100%", touchAction: "none" }} ref={canvas} />
        {waitStage > 0 && (
          <div style={{
            position: "absolute",
            top: 12,
            left: "50%",
            transform: "translateX(-50%)",
            background: waitStage === 1
              ? "rgba(60, 80, 110, 0.92)"   // dark slate-blue: informational
              : "rgba(140, 30, 30, 0.94)",  // deep red: action required
            color: "white",
            padding: waitStage === 1 ? "8px 14px" : "12px 18px",
            borderRadius: 6,
            fontFamily: "system-ui, sans-serif",
            fontSize: 13,
            lineHeight: 1.4,
            maxWidth: waitStage === 1 ? "60%" : "85%",
            boxShadow: "0 2px 12px rgba(0,0,0,0.5)",
            zIndex: 20,
            textAlign: waitStage === 1 ? "center" : "left",
          }}>
            {waitStage === 1 ? (
              <div>
                <span style={{
                  display: "inline-block", width: 10, height: 10,
                  borderRadius: "50%", background: "#7aa6ff",
                  marginRight: 8, animation: "bv-pulse 1.4s ease-in-out infinite",
                  verticalAlign: "middle",
                }} />
                Waiting for Julia kernel…
              </div>
            ) : (
              <>
                <div style={{ fontWeight: 600, marginBottom: 6, fontSize: 14 }}>
                  Connection to Julia kernel seems stuck
                </div>
                <div style={{ opacity: 0.92, marginBottom: 6 }}>
                  No scene data arrived over the WebSocket after ~25 s.
                  The page is most likely pointing at a kernel session
                  that's no longer alive (saved notebook output is a
                  common cause).
                </div>
                <div style={{ opacity: 0.92 }}>
                  Try, in order:
                  <ol style={{ margin: "4px 0 0 18px", padding: 0 }}>
                    <li>Re-run the visualization cell.</li>
                    <li>If that doesn't help, restart the kernel, then
                        clear cell outputs and re-run.</li>
                    <li>If still stuck, hard-reload the page
                        (Cmd-Shift-R / Ctrl-Shift-R).</li>
                  </ol>
                </div>
              </>
            )}
          </div>
        )}
        <style>{`
          @keyframes bv-pulse {
            0%, 100% { opacity: 0.4; transform: scale(0.85); }
            50%      { opacity: 1.0; transform: scale(1.1);  }
          }
        `}</style>
        {modal.open && (
          <div style={{
            position: "absolute",
            top: 8,
            right: 8,
            background: "rgba(0, 0, 0, 0.85)",
            color: "white",
            padding: "12px 16px 12px 12px",
            borderRadius: 6,
            fontFamily: "monospace",
            fontSize: 12,
            whiteSpace: "pre",
            zIndex: 10,
            maxWidth: "40%",
            boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
          }}>
            <button
              onClick={() => setModal({ open: false, text: "" })}
              aria-label="Close"
              style={{
                float: "right",
                marginLeft: 12,
                background: "transparent",
                color: "white",
                border: "none",
                cursor: "pointer",
                fontSize: 16,
                lineHeight: 1,
                padding: 0,
              }}
            >×</button>
            {modal.text}
          </div>
        )}
      </div>

      <RepresentationSidebar
        reps={reps}
        active={active}
        collapsed={sidebarCollapsed}
        onToggleCollapsed={() => setSidebarCollapsed((c) => !c)}
        onSetActive={requestActive}
        onSetVisibility={requestVisibility}
        onDelete={requestDelete}
        onSetAlpha={requestAlpha}
        onSetWireframe={requestWireframe}
        view={view}
        controls={() => context.current?.controls}
      />
    </div>
  );
};

// ---------------------------------------------------------------------------
// Sidebar
// ---------------------------------------------------------------------------

type SidebarProps = {
  reps:     RepSummary[];
  active:   number;             // 1-based; 0 when empty
  collapsed: boolean;
  onToggleCollapsed: () => void;
  onSetActive:     (i: number) => void;
  onSetVisibility: (i: number, visible: boolean) => void;
  onDelete:        (i: number) => void;
  onSetAlpha:      (i: number, alpha: number) => void;
  onSetWireframe:  (i: number, wireframe: boolean) => void;
  // View section: mirrored state + a late-bound accessor for
  // ctx.controls (context.current is null until init() completes).
  view:     ViewState;
  controls: () => AppControls | undefined;
};

const SIDEBAR_W           = 240;
const SIDEBAR_COLLAPSED_W = 28;

const sidebarStyles = {
  // The sidebar floats over the canvas instead of taking flex
  // layout space: shrinking the canvas reframes the camera, which
  // feels like a FOV jump when collapsing/expanding. With the overlay
  // layout the canvas keeps full width and only some pixels of the 3D
  // view get covered when the sidebar is expanded.
  panel: (collapsed: boolean): React.CSSProperties => ({
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: collapsed ? SIDEBAR_COLLAPSED_W : SIDEBAR_W,
    background: "rgba(20, 20, 24, 0.92)",
    color: "white",
    fontFamily: "system-ui, sans-serif",
    fontSize: 12,
    display: "flex",
    flexDirection: "column",
    borderLeft: "1px solid rgba(255,255,255,0.1)",
    transition: "width 120ms ease-out",
    overflow: "hidden",
    zIndex: 15,
  }),
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 8px 8px 12px",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  } as React.CSSProperties,
  headerTitle: {
    fontWeight: 600,
    letterSpacing: 0.2,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  } as React.CSSProperties,
  iconButton: {
    background: "transparent",
    color: "white",
    border: "none",
    cursor: "pointer",
    width: 22,
    height: 22,
    lineHeight: "22px",
    padding: 0,
    borderRadius: 3,
    fontSize: 14,
  } as React.CSSProperties,
  list: {
    flex: 1,
    overflowY: "auto",
    padding: "4px 0",
  } as React.CSSProperties,
  row: (isActive: boolean): React.CSSProperties => ({
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "6px 8px 6px 10px",
    background: isActive ? "rgba(80, 140, 255, 0.18)" : "transparent",
    borderLeft: isActive ? "3px solid #5aa0ff" : "3px solid transparent",
    cursor: "pointer",
  }),
  rowLabel: {
    flex: 1,
    minWidth: 0,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  } as React.CSSProperties,
  empty: {
    padding: "12px 12px",
    color: "rgba(255,255,255,0.55)",
    fontStyle: "italic",
  } as React.CSSProperties,
};

// Local opacity slider that decouples the drag from the Julia
// round-trip. A controlled `<input type=range value={r.alpha}>` looks
// stuck during drag because the new value isn't reflected until Julia
// echoes it back over the WebSocket (~30–100 ms later). Here we keep a
// local draft value while the user is interacting, dispatch the
// request once on release, and re-sync to the authoritative prop value
// when not actively dragging.
const OpacitySlider = ({ repIndex, alpha, onCommit }: {
  repIndex: number;
  alpha: number;
  onCommit: (i: number, alpha: number) => void;
}) => {
  const [draft, setDraft] = useState<number>(alpha);
  const draggingRef = useRef<boolean>(false);

  // Sync incoming alpha from Julia only when we're not actively
  // dragging; otherwise the user's drag would get fought by stale
  // prop snapshots.
  useEffect(() => {
    if (!draggingRef.current) setDraft(alpha);
  }, [alpha]);

  const commit = (v: number) => {
    onCommit(repIndex, v);
  };

  return (
    <>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={draft}
        onPointerDown={() => { draggingRef.current = true; }}
        onPointerUp={() => {
          draggingRef.current = false;
          commit(draft);
        }}
        onPointerCancel={() => { draggingRef.current = false; }}
        onChange={(e) => setDraft(parseFloat(e.target.value))}
        // Keyboard nudges (←/→) don't fire pointer events; commit on
        // change too when we're not in the middle of a drag.
        onKeyUp={(e) => {
          if (!draggingRef.current && e.target instanceof HTMLInputElement) {
            commit(parseFloat(e.target.value));
          }
        }}
        aria-label="Opacity"
        style={{ flex: 1, accentColor: "#5aa0ff" }}
      />
      <span style={{ width: 28, textAlign: "right" }}>
        {Math.round(draft * 100)}%
      </span>
    </>
  );
};

// Short display labels for the model select. Wire values stay the
// UPPER_SNAKE ModelType strings.
const MODEL_LABELS: Record<ModelType, string> = {
  BALL_AND_STICK: "ball+stick",
  STICK:          "stick",
  VAN_DER_WAALS:  "vdW",
  SAS:            "SAS",
  SES:            "SES",
  BACKBONE:       "backbone",
  RIBBON:         "ribbon",
  CARTOON:        "cartoon",
};

const viewStyles = {
  section: {
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    padding: "6px 8px 8px 10px",
  } as React.CSSProperties,
  sectionTitle: {
    fontWeight: 600,
    letterSpacing: 0.2,
    opacity: 0.85,
    margin: "2px 0 6px 0",
  } as React.CSSProperties,
  row: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  } as React.CSSProperties,
  rowLabel: {
    width: 52,
    flexShrink: 0,
    opacity: 0.8,
  } as React.CSSProperties,
  select: {
    flex: 1,
    minWidth: 0,
    background: "rgba(255,255,255,0.08)",
    color: "white",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 3,
    fontSize: 12,
    padding: "2px 4px",
  } as React.CSSProperties,
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    cursor: "pointer",
    userSelect: "none",
  } as React.CSSProperties,
  actionButton: {
    background: "rgba(255,255,255,0.1)",
    color: "white",
    border: "1px solid rgba(255,255,255,0.18)",
    borderRadius: 3,
    fontSize: 12,
    padding: "3px 10px",
    cursor: "pointer",
  } as React.CSSProperties,
};

// A labeled <select> row for the View section.
const SelectRow = <T extends string>({ label, value, options, labels, onChange }: {
  label:   string;
  value:   T;
  options: readonly T[];
  labels?: Partial<Record<T, string>>;
  onChange: (v: T) => void;
}) => (
  <div style={viewStyles.row}>
    <span style={viewStyles.rowLabel}>{label}</span>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
      aria-label={label}
      style={viewStyles.select}
    >
      {options.map((o) => (
        <option key={o} value={o}>{labels?.[o] ?? o}</option>
      ))}
    </select>
  </div>
);

// The View section: everything that used to live in the Babylon-GUI
// top menu bar. As DOM inside the (scrollable) sidebar it stays
// reachable at any viewport width and works with touch.
const ViewSection = ({ view, controls }: {
  view: ViewState;
  controls: () => AppControls | undefined;
}) => (
  <div style={viewStyles.section}>
    <div style={viewStyles.sectionTitle}>View</div>
    <SelectRow label="Model" value={view.model} options={MODEL_TYPES}
               labels={MODEL_LABELS}
               onChange={(m) => controls()?.setModel(m)} />
    <SelectRow label="Color" value={view.coloring} options={COLORING_METHODS}
               onChange={(c) => controls()?.setColoring(c)} />
    <SelectRow label="Density" value={view.density} options={DENSITY_LEVELS}
               onChange={(d) => controls()?.setDensity(d)} />
    <SelectRow label="Style" value={view.style} options={RENDER_STYLES}
               onChange={(s) => controls()?.setRenderStyle(s)} />
    <SelectRow label="Light" value={view.lighting} options={LIGHTING_MODES}
               onChange={(l) => controls()?.setLightingMode(l)} />
    <SelectRow label="Mouse" value={view.mouse} options={MOUSE_MODES}
               onChange={(m) => controls()?.setMouseMode(m)} />
    <SelectRow label="SSAO" value={String(view.ssaoMode)} options={["3", "1", "2"] as const}
               labels={{ "3": "off", "1": "v1", "2": "v2" }}
               onChange={(v) => controls()?.setSSAOMode(parseInt(v, 10))} />

    <div style={{ ...viewStyles.row, marginTop: 6, gap: 12 }}>
      <label style={viewStyles.checkboxLabel}>
        <input type="checkbox" checked={view.hAtoms}
               onChange={(e) => controls()?.setHAtomsVisible(e.target.checked)} />
        H atoms
      </label>
      <label style={viewStyles.checkboxLabel}>
        <input type="checkbox" checked={view.debug}
               onChange={(e) => controls()?.setDebug(e.target.checked)} />
        Stats
      </label>
    </div>

    <div style={{ ...viewStyles.row, marginTop: 6, marginBottom: 0 }}>
      <button style={viewStyles.actionButton}
              onClick={() => controls()?.takeScreenshot()}>
        Screenshot
      </button>
    </div>
  </div>
);

const RepresentationSidebar = (props: SidebarProps) => {
  const { reps, active, collapsed, onToggleCollapsed,
          onSetActive, onSetVisibility, onDelete,
          onSetAlpha, onSetWireframe, view, controls } = props;

  return (
    <div style={sidebarStyles.panel(collapsed)} aria-label="Representations">
      <div style={sidebarStyles.header}>
        {!collapsed && <div style={sidebarStyles.headerTitle}>Representations</div>}
        <button
          onClick={onToggleCollapsed}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          style={sidebarStyles.iconButton}
        >{collapsed ? "«" : "»"}</button>
      </div>

      {!collapsed && <ViewSection view={view} controls={controls} />}

      {!collapsed && (
        <div style={sidebarStyles.list}>
          {reps.length === 0 && (
            <div style={sidebarStyles.empty}>No representations</div>
          )}
          {reps.map((r, idx) => {
            const i = idx + 1;
            const isActive = i === active;
            return (
              <div
                key={i}
                style={{ ...sidebarStyles.row(isActive), flexDirection: "column", alignItems: "stretch" }}
                onClick={() => { if (!isActive) onSetActive(i); }}
                title={`Click to make active${isActive ? " (already active)" : ""}`}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <button
                    onClick={(e) => { e.stopPropagation(); onSetVisibility(i, !r.visible); }}
                    aria-label={r.visible ? "Hide" : "Show"}
                    title={r.visible ? "Hide" : "Show"}
                    style={{
                      ...sidebarStyles.iconButton,
                      opacity: r.visible ? 1 : 0.4,
                    }}
                  >{r.visible ? "●" : "○"}</button>

                  <div style={sidebarStyles.rowLabel}>
                    <div>{i}: {r.type}</div>
                    <div style={{ fontSize: 10, opacity: 0.75 }}>
                      {r.coloring}
                      {(r.type === "SAS" || r.type === "SES") ? ` • ${r.density}` : ""}
                    </div>
                  </div>

                  <button
                    onClick={(e) => { e.stopPropagation(); onSetWireframe(i, !r.wireframe); }}
                    aria-label={r.wireframe ? "Solid" : "Wireframe"}
                    title={r.wireframe ? "Switch to solid" : "Switch to wireframe"}
                    style={{
                      ...sidebarStyles.iconButton,
                      opacity: r.wireframe ? 1 : 0.55,
                      fontSize: 11,
                    }}
                  >{r.wireframe ? "▦" : "■"}</button>

                  <button
                    onClick={(e) => { e.stopPropagation(); onDelete(i); }}
                    aria-label="Delete"
                    title="Delete representation"
                    style={sidebarStyles.iconButton}
                  >×</button>
                </div>

                {/* Alpha slider — full row width, only meaningful when the
                    rep is visible; we keep it interactive either way so the
                    user can preadjust before showing. */}
                <div
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    paddingLeft: 28, paddingRight: 6,
                    fontSize: 10, opacity: 0.85, marginTop: 2,
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <span style={{ width: 32 }}>opacity</span>
                  <OpacitySlider
                    repIndex={i}
                    alpha={r.alpha}
                    onCommit={onSetAlpha}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SceneComponent;
export type { DebugText };
