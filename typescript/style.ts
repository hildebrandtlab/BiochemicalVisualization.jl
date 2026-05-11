// Render styles. The "default" style is what we ship with; "qutemol"
// approximates the look of QuteMol (https://qutemol.sourceforge.net/),
// transcribed from its `qutemol2.preset` (white background, glossy
// atoms, pastel colors, prominent SSAO, thin black border). A faithful
// port would need QuteMol's custom shaders and offline per-atom AO
// baking; this is a recognizable approximation built from
// StandardMaterial + lights + SSAO2 + renderOutline.

import { AppContext } from './SceneComponent';
import { Color3, Color4, Mesh, AbstractMesh, InstancedMesh, SSAO2RenderingPipeline } from '@babylonjs/core';

export type RenderStyle = "default" | "qutemol";

export const RENDER_STYLES: RenderStyle[] = ["default", "qutemol"];

export const applyRenderStyle = (ctx: AppContext, style: RenderStyle) => {
    ctx.renderStyle = style;
    if (style === "qutemol") {
        applyQuteMolStyle(ctx);
    } else {
        applyDefaultStyle(ctx);
    }
};

// ---------- Default style (what we shipped with) ----------

const applyDefaultStyle = (ctx: AppContext) => {
    ctx.scene.clearColor = new Color4(0, 0, 0, 1);

    for (const m of ctx.representationMaterials) {
        m.diffuseColor  = new Color3(1, 1, 1);
        m.specularColor = new Color3(0.3, 0.3, 0.3);
        m.specularPower = 32;
        m.emissiveColor = new Color3(0, 0, 0);
    }

    setSphereOutline(ctx, false, new Color3(0, 0, 0), 0);
    tuneSSAO(ctx, "default");
    swapInstanceColors(ctx, "defaultColor");
};

// ---------- QuteMol style (qutemol2.preset) ----------
//
// From tmp/qutemol/src/presets/qutemol2.preset:
//   P_bg_color           = (1, 1, 1)            white background
//   P_light_base         = 0.0                  no flat ambient
//   P_lighting           = 0.19                 directional
//   P_phong              = 0.94                 specular strength
//   P_phong_size         = 0.96                 → exponent 2^((1-0.96)*6+3) ≈ 16
//   P_col_atoms_sat      = 0.6                  baked into qutemolColor in Julia
//   P_col_atoms_bri      = 1.0                  baked into qutemolColor in Julia
//   P_texture            = 0.85                 AO weight (handled via SSAO2 + ambient)
//   P_border_outside     = 0.4                  outline width  = 0.4 * 0.075 = 0.03
//   P_halo_size          = 0.0                  no separate halo

const applyQuteMolStyle = (ctx: AppContext) => {
    ctx.scene.clearColor = new Color4(1, 1, 1, 1);

    for (const m of ctx.representationMaterials) {
        m.diffuseColor  = new Color3(1, 1, 1);
        // Plastic, not metallic. Babylon's Phong adds specular on top of
        // diffuse, so a literal P_phong=0.94 mapping reads as chrome.
        m.specularColor = new Color3(0.25, 0.25, 0.25);
        m.specularPower = 16;
        m.emissiveColor = new Color3(0, 0, 0);
    }

    setSphereOutline(ctx, true, new Color3(0, 0, 0), 0.03);
    swapInstanceColors(ctx, "qutemolColor");

    // QuteMol always shows AO; ensure SSAO2 is on, and strengthen it to make
    // up for the lack of baked per-atom AO.
    if (ctx.controls && ctx.ssaoMode !== 2) {
        ctx.controls.setSSAOMode(2);
    }
    tuneSSAO(ctx, "qutemol");
};

// ---------- helpers ----------

// SSAO2 has style-specific tuning. Applied to the live pipeline; if the
// pipeline gets recreated later (via setSSAOMode toggle), the new pipeline
// will start at createSSAO2 defaults until the next style apply.
const tuneSSAO = (ctx: AppContext, style: RenderStyle) => {
    const p = ctx.ssaoPipeline;
    if (!(p instanceof SSAO2RenderingPipeline)) return;
    if (style === "qutemol") {
        // tighter radius + stronger contrast → crevice darkening that better
        // mimics QuteMol's baked per-atom AO
        p.radius        = 8.0;
        p.totalStrength = 1.6;
        p.samples       = 32;
    } else {
        p.radius        = 12.0;
        p.totalStrength = 1.3;
        p.samples       = 16;
    }
};

// renderOutline on the source mesh propagates to its instances. Setting
// it on rootSphere covers every childSphere instance.
const setSphereOutline = (ctx: AppContext, on: boolean, color: Color3, width: number) => {
    const root = ctx.meshes.find((m: AbstractMesh) => m.name === "rootSphere");
    if (!root) return;
    const mesh = root as Mesh;
    mesh.renderOutline = on;
    if (on) {
        mesh.outlineColor = color;
        mesh.outlineWidth = width;
    }
};

// Each instance's metadata carries both palette variants; swapping at
// style-toggle time avoids re-doing addRepresentation.
const swapInstanceColors = (ctx: AppContext, key: "defaultColor" | "qutemolColor") => {
    for (const m of ctx.meshes) {
        if (m.name !== "childSphere" && m.name !== "childCylinder") continue;
        const md = (m as any).metadata;
        const hex = md?.[key];
        if (!hex) continue;
        const inst = m as InstancedMesh;
        if (inst.instancedBuffers?.color) {
            inst.instancedBuffers.color = Color4.FromHexString(hex);
        }
    }
};
