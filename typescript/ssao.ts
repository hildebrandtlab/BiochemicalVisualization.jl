import { AppContext } from './SceneComponent';
import { Scene, SSAORenderingPipeline, SSAO2RenderingPipeline } from '@babylonjs/core';

const createSSAO = (scene: Scene) => {
    const ssaoRatio = {
        ssaoRatio: 0.5,
        combineRatio: 1.0,
    };
    const ssao = new SSAORenderingPipeline(
        "ssao",
        scene,
        ssaoRatio,
        undefined,
    );
    ssao.totalStrength = 1.3;
    ssao.radius = 6e-4;
    ssao.area = 1.0;
    ssao.fallOff = 1e-6;
    ssao.base = 0.5;
    return ssao;
}

const createSSAO2 = (scene: Scene) => {
    const ssaoRatio = {
        ssaoRatio: 0.5,
        blurRatio: 0.5,
    };
    const ssao = new SSAO2RenderingPipeline(
        "ssao2",
        scene,
        ssaoRatio,
        undefined
    );
    ssao.maxZ = 500;
    ssao.radius = 12.0;
    ssao.totalStrength = 1.3;
    ssao.expensiveBlur = false;
    ssao.samples = 16;
    if (scene.prePassRenderer) {
        scene.prePassRenderer.samples = 16;
    }
    return ssao;
}

const attachSSAO = (ctx: AppContext) => {
    console.log("Attaching SSAO...");
    ctx.scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline(
        ctx.ssaoPipelineName,
        ctx.camera
    );
    ctx.scene.postProcessRenderPipelineManager.enableEffectInPipeline(
        ctx.ssaoPipelineName,
        ctx.ssaoPipeline.SSAOCombineRenderEffect,
        ctx.camera
    );

    return true;
}

const detachSSAO = (ctx: AppContext) => {
    console.log("Detaching SSAO...");
    ctx.scene.postProcessRenderPipelineManager.disableEffectInPipeline(
        ctx.ssaoPipelineName,
        ctx.ssaoPipeline.SSAOCombineRenderEffect,
        ctx.camera
    );
    ctx.scene.postProcessRenderPipelineManager.detachCamerasFromRenderPipeline(
        ctx.ssaoPipelineName,
        ctx.camera
    );
    ctx.ssaoPipeline.dispose();

    return false;
}

const createAndAttachSSAO = (ctx: AppContext) => {
    if (ctx.isAttached) {
        ctx.isAttached = detachSSAO(ctx);
    }

    if (ctx.ssaoMode === 1) {
        ctx.ssaoPipeline = createSSAO(ctx.scene);
        ctx.ssaoPipelineName = "ssao";
    } else if (ctx.ssaoMode === 2) {
        ctx.ssaoPipeline = createSSAO2(ctx.scene);
        ctx.ssaoPipelineName = "ssao2";
    }

    ctx.isAttached = attachSSAO(ctx);
}

const changeSSAOMode = (ctx: AppContext) => {
    const scene = ctx.scene;
    const camera = ctx.camera;

    if (ctx.ssaoMode === 1 || ctx.ssaoMode === 2) {
        createAndAttachSSAO(ctx);
    }
    if (ctx.ssaoMode === 3) {
        console.log("Draw SSAO Effect...");
        if (!ctx.isAttached) {
            ctx.isAttached = attachSSAO(ctx);
        }
        scene.postProcessRenderPipelineManager.disableEffectInPipeline(
            ctx.ssaoPipelineName,
            ctx.ssaoPipeline.SSAOCombineRenderEffect,
            camera
        );
        ctx.debugText.drawCallsCount.color = "black";
        ctx.debugText.evalActiveMeshes.color = "black";
        ctx.debugText.fpsText.color = "black";
        ctx.debugText.frameRenderTimeCPU.color = "black";
        ctx.debugText.frameRenderTimeGPU.color = "black";
        ctx.debugText.frameRenderTimeGPUAverage.color = "black";
        ctx.debugText.interFrameTimeCPU.color = "black";
    }
    if (ctx.ssaoMode === 4) {
        if (ctx.isAttached) {
            console.log("Disable Draw Effect...");
            scene.postProcessRenderPipelineManager.enableEffectInPipeline(
                ctx.ssaoPipelineName,
                ctx.ssaoPipeline.SSAOCombineRenderEffect,
                camera
            );
            ctx.debugText.drawCallsCount.color = "white";
            ctx.debugText.evalActiveMeshes.color = "white";
            ctx.debugText.fpsText.color = "white";
            ctx.debugText.frameRenderTimeCPU.color = "white";
            ctx.debugText.frameRenderTimeGPU.color = "white";
            ctx.debugText.frameRenderTimeGPUAverage.color = "white";
            ctx.debugText.interFrameTimeCPU.color = "white";
        }
    }
    if (ctx.ssaoMode === 5) {
        ctx.isAttached = detachSSAO(ctx);
    }
}

export {
    createAndAttachSSAO,
    attachSSAO,
    detachSSAO,
    createSSAO,
    createSSAO2,
    changeSSAOMode
}