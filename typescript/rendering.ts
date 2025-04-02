
import { AppContext } from "./SceneComponent";

import { Vector3, Mesh, StandardMaterial, HighlightLayer, Color3, MeshBuilder, Color4, Tags, InstancedMesh, Quaternion, Space } from "@babylonjs/core";


function* zip(arrays: any[]) {
    let iterators = arrays.map((a) => a[Symbol.iterator]());
    while (true) {
        let results = iterators.map((it) => it.next());
        if (results.some((r) => r.done)) return;
        yield results.map((r) => r.value);
    }
}

const addRepresentation = (ctx: AppContext, data: any) => {
    console.log(`Adding representation`);
    console.log(data);
    //ctx.camera.setTarget(new Vector3(data.camera_focus[0], data.camera_focus[1], data.camera_focus[2]));
    let mesh = renderRepresentation(ctx, data.representation);
    console.log(`Adding mesh to scene`);
    console.log(mesh);
    mesh.children.forEach((child: Mesh|InstancedMesh) => {
        ctx.scene.addMesh(child);
        child.freezeWorldMatrix();
    });
    ctx.meshes = ctx.meshes.concat(mesh.children);
    ctx.engine.hideLoadingUI();
}

const renderRepresentation = (ctx: AppContext, repr: any) => {
    let meshes = { children: [] as (Mesh|InstancedMesh)[] };
    const material = new StandardMaterial("material");
    for (let key in repr.primitives) {
        switch (key) {
            case "spheres":
                const sphere_colors = repr.colors["sphere_colors"];
                const spheres = repr.primitives[key];
                const root_sphere = MeshBuilder.CreateSphere(
                    "rootSphere",
                    { diameter: 1.0, segments: 32 },
                    ctx.scene
                );

                root_sphere.material = material;
                root_sphere.registerInstancedBuffer("color", 4);

                const highlight = new HighlightLayer("highlight", ctx.scene);
                ctx.highlightMesh = root_sphere.clone("highlightMesh");
                if (ctx.highlightMesh) {
                    highlight.addMesh(ctx.highlightMesh, Color3.Blue());
                }
                ctx.highlightMesh?.setEnabled(false);

                root_sphere.isVisible = false;

                for (let [sphere, sphere_color, sphere_meta_data] of zip([spheres, sphere_colors, repr.meta_data])) {
                    let instance = root_sphere.createInstance("childSphere");
                    instance.isVisible = true;
                    // instance.alwaysSelectAsActiveMesh = true;
                    instance.instancedBuffers.color = Color4.FromHexString(sphere_color.replace("0x", "#"));
                    //instance.instancedBuffers.color = Color4.FromHexString(sphere_color);
                    instance.billboardMode = 7;
                    instance.metadata = { meta: sphere_meta_data };
                    instance.position.copyFromFloats(sphere.center[0], sphere.center[1], sphere.center[2]);
                    // console.log(instance.worldMatrixFromCache);
                    instance.scaling = instance.scaling.scale(sphere.r * 2.0);
                    Tags.AddTagsTo(instance, sphere_meta_data[1]);

                    instance.isVisible = sphere_meta_data[1] === "H" ? ctx.hAtomsVisible : true;

                    meshes.children.push(instance);
                }
                break;

            case "cylinders":
                const cylinder_colors = repr.colors["cylinder_colors"];
                const cylinders = repr.primitives[key];
                let root_cylinder = MeshBuilder.CreateCylinder(
                    "rootCylinder",
                    { diameter: 1.0, tessellation: 24, height: 1.0 },
                    ctx.scene
                );
                root_cylinder.material = material;
                root_cylinder.registerInstancedBuffer("color", 4);
                root_cylinder.isVisible = false;

                for (let [cylinder, cylinder_color] of zip([cylinders, cylinder_colors])) {
                    let instance = createCylinderInstance(cylinder_color, cylinder, root_cylinder);
                    // instance.alwaysSelectAsActiveMesh = true;
                    meshes.children.push(instance);
                }
                break;
        }
    }
    return meshes;
}

const createCylinderInstance = (color: any, cylinder_data: { origin: any[]; extremity: any[]; r: number; }, root_instance: Mesh) => {
    let s = new Vector3(
        cylinder_data.origin[0],
        cylinder_data.origin[1],
        cylinder_data.origin[2]
    );
    let m = new Vector3(
        cylinder_data.extremity[0],
        cylinder_data.extremity[1],
        cylinder_data.extremity[2]
    );

    const instance: InstancedMesh = root_instance.createInstance("childCylinder");
    instance.instancedBuffers.color = Color4.FromHexString(color.replace("0x", "#"));
    instance.scaling = instance.scaling.scale(cylinder_data.r * 2.0);
    instance.scaling.y = Vector3.Distance(s, m);

    const { x: ax, y: ay, z: az } = s;
    const { x: bx, y: by, z: bz } = m;
    const stickAxis = new Vector3(bx - ax, by - ay, bz - az).normalize();
    const cylinderUpAxis = new Vector3(0, 1, 0);

    const quaternion = new Quaternion();
    Quaternion.FromUnitVectorsToRef(
        cylinderUpAxis,
        stickAxis,
        quaternion
    );
    instance.rotationQuaternion = quaternion;

    instance.translate(
        new Vector3((bx + ax) / 2, (by + ay) / 2, (bz + az) / 2),
        1,
        Space.WORLD
    );

    return instance;
}


export {
    addRepresentation,
    renderRepresentation
}