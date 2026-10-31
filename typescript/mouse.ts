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
//                left  drag           → orbit (camera-local up/right)
//                mid   drag           → zoom  (vertical drag, down=closer)
//                right drag           → translate (pan)
//                shift + left drag    → zoom  (BALL shortcut)
//                ctrl  + left drag    → translate (BALL shortcut)
//                wheel                → zoom
//              Touch (BALLView didn't have to answer this; phones do):
//                one finger drag      → orbit
//                two finger pinch     → zoom
//                two finger drag      → translate (pan)
//              Pinch and pan are read from the same two-finger gesture
//              (distance change → zoom, centroid change → pan), like
//              every map app — no mode switching needed.
//              Pan is implemented by directly translating
//              `camera.target` along the camera-local right / up axes,
//              not via `inertialPanningX/Y`. The latter is only
//              applied by Babylon's stock pointer input, which we
//              detach in this mode.

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
// pixel; pan is in world units per pixel, scaled by camera radius so a
// drag covers the same fraction of the visible scene at any zoom
// level.
const ROTATE_SENS = 0.005;
const PAN_SENS    = 0.0015;
const ZOOM_SENS   = 0.005;

const suppressContextMenu = (e: Event) => e.preventDefault();

export const applyMouseMode = (ctx: AppContext, mode: MouseMode) => {
    const canvas = ctx.engine.getRenderingCanvas();

    // Tear down any previous BALLView observer, context-menu
    // suppressor, and pointercancel listener.
    if (ctx.mouseObserver) {
        ctx.scene.onPointerObservable.remove(ctx.mouseObserver);
        ctx.mouseObserver = null;
    }
    if (ctx.mouseModeCleanup) {
        ctx.mouseModeCleanup();
        ctx.mouseModeCleanup = null;
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
        const panDelta  = new Vector3();

        // Active pointers, tracked per pointerId in client coordinates.
        // A mouse is a single entry; touch can hold several fingers.
        // Only deltas are consumed, so the coordinate origin is
        // irrelevant. (The old single lastX/lastY pair silently
        // corrupted itself as soon as a second finger landed.)
        const pointers = new Map<number, { x: number; y: number }>();
        let button = -1;

        // Resolve the BALL action (rotate/zoom/translate) for a given
        // mouse-button + modifier combination. Mirrors the switch in
        // src/VIEW/KERNEL/MODES/rotateMode.C lines 60-78.
        type Action = "rotate" | "zoom" | "translate" | null;
        const actionFor = (btn: number, ev: PointerEvent): Action => {
            if (btn === 2) return "translate";                    // right
            if (btn === 1) return "zoom";                         // middle
            if (btn === 0) {
                if (ev.shiftKey) return "zoom";                   // shift+left
                if (ev.ctrlKey || ev.metaKey) return "translate"; // ctrl+left (cmd on macOS)
                return "rotate";                                  // plain left
            }
            return null;
        };

        ctx.mouseObserver = ctx.scene.onPointerObservable.add((pi: PointerInfo) => {
            const e = pi.event as PointerEvent;
            switch (pi.type) {
                case PointerEventTypes.POINTERDOWN:
                    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
                    button = e.button;
                    break;
                case PointerEventTypes.POINTERUP:
                    pointers.delete(e.pointerId);
                    break;
                case PointerEventTypes.POINTERMOVE: {
                    const p = pointers.get(e.pointerId);
                    if (!p) return;

                    const camera = ctx.camera;

                    // Camera-local basis: forward (target − position),
                    // right (forward × upVector), viewUp (right ×
                    // forward). Same vectors BALLView's
                    // scene.C::getRightVector / getLookUpVector use.
                    camera.target.subtractToRef(camera.position, forward);
                    forward.normalize();
                    Vector3.CrossToRef(forward, camera.upVector, right);
                    right.normalize();
                    Vector3.CrossToRef(right, forward, viewUp);
                    viewUp.normalize();

                    // Two-finger gesture: distance change → zoom,
                    // centroid change → pan. Both read from the same
                    // gesture each move, so pinch-while-dragging works
                    // the way it does in a map app.
                    if (pointers.size >= 2 && e.pointerType === "touch") {
                        const [a1, b1] = [...pointers.values()];
                        const prevDist = Math.hypot(a1.x - b1.x, a1.y - b1.y);
                        const prevCx   = (a1.x + b1.x) / 2;
                        const prevCy   = (a1.y + b1.y) / 2;

                        p.x = e.clientX;
                        p.y = e.clientY;

                        const [a2, b2] = [...pointers.values()];
                        const newDist = Math.hypot(a2.x - b2.x, a2.y - b2.y);
                        const newCx   = (a2.x + b2.x) / 2;
                        const newCy   = (a2.y + b2.y) / 2;

                        // Spreading the fingers zooms IN — same sign
                        // convention as the drag-zoom below ("down =
                        // closer" maps to "apart = closer").
                        camera.inertialRadiusOffset -=
                            (newDist - prevDist) * ZOOM_SENS * camera.radius;

                        panDelta.set(0, 0, 0);
                        panDelta.addInPlace(right.scale(-(newCx - prevCx) * PAN_SENS * camera.radius));
                        panDelta.addInPlace(viewUp.scale((newCy - prevCy) * PAN_SENS * camera.radius));
                        camera.target.addInPlace(panDelta);
                        return;
                    }

                    const dx = e.clientX - p.x;
                    const dy = e.clientY - p.y;
                    p.x = e.clientX;
                    p.y = e.clientY;

                    const action = actionFor(button, e);

                    if (action === "rotate") {
                        // Orbit around the camera-local axes so a
                        // horizontal drag stays aligned with screen-X
                        // regardless of tilt.
                        Quaternion.RotationAxisToRef(viewUp,  dx * ROTATE_SENS, qX);
                        // Negate dy: BALLView convention — dragging
                        // the cursor *up* (dy < 0) rotates the
                        // molecule's top *toward* the viewer.
                        Quaternion.RotationAxisToRef(right,  -dy * ROTATE_SENS, qY);
                        qX.multiplyToRef(qY, qCombined);

                        // Rotate camera offset (camera - target) around
                        // the target by the combined quaternion.
                        camera.position.subtractToRef(camera.target, offset);
                        offset.rotateByQuaternionToRef(qCombined, rotated);

                        // Rotate upVector too so ArcRotateCamera's
                        // recompute of (alpha, beta) doesn't decide
                        // the camera has gone over the pole.
                        camera.upVector.rotateByQuaternionToRef(qCombined, newUp);
                        newUp.normalize();
                        camera.upVector = newUp;

                        camera.setPosition(camera.target.add(rotated));
                    } else if (action === "zoom") {
                        // Vertical drag, down = closer (matches BALL).
                        camera.inertialRadiusOffset -= dy * ZOOM_SENS * camera.radius;
                    } else if (action === "translate") {
                        // Pan by directly shifting the target along the
                        // camera-local right / up axes. Scale by radius
                        // so a drag covers the same scene fraction at
                        // any zoom level. Babylon's `inertialPanningX/Y`
                        // would be cleaner but only ticks when the stock
                        // pointer input is attached — which we detach in
                        // this mode, so we apply the translation
                        // directly here.
                        panDelta.set(0, 0, 0);
                        panDelta.addInPlace(right.scale(-dx * PAN_SENS * camera.radius));
                        panDelta.addInPlace(viewUp.scale(dy * PAN_SENS * camera.radius));
                        camera.target.addInPlace(panDelta);
                    }
                    break;
                }
            }
        });

        // iOS Safari fires pointercancel when it decides the browser
        // owns a gesture; a cancelled finger never delivers POINTERUP
        // through Babylon, and a stale map entry would leave us stuck
        // in "two-finger" interpretation. Clear everything.
        if (canvas) {
            const cancelAll = () => pointers.clear();
            canvas.addEventListener("pointercancel", cancelAll);
            ctx.mouseModeCleanup = () => {
                canvas.removeEventListener("pointercancel", cancelAll);
            };
        }
    }

    if (canvas) ctx.camera.attachControl(canvas, true);

    ctx.mouseMode = mode;
};
