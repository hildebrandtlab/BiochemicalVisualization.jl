import { AppContext } from './SceneComponent';
import { Scene, SSAORenderingPipeline, SSAO2RenderingPipeline } from '@babylonjs/core';

// Three SSAO modes are exposed to users:
//   1 = legacy SSAOv1 pipeline
//   2 = SSAOv2 pipeline
//   3 = off (detached)
//
// History: earlier we disposed the pipeline on every mode switch and
// then manually disabled the geometry-buffer / pre-pass renderers. That
// left Babylon's render graph in a state we couldn't reliably clean up
// — cycling to "off" produced a black canvas. The current approach
// caches both pipelines for the session and only toggles camera
// attachment; nothing is disposed until the scene itself goes away.

export type SsaoCache = {
    ssao?: SSAORenderingPipeline,
    ssao2?: SSAO2RenderingPipeline,
};

const createSSAO = (scene: Scene) => {
    const ssao = new SSAORenderingPipeline(
        "ssao",
        scene,
        { ssaoRatio: 0.5, combineRatio: 1.0 },
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
    const ssao = new SSAO2RenderingPipeline(
        "ssao2",
        scene,
        { ssaoRatio: 0.5, blurRatio: 0.5 },
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

const changeSSAOMode = (ctx: AppContext) => {
    // Detach whatever's currently attached. Cached pipeline stays alive
    // for the session — we never dispose.
    if (ctx.ssaoPipelineName) {
        ctx.scene.postProcessRenderPipelineManager.detachCamerasFromRenderPipeline(
            ctx.ssaoPipelineName, ctx.camera
        );
    }

    if (ctx.ssaoMode === 1) {
        if (!ctx.ssaoCache.ssao) {
            ctx.ssaoCache.ssao = createSSAO(ctx.scene);
        }
        ctx.scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline(
            "ssao", ctx.camera
        );
        ctx.ssaoPipeline = ctx.ssaoCache.ssao;
        ctx.ssaoPipelineName = "ssao";
    } else if (ctx.ssaoMode === 2) {
        if (!ctx.ssaoCache.ssao2) {
            ctx.ssaoCache.ssao2 = createSSAO2(ctx.scene);
        }
        ctx.scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline(
            "ssao2", ctx.camera
        );
        ctx.ssaoPipeline = ctx.ssaoCache.ssao2;
        ctx.ssaoPipelineName = "ssao2";
    } else {
        // mode 3 = off; nothing attached.
        ctx.ssaoPipeline = null;
        ctx.ssaoPipelineName = "";
    }
}

export {
    createSSAO,
    createSSAO2,
    changeSSAOMode,
}
