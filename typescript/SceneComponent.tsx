import React, { useImperativeHandle, forwardRef, useEffect } from 'react';

import {
  Scene, Engine, ArcRotateCamera, Mesh, AbstractMesh,
  AssetsManager, SSAORenderingPipeline, SSAO2RenderingPipeline,
  PointerInfo, Observer, VideoRecorder,
  EngineInstrumentation,
  SceneInstrumentation,
  PointLight,
  HemisphericLight,
  Vector3,
  WebXRDefaultExperience,
  CreateGround,
  WebXRFeaturesManager,
  WebXRFeatureName,
  PointerDragBehavior,
  PickingInfo,
  PointerEventTypes,
  Color4
} from '@babylonjs/core';

import { Inspector } from '@babylonjs/inspector';

import { TextBlock } from '@babylonjs/gui';

import { addRepresentation, renderRepresentation } from './rendering';
import { createSSAO2, changeSSAOMode } from './ssao';

type SceneComponentProps = {
  id: string;
  width: string;
  height: string;
};

export type AppContext = {
  scene: Scene,
  engine: Engine,
  camera: ArcRotateCamera,

  meshes: Array<Mesh | AbstractMesh>,
  highlightMesh?: Mesh,
  pickedMesh?: Mesh,

  assetsManager: AssetsManager,

  ssaoPipeline: SSAORenderingPipeline | SSAO2RenderingPipeline,
  ssaoPipelineName: string,
  isAttached: boolean,
  ssaoMode: number,
  pointerMoved: boolean,
  hAtomsVisible: boolean,
  curDisplayMode: string,

  clickObserver: Observer<PointerInfo> | null,
  editObserver: Observer<PointerInfo> | null,

  moleculeFilePath: string,

  debugText: DebugText,
  videoRecorder?: VideoRecorder,

  mouseDown: boolean,
  isDragging: boolean,

  update: (data: any) => void,
  editor_update: (data: any) => void,
};

type DebugText = {
  frameRenderTimeGPU: TextBlock,
  frameRenderTimeGPUAverage: TextBlock,
  evalActiveMeshes: TextBlock,
  frameRenderTimeCPU: TextBlock,
  interFrameTimeCPU: TextBlock,
  drawCallsCount: TextBlock
  fpsText: TextBlock,
}


