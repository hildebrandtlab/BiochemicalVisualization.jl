// Lighting modes — independent of render style. The mode controls light
// topology (which lights are on, parenting, observers) and intensities.
// Style (default/qutemol) controls materials, clear color, outline, SSAO,
// and color palettes; the two are orthogonal so the user can mix them.

import { Vector3 } from '@babylonjs/core';
import { AppContext } from './SceneComponent';

export type LightingMode = "mixed" | "headlight" | "follow" | "directional";

export const LIGHTING_MODES: LightingMode[] = [
    "mixed",
    "headlight",
    "follow",
    "directional",
];

export const lightingModeLabel = (m: LightingMode): string =>
    m === "mixed"     ? "Light: mixed"     :
    m === "headlight" ? "Light: headlight" :
    m === "follow"    ? "Light: follow"    :
                        "Light: directional";

// Local-space direction for the directional mode (in camera coordinates):
// slightly down-and-right of forward, so the light appears to come from
// the upper-left of the viewer's perspective.
const DIRECTIONAL_LOCAL_DIR = new Vector3(0.3, -0.5, 1).normalize();

export const applyLightingMode = (ctx: AppContext, mode: LightingMode) => {
    // Tear down any previous-mode observer.
    if (ctx.lightingObserver) {
        ctx.scene.onBeforeRenderObservable.remove(ctx.lightingObserver);
        ctx.lightingObserver = null;
    }

    // Reset to neutral baseline before the new mode applies its own values.
    ctx.directionalLight.intensity = 0;
    ctx.ambientLight.direction = new Vector3(0, 1, 0);

    switch (mode) {
        case "mixed":
            // Original behavior: world-fixed sky + camera-attached point.
            ctx.ambientLight.intensity = 0.4;
            ctx.pointLight.intensity   = 0.7;
            break;

        case "headlight":
            // Pure camera-attached point light. SSAO does the ambient work.
            ctx.ambientLight.intensity = 0;
            ctx.pointLight.intensity   = 1.0;
            break;

        case "follow":
            // Camera-up tracks the orbit, so the bright side of every atom
            // stays "above" from the viewer's perspective.
            ctx.ambientLight.intensity = 0.4;
            ctx.pointLight.intensity   = 0.7;
            ctx.lightingObserver = ctx.scene.onBeforeRenderObservable.add(() => {
                ctx.ambientLight.direction.copyFrom(ctx.camera.upVector);
            });
            break;

        case "directional":
            // Directional light parented to the camera, fixed local direction.
            // Babylon's `direction` is in world space, so we recompute each
            // frame from the camera's transform.
            ctx.ambientLight.intensity = 0;
            ctx.pointLight.intensity   = 0.3;  // soft fill from camera origin
            ctx.directionalLight.intensity = 0.8;
            ctx.lightingObserver = ctx.scene.onBeforeRenderObservable.add(() => {
                Vector3.TransformNormalToRef(
                    DIRECTIONAL_LOCAL_DIR,
                    ctx.camera.getWorldMatrix(),
                    ctx.directionalLight.direction
                );
                ctx.directionalLight.direction.normalize();
            });
            break;
    }

    ctx.lightingMode = mode;
};
