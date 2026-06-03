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
  WebXRDefaultExperience,
  CreateGround,
  WebXRFeaturesManager,
  WebXRFeatureName,
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

import { AdvancedDynamicTexture, Button, StackPanel, TextBlock, Control } from '@babylonjs/gui';

import { addRepresentation } from './rendering';
import { changeSSAOMode, SsaoCache } from './ssao';
import { RenderStyle, applyRenderStyle } from './style';
import { LightingMode, LIGHTING_MODES, applyLightingMode, lightingModeLabel } from './lighting';
import { MouseMode, MOUSE_MODES, applyMouseMode, mouseModeLabel } from './mouse';

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

export type ModelType = "BALL_AND_STICK" | "STICK" | "VAN_DER_WAALS" | "SAS" | "SES";
export const MODEL_TYPES: ModelType[] = ["BALL_AND_STICK", "STICK", "VAN_DER_WAALS", "SAS", "SES"];

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

const setupXR = async (scene: Scene): Promise<WebXRDefaultExperience | undefined> => {
  if (!navigator.xr) {
    // @ts-ignore — webxr-polyfill has no shipped types for default export
    const WebXRPolyfill = (await import("webxr-polyfill")).default;
    new WebXRPolyfill();
  }
  try {
    const floor = CreateGround("floor", { width: 100, height: 100 }, scene);
    floor.isPickable = false;  // never let picking grab the XR floor
    floor.isVisible  = false;  // exists only for XR teleportation
    const xr = await scene.createDefaultXRExperienceAsync({
      floorMeshes: [floor],
      disableDefaultUI: true,
    });
    const features = WebXRFeaturesManager.GetAvailableFeatures();
    if ("xr-layers" in features) {
      const layers = xr.baseExperience.featuresManager.enableFeature(
        WebXRFeatureName.LAYERS, "latest", { preferMultiviewOnInit: true }, true, false
      );
      layers.attach();
    }
    return xr;
  } catch {
    return undefined;
  }
};