export const SceneComponent = forwardRef((props: SceneComponentProps, ref) => {

  const { id, width = '100%', height = '100%' } = props; // Default to 100%

  const webComponentRef = React.useRef<HTMLDivElement>(null);
  const canvas = React.useRef<HTMLCanvasElement>(null);
  const context = React.useRef<AppContext>(null);
  const xr = React.useRef<WebXRDefaultExperience>(undefined);
  const [modalText, setModalText] = React.useState<string>("");
  const [isModalOpen, setModalOpen] = React.useState<boolean>(false);
  const [isLoadedPDB, setLoadedPDB] = React.useState<boolean>(false);

  // Function to update the scene with new data
  const update = (data: any) => {
    context.current?.scene.meshes.forEach((mesh) => mesh.dispose());
    context.current?.meshes.forEach((mesh) => mesh.dispose());
    if (context.current) {
      context.current.meshes = [];
      addRepresentation(context.current, data);
    }
    context.current?.scene.createOrUpdateSelectionOctree();
    context.current?.scene.freezeActiveMeshes();
    setLoadedPDB(true);
  }

  // Function to update the scene in editor mode
  const editor_update = (data: any) => {
    if (!context.current) {
      return;
    }
    context.current.scene.meshes.forEach((mesh) => mesh.dispose());
    context.current.meshes.forEach((mesh) => mesh.dispose());
    context.current.meshes = [];
    addRepresentation(context.current, data);
    context.current.scene.createOrUpdateSelectionOctree();
    context.current.scene.freezeActiveMeshes();
    addDragBehaviour(context.current);
  }

  // Function to add drag behavior to atoms
  const addDragBehaviour = (ctx: AppContext) => {
    const atoms = ctx.meshes.filter((mesh) => mesh.name === "childSphere");
    atoms.forEach((mesh) => {
      const pointerDragBehaviour = new PointerDragBehavior();
      pointerDragBehaviour.onDragStartObservable.add(() => {
        mesh.unfreezeWorldMatrix();
      });
      pointerDragBehaviour.onDragObservable.add(() => {
        ctx.scene.createOrUpdateSelectionOctree();
      })
      pointerDragBehaviour.onDragEndObservable.add(async () => {
        const updateObject = {
          atomIdx: mesh.metadata.meta[2],
          newPosition: mesh.position,
        };

        /** TODO: replace */
        /*
        const headers = new Headers();
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');

        const request: RequestInfo = new Request('/api/editor/update_atom_position', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(updateObject),
        });

        await fetch(request).then(res => res.json()).then(res => console.log(res));
        */
        mesh.freezeWorldMatrix();
      });
      mesh.addBehavior(pointerDragBehaviour);
    });
  }

  // Function to remove drag behavior from atoms
  const removeDragBehaviour = (ctx: AppContext) => {
    const atoms = ctx.meshes.filter((mesh) => mesh.name === "childSphere");
    atoms.forEach((mesh) => mesh.removeBehavior(mesh.behaviors[0]));
  }

  // Function to handle resizing of the scene
  const resizeHandler = () => {
    if (!context.current || !canvas.current || !webComponentRef.current) return;
    const scene = context.current.scene;

    // Get the width and height from the web component attributes
    const newWidth = webComponentRef.current.getAttribute("width") || "100%";
    const newHeight = webComponentRef.current.getAttribute("height") || "100%";

    let pixelWidth: number;
    let pixelHeight: number;

    // Calculate pixel values for width
    if (newWidth.endsWith("%")) {
      const percentageWidth = parseFloat(newWidth) / 100;
      pixelWidth = webComponentRef.current.offsetWidth * percentageWidth;
    } else if (newWidth.endsWith("px")) {
      pixelWidth = parseFloat(newWidth);
    } else {
      pixelWidth = webComponentRef.current.offsetWidth;
    }

    // Calculate pixel values for height
    if (newHeight.endsWith("%")) {
      const percentageHeight = parseFloat(newHeight) / 100;
      pixelHeight = webComponentRef.current.offsetHeight * percentageHeight;
    } else if (newHeight.endsWith("px")) {
      pixelHeight = parseFloat(newHeight);
    } else {
      pixelHeight = webComponentRef.current.offsetHeight;
    }

    // Apply the width and height to the canvas attributes
    canvas.current.setAttribute("width", pixelWidth.toString());
    canvas.current.setAttribute("height", pixelHeight.toString());

    // Apply the width and height to the canvas style
    canvas.current.style.width = "100%";
    canvas.current.style.height = "100%";

    scene.getEngine().resize();
  }

  // Function to initialize the scene
  const init = async () => {
    console.log("init")
    if (!canvas.current) return;

    const engine = new Engine(canvas.current, true);
    const scene = new Scene(engine);
    const assetsManager = new AssetsManager(scene);
    const videoRecorder = new VideoRecorder(engine);

    scene.clearColor = new Color4(0.0, 0.0, 0.0, 1.0);

    const engineInstrumentation = new EngineInstrumentation(engine);
    engineInstrumentation.captureGPUFrameTime = true;

    const sceneInstrumentation = new SceneInstrumentation(scene);
    sceneInstrumentation.captureActiveMeshesEvaluationTime = true;
    sceneInstrumentation.captureRenderTime = true;
    sceneInstrumentation.captureInterFrameTime = true;

    const camera = new ArcRotateCamera(
      "camera",
      -2 * Math.PI,
      2 * Math.PI,
      12,
      Vector3.Zero(),
      scene
    );
    camera.attachControl(canvas.current, true);
    camera.useFramingBehavior = true;
    if (camera.framingBehavior) {
      camera.framingBehavior.elevationReturnTime = -1;
    }

    const ambientLight = new HemisphericLight("lightSource", new Vector3(0, 1, 0), scene);
    ambientLight.intensity = 0.3;

    const pointLight = new PointLight("pointLight", new Vector3(0, 0, 0), scene);
    pointLight.intensity = 0.7;

    pointLight.parent = camera;

    if (!navigator.xr) {
      // @ts-ignore
      const WebXRPolyfill = (await import("webxr-polyfill")).default;
      new WebXRPolyfill();
    }

    try {
      xr.current = await scene.createDefaultXRExperienceAsync({
        floorMeshes: [CreateGround("floor", { width: 100, height: 100 }, scene)],
        disableDefaultUI: true,
      });

      const features = WebXRFeaturesManager.GetAvailableFeatures();

      if ("xr-layers" in features) {
        const layers = xr.current.baseExperience.featuresManager.enableFeature(
          WebXRFeatureName.LAYERS, "latest", { preferMultiviewOnInit: true }, true, false
        );
        layers.attach();
      }
    } catch {

    }

    const ssao = createSSAO2(scene);

    const debugText = {
      frameRenderTimeGPU: new TextBlock(),
      frameRenderTimeGPUAverage: new TextBlock(),
      evalActiveMeshes: new TextBlock(),
      frameRenderTimeCPU: new TextBlock(),
      interFrameTimeCPU: new TextBlock(),
      drawCallsCount: new TextBlock(),
      fpsText: new TextBlock(),
    };

    context.current = {
      scene,
      engine,
      camera,
      meshes: [],
      highlightMesh: undefined,
      pickedMesh: undefined,
      assetsManager,
      ssaoPipeline: ssao,
      ssaoPipelineName: "",
      isAttached: false,
      ssaoMode: 5,
      curDisplayMode: "",
      pointerMoved: false,
      hAtomsVisible: true,
      moleculeFilePath: "",
      clickObserver: null,
      editObserver: null,
      debugText,
      videoRecorder,
      mouseDown: false,
      isDragging: false,
      update,
      editor_update,
    };

    scene.registerBeforeRender(() => {
      if (!context.current) {
        return;
      }

      if (!engineInstrumentation.gpuFrameTimeCounter) {
        return;
      }

      context.current.debugText.frameRenderTimeGPU.text = "Current Frame Time (GPU): " + (engineInstrumentation.gpuFrameTimeCounter.current * 0.000001).toFixed(2) + "ms";
      context.current.debugText.frameRenderTimeGPUAverage.text = "Average Frame Time (GPU): " + (engineInstrumentation.gpuFrameTimeCounter.average * 0.000001).toFixed(2) + "ms";
    });

    context.current.clickObserver = new Observer<PointerInfo>((pointerInfo, _) => {

      if (!context.current) {
        return;
      }

      let result: PickingInfo;
      switch (pointerInfo.type) {
        case PointerEventTypes.POINTERDOWN:
          context.current.pointerMoved = false;
          break;

        case PointerEventTypes.POINTERUP:
          if (context.current.pointerMoved) return;
          scene.unfreezeActiveMeshes();
          result = scene.pick(scene.pointerX, scene.pointerY);
          if (result.hit && result.pickedMesh !== context.current.pickedMesh && result.pickedMesh !== context.current.highlightMesh) {
            context.current.pickedMesh = result.pickedMesh as Mesh;
            context.current.pickedMesh?.setEnabled(false);

            context.current.highlightMesh?.setEnabled(true);
            context.current.highlightMesh?.position.copyFrom(context.current.pickedMesh.position);
            context.current.highlightMesh?.scaling.copyFrom(context.current.pickedMesh.scaling);
            context.current.highlightMesh?.rotation.copyFrom(context.current.pickedMesh.rotation);

            setModalText("Element Symbol: " + context.current.pickedMesh.metadata.meta[1] + "\n" +
              "Metadata: " + context.current.pickedMesh.metadata.meta + "\n" +
              "Position: { X: " + context.current.pickedMesh.position.x.toFixed(3) +
              " Y: " + context.current.pickedMesh.position.y.toFixed(3) +
              " Z: " + context.current.pickedMesh.position.z.toFixed(3) + " }" + "\n" +
              "Color: " + context.current.pickedMesh.instancedBuffers.color.toString());
            setModalOpen(true);
          }
          scene.freezeActiveMeshes();
          break;

        case PointerEventTypes.POINTERMOVE:
          context.current.pointerMoved = true;
          break;
      }
    }, PointerEventTypes.POINTERDOWN + PointerEventTypes.POINTERMOVE + PointerEventTypes.POINTERUP);

    scene.onPointerObservable.add(context.current.clickObserver.callback, context.current.clickObserver.mask);

    scene.onAfterRenderObservable.add(() => {
      if (!context.current) {
        return;
      }

      context.current.debugText.frameRenderTimeCPU.text = "Current Frame Time (CPU): " + (sceneInstrumentation.renderTimeCounter.current).toFixed(2) + "ms";
      context.current.debugText.interFrameTimeCPU.text = "Time between Frames (CPU): " + (sceneInstrumentation.interFrameTimeCounter.current).toFixed(2) + "ms";
      context.current.debugText.evalActiveMeshes.text = "Active Mesh Eval Time: " + (sceneInstrumentation.activeMeshesEvaluationTimeCounter.current).toFixed(2) + "ms";
      context.current.debugText.drawCallsCount.text = "Total Draw Call Count: " + sceneInstrumentation.drawCallsCounter.current;
    });

    engine.runRenderLoop(() => {
      scene.render();

      if (!context.current) {
        return;
      }
      context.current.debugText.fpsText.text = "Current FPS: " + context.current.engine.getFps().toFixed(2);
    });

    // TODO: replace

    //fetch("/api/page_reload").then(res => res.json()).then(res => console.log(res));
    window.addEventListener("resize", resizeHandler);

    console.log("init done");
  }

  // Event handlers for custom events from Julia
  useEffect(() => {

    const handleAddRepresentation: EventListener = (event) => {
      console.log('Event from React:', event);
      if (event instanceof CustomEvent) {
        console.log('Event from React:', event.detail);

        update(event.detail);

      }
    };

    const handleSetFocus: EventListener = (event) => {
      if (event instanceof CustomEvent) {
        if (context.current) {
          console.log('Event from React:', event.detail);

          context.current.camera.setTarget(new Vector3(event.detail.focus_point[0], event.detail.focus_point[1], event.detail.focus_point[2]));
        }
      }
    };

    const handleSetRenderMode: EventListener = (event) => {
      if (event instanceof CustomEvent) {
        if (context.current) {
          console.log('Event from React:', event.detail);

          if ("ssao_mode" in event.detail) {
            context.current.ssaoMode = event.detail.ssao_mode;
            changeSSAOMode(context.current);
          }

          if ("debug" in event.detail) {
            if (event.detail.debug) {
              Inspector.Show(context.current.scene, { embedMode: true });
            }
          }
        }
      }
    };

    init().then(() => {
      if (webComponentRef.current) {
        console.log('Adding event listener to web component');
        webComponentRef.current.addEventListener("add-representation", handleAddRepresentation);
        webComponentRef.current.addEventListener("set-focus", handleSetFocus);
        webComponentRef.current.addEventListener("set-render-mode", handleSetRenderMode);
        webComponentRef.current.dispatchEvent(new CustomEvent('bv-scene-mounted', { bubbles: true, composed: true }));
        // Trigger resizeHandler to set the initial size
        setTimeout(() => {
          requestAnimationFrame(resizeHandler);
        }, 0);
      }
    });

    // Cleanup function to remove event listeners
    return () => {
      context.current?.scene.getEngine().dispose();

      window.removeEventListener("resize", resizeHandler);
      webComponentRef.current?.removeEventListener("add-representation", handleAddRepresentation);
      webComponentRef.current?.removeEventListener("set-focus", handleSetFocus);
      webComponentRef.current?.removeEventListener("set-render-mode", handleSetRenderMode);
    };

  }, []);

  return <div ref={webComponentRef} id={id + "-div"} style={{ width: width, height: height }}>
    <canvas className='relative bg-black' style={{ width: "100%", height: "100%" }} ref={canvas}></canvas>
  </div>;
})

export default SceneComponent;
export type { DebugText };
