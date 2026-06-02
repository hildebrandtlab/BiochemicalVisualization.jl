// Mouse modes:
//   default  — Babylon's stock ArcRotateCameraPointersInput.
//                left  drag → orbit (around world up)
//                mid   drag → pan
//                right drag → pan
//                wheel       → zoom
//   ballview — Replicates BALLView's scheme from
//              src/VIEW/KERNEL/MODES/rotateMode.C + interactionMode.C.
//              Key difference vs. Babylon's stock: horizontal drag
//              rotates around the camera's CURRENT view-up vector, not
//              around world-up. With a tilted view they're different
//              axes; BALLView's behavior keeps the rotation aligned
//              with the screen at all times.
//                left  drag → orbit around camera-local up / right
//                mid   drag → zoom by vertical drag
//                right drag → pan
//                wheel       → zoom

import { AppContext } from './SceneComponent';
import {
    PointerEventTypes,
    PointerInfo,
    Vector3,
    Quaternion,
} from '@babylonjs/core';

export type MouseMode = "default" | "ballview";

export const MOUSE_MODES: MouseMode[] = ["default", "ballview"];

export const mouseModeLabel = (m: MouseMode): string =>
    m === "ballview" ? "Mouse: BALLView" : "Mouse: default";

// Tuned by feel against BALLView's defaults (mouse_sensitivity_ = 5.0,
// ROTATE_FACTOR = 50, TRANSLATE_FACTOR = 4). Rotate is radians per
// pixel; pan matches Babylon's default panningSensibility of 1000.
const ROTATE_SENS = 0.005;
const PAN_SENS    = 1 / 1000;
const ZOOM_SENS   = 0.005;

const suppressContextMenu = (e: Event) => e.preventDefault();

export const applyMouseMode = (ctx: AppContext, mode: MouseMode) => {
    const canvas = ctx.engine.getRenderingCanvas();

    // Tear down any previous BALLView observer + context-menu suppressor.
    if (ctx.mouseObserver) {
        ctx.scene.onPointerObservable.remove(ctx.mouseObserver);
        ctx.mouseObserver = null;
    }
    if (canvas) {
        canvas.removeEventListener("contextmenu", suppressContextMenu);
    }

    // Re-establish a clean camera-input baseline.
    ctx.camera.detachControl();
    if (!ctx.camera.inputs.attached["pointers"]) {
        ctx.camera.inputs.addPointers();
    }

    if (mode === "ballview") {
        // Detach Babylon's stock pointer input — its alpha rotation is
        // anchored to world up, which is the wrong axis once the view
        // tilts. Wheel + keyboard stay attached.
        ctx.camera.inputs.removeByType("ArcRotateCameraPointersInput");

        // Suppress the browser's right-click context menu so drag-to-pan
        // doesn't trigger it.
        if (canvas) {
            canvas.addEventListener("contextmenu", suppressContextMenu);
        }

        // Hot-path scratch buffers.
        const forward   = new Vector3();
        const right     = new Vector3();
        const viewUp    = new Vector3();
        const offset    = new Vector3();
        const rotated   = new Vector3();
        const newUp     = new Vector3();
        const qX        = new Quaternion();
        const qY        = new Quaternion();
        const qCombined = new Quaternion();

        let down   = false;
        let button = -1;
        let lastX  = 0;
        let lastY  = 0;

        ctx.mouseObserver = ctx.scene.onPointerObservable.add((pi: PointerInfo) => {
            const e = pi.event as PointerEvent;
            switch (pi.type) {
                case PointerEventTypes.POINTERDOWN:
                    down = true;
                    button = e.button;
                    lastX = ctx.scene.pointerX;
                    lastY = ctx.scene.pointerY;
                    break;
                case PointerEventTypes.POINTERUP:
                    down = false;
                    break;
                case PointerEventTypes.POINTERMOVE:
                    if (!down) return;
                    const dx = ctx.scene.pointerX - lastX;
                    const dy = ctx.scene.pointerY - lastY;
                    lastX = ctx.scene.pointerX;
                    lastY = ctx.scene.pointerY;

                    const camera = ctx.camera;

                    if (button === 0) {
                        // Orbit using the camera's CURRENT view-up and
                        // view-right vectors as rotation axes (BALLView's
                        // getLookUpVector() / getRightVector() in
                        // scene.C). The world-up axis never enters, so
                        // horizontal drag stays aligned with screen-X
                        // regardless of tilt.
                        camera.target.subtractToRef(camera.position, forward);
                        forward.normalize();
                        Vector3.CrossToRef(forward, camera.upVector, right);
                        right.normalize();
                        Vector3.CrossToRef(right, forward, viewUp);
                        viewUp.normalize();

                        Quaternion.RotationAxisToRef(viewUp,  dx * ROTATE_SENS, qX);
                        // Negate dy: BALLView convention is that dragging
                        // the cursor *up* (dy < 0) rotates the molecule's
                        // top *toward* the viewer.
                        Quaternion.RotationAxisToRef(right,  -dy * ROTATE_SENS, qY);
                        qX.multiplyToRef(qY, qCombined);

                        // Rotate camera offset (camera - target) around
                        // the target by the combined quaternion.
                        camera.position.subtractToRef(camera.target, offset);
                        offset.rotateByQuaternionToRef(qCombined, rotated);

                        // Rotate upVector too so ArcRotateCamera's
                        // recompute of (alpha, beta) doesn't decide the
                        // camera has gone over the pole.
                        camera.upVector.rotateByQuaternionToRef(qCombined, newUp);
                        newUp.normalize();
                        camera.upVector = newUp;

                        camera.setPosition(camera.target.add(rotated));
                    } else if (button === 1) {
                        // Mid → zoom by vertical drag (down = closer).
                        camera.inertialRadiusOffset -= dy * ZOOM_SENS * camera.radius;
                    } else if (button === 2) {
                        // Right → pan. inertialPanningX/Y are
                        // camera-local, so the scene slides naturally
                        // with the cursor.
                        camera.inertialPanningX -= dx * PAN_SENS;
                        camera.inertialPanningY += dy * PAN_SENS;
                    }
                    break;
            }
        });
    }

    if (canvas) ctx.camera.attachControl(canvas, true);

    ctx.mouseMode = mode;
};