const setupHUD = (scene: Scene): { panel: StackPanel, debugText: DebugText } => {
  const ui = AdvancedDynamicTexture.CreateFullscreenUI("hud", true, scene);

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

const setupMenuBar = (ctx: AppContext) => {
  const ui = AdvancedDynamicTexture.CreateFullscreenUI("menubar", true, ctx.scene);

  const bar = new StackPanel();
  bar.isVertical = false;
  bar.adaptWidthToChildren = true;
  bar.height = "32px";
  bar.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
  bar.verticalAlignment   = Control.VERTICAL_ALIGNMENT_TOP;
  bar.top = "8px";
  bar.paddingRight = "8px";
  ui.addControl(bar);

  const makeButton = (label: string, onClick: () => void) => {
    const btn = Button.CreateSimpleButton(label, label);
    btn.width = "120px";
    btn.height = "28px";
    btn.color = "white";
    btn.background = "rgba(0, 0, 0, 0.6)";
    btn.cornerRadius = 4;
    btn.thickness = 0;
    btn.paddingLeft  = "4px";
    btn.paddingRight = "4px";
    const text = btn.children[0] as TextBlock;
    text.fontSize = 12;
    text.fontFamily = "monospace";
    btn.onPointerUpObservable.add(onClick);
    bar.addControl(btn);
    return { btn, text };
  };

  const debugBtn = makeButton(`Debug: ${ctx.debug ? "ON" : "OFF"}`, () => {
    ctx.controls?.setDebug(!ctx.debug);
  });

  const hBtn = makeButton(`H atoms: ${ctx.hAtomsVisible ? "ON" : "OFF"}`, () => {
    ctx.controls?.setHAtomsVisible(!ctx.hAtomsVisible);
  });

  // Modes: 1 = SSAOv1, 2 = SSAOv2, 3 = off.
  const ssaoLabel = (m: number) => m === 1 ? "SSAO: v1" : m === 2 ? "SSAO: v2" : "SSAO: off";
  const ssaoBtn = makeButton(ssaoLabel(ctx.ssaoMode), () => {
    ctx.controls?.setSSAOMode((ctx.ssaoMode % 3) + 1);
  });

  const styleLabel = (s: RenderStyle) => `Style: ${s}`;
  const styleBtn = makeButton(styleLabel(ctx.renderStyle), () => {
    const next: RenderStyle = ctx.renderStyle === "default" ? "qutemol" : "default";
    ctx.controls?.setRenderStyle(next);
  });

  const modelLabel = (m: ModelType) =>
    m === "BALL_AND_STICK" ? "Model: ball+stick" :
    m === "STICK"          ? "Model: stick"      :
    m === "VAN_DER_WAALS"  ? "Model: vdW"        :
    m === "SAS"            ? "Model: SAS"        :
                             "Model: SES";
  const modelBtn = makeButton(modelLabel(ctx.activeModel), () => {
    const i = MODEL_TYPES.indexOf(ctx.activeModel);
    const next = MODEL_TYPES[(i + 1) % MODEL_TYPES.length];
    ctx.controls?.setModel(next);
  });

  const coloringLabel = (c: ColoringMethod) => `Color: ${c}`;
  const coloringBtn = makeButton(coloringLabel(ctx.activeColoring), () => {
    const i = COLORING_METHODS.indexOf(ctx.activeColoring);
    const next = COLORING_METHODS[(i + 1) % COLORING_METHODS.length];
    ctx.controls?.setColoring(next);
  });

  const densityLabel = (d: DensityLevel) => `Density: ${d}`;
  const densityBtn = makeButton(densityLabel(ctx.activeDensity), () => {
    const i = DENSITY_LEVELS.indexOf(ctx.activeDensity);
    const next = DENSITY_LEVELS[(i + 1) % DENSITY_LEVELS.length];
    ctx.controls?.setDensity(next);
  });

  const lightingBtn = makeButton(lightingModeLabel(ctx.lightingMode), () => {
    const i = LIGHTING_MODES.indexOf(ctx.lightingMode);
    const next = LIGHTING_MODES[(i + 1) % LIGHTING_MODES.length];
    ctx.controls?.setLightingMode(next);
  });

  const mouseBtn = makeButton(mouseModeLabel(ctx.mouseMode), () => {
    const i = MOUSE_MODES.indexOf(ctx.mouseMode);
    const next = MOUSE_MODES[(i + 1) % MOUSE_MODES.length];
    ctx.controls?.setMouseMode(next);
  });

  makeButton("Screenshot", () => {
    ctx.controls?.takeScreenshot();
  });

  ctx.controls = {
    setDebug: (on) => {
      ctx.debug = on;
      debugBtn.text.text = `Debug: ${on ? "ON" : "OFF"}`;
      ctx.hudPanel.isVisible = on;
    },

    setHAtomsVisible: (on) => {
      ctx.hAtomsVisible = on;
      hBtn.text.text = `H atoms: ${on ? "ON" : "OFF"}`;
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
      ctx.scene.freezeActiveMeshes();
    },

    setSSAOMode: (mode) => {
      ctx.ssaoMode = mode;
      ssaoBtn.text.text = ssaoLabel(mode);
      changeSSAOMode(ctx);
    },

    setRenderStyle: (style) => {
      applyRenderStyle(ctx, style);
      styleBtn.text.text = styleLabel(style);
    },

    setModel: (model) => {
      if (model === ctx.activeModel) return;
      // Optimistically update local state; the actual rebuild happens on
      // the Julia side and the new representation arrives via an
      // add-representation event.
      ctx.activeModel = model;
      modelBtn.text.text = modelLabel(model);
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
      coloringBtn.text.text = coloringLabel(method);
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
      densityBtn.text.text = densityLabel(level);
      ctx.sceneRoot.dispatchEvent(new CustomEvent("bv-request-density", {
        detail: { density: level },
      }));
    },

    setLightingMode: (mode) => {
      applyLightingMode(ctx, mode);
      lightingBtn.text.text = lightingModeLabel(mode);
    },

    setMouseMode: (mode) => {
      applyMouseMode(ctx, mode);
      mouseBtn.text.text = mouseModeLabel(mode);
    },

    takeScreenshot: () => {
      Tools.CreateScreenshot(ctx.engine, ctx.camera, { precision: 2 });
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

// Apply a single freshly-shipped representation: tear down the previous
// one, add the new one, re-apply the active style. Used by the initial
// add-representation event and by every model switch round-trip.
const renderRepresentation = (ctx: AppContext, repr: any) => {
  clearRepresentation(ctx);
  addRepresentation(ctx, { representation: repr });
  applyRenderStyle(ctx, ctx.renderStyle);
  ctx.scene.createOrUpdateSelectionOctree();
  ctx.scene.freezeActiveMeshes();
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

export const SceneComponent = (props: SceneComponentProps) => {
  const { id, width = '100%', height = '100%' } = props;

  const webComponentRef = useRef<HTMLDivElement | null>(null);
  const canvas          = useRef<HTMLCanvasElement | null>(null);
  const context         = useRef<AppContext | null>(null);
  const xr              = useRef<WebXRDefaultExperience | undefined>(undefined);
  const [modal, setModal] = useState<ModalState>({ open: false, text: "" });

  const update = (data: any) => {
    if (!context.current || !data.representation) return;
    if (data.active && MODEL_TYPES.includes(data.active)) {
      context.current.activeModel = data.active as ModelType;
    }
    if (data.coloring && COLORING_METHODS.includes(data.coloring)) {
      context.current.activeColoring = data.coloring as ColoringMethod;
    }
    if (data.density && DENSITY_LEVELS.includes(data.density)) {
      context.current.activeDensity = data.density as DensityLevel;
    }
    renderRepresentation(context.current, data.representation);
  };

  const resizeHandler = () => {
    if (!context.current || !canvas.current || !webComponentRef.current) return;

    const newWidth  = webComponentRef.current.getAttribute("width")  || "100%";
    const newHeight = webComponentRef.current.getAttribute("height") || "100%";

    const containerWidth  = webComponentRef.current.offsetWidth;
    const containerHeight = webComponentRef.current.offsetHeight;

    const parsePx = (v: string, container: number) => {
      if (v.endsWith("%"))  return container * (parseFloat(v) / 100);
      if (v.endsWith("px")) return parseFloat(v);
      return container;
    };

    canvas.current.setAttribute("width",  parsePx(newWidth,  containerWidth).toString());
    canvas.current.setAttribute("height", parsePx(newHeight, containerHeight).toString());
    canvas.current.style.width  = "100%";
    canvas.current.style.height = "100%";

    context.current.scene.getEngine().resize();
  };

  const init = async () => {
    if (!canvas.current || !webComponentRef.current) return;

    const engine = new Engine(canvas.current, true);
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
    xr.current = await setupXR(scene);
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
      hudPanel,
      debugText,
      update,
      sceneRoot: webComponentRef.current,
    };
    context.current = ctx;

    setupInstrumentation(ctx, engineInst, sceneInst);
    setupPicking(ctx, setModal);
    setupMenuBar(ctx);
    // Apply the initial mouse mode so the BALLView pointer observer is
    // actually wired up (the default mode is BALLView; flipping the
    // string alone wouldn't attach the observer).
    applyMouseMode(ctx, ctx.mouseMode);

    window.addEventListener("resize", resizeHandler);
  };

  // Custom-event bridge from the Julia/Bonito side.
  useEffect(() => {
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
      context.current?.scene.getEngine().dispose();
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
    <div ref={webComponentRef} id={id + "-div"} style={{ width, height, position: 'relative' }}>
      <canvas style={{ width: "100%", height: "100%" }} ref={canvas} />
      {modal.open && (
        <div style={{
          position: 'absolute',
          top: 8,
          right: 8,
          background: 'rgba(0, 0, 0, 0.85)',
          color: 'white',
          padding: '12px 16px 12px 12px',
          borderRadius: 6,
          fontFamily: 'monospace',
          fontSize: 12,
          whiteSpace: 'pre',
          zIndex: 10,
          maxWidth: '40%',
          boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
        }}>
          <button
            onClick={() => setModal({ open: false, text: "" })}
            aria-label="Close"
            style={{
              float: 'right',
              marginLeft: 12,
              background: 'transparent',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontSize: 16,
              lineHeight: 1,
              padding: 0,
            }}
          >×</button>
          {modal.text}
        </div>
      )}
    </div>
  );
};

export default SceneComponent;
export type { DebugText };
