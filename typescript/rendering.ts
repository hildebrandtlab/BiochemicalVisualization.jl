import { AppContext } from "./SceneComponent";

import { Vector3, Mesh, StandardMaterial, HighlightLayer, Color3, MeshBuilder, Color4, Tags, InstancedMesh, Quaternion, Space } from "@babylonjs/core";


const addRepresentation = (ctx: AppContext, data: any) => {
    const mesh = renderRepresentation(ctx, data.representation);
    mesh.children.forEach((child: Mesh|InstancedMesh) => {
        ctx.scene.addMesh(child);
        child.freezeWorldMatrix();
    });
    ctx.meshes = ctx.meshes.concat(mesh.children);
    ctx.engine.hideLoadingUI();
}

const renderRepresentation = (ctx: AppContext, repr: any) => {
    const meshes = { children: [] as (Mesh|InstancedMesh)[] };
    const sphereMaterial = new StandardMaterial("sphereMaterial", ctx.scene);
    const cylinderMaterial = new StandardMaterial("cylinderMaterial", ctx.scene);
    ctx.representationMaterials.push(sphereMaterial, cylinderMaterial);

    const sphere_colors          = repr.colors["sphere_colors"]           ?? [];
    const sphere_colors_qutemol  = repr.colors["sphere_colors_qutemol"]   ?? sphere_colors;
    const spheres = repr.primitives["spheres"] ?? [];
    if (spheres.length > 0) {
        const root_sphere = MeshBuilder.CreateSphere(
            "rootSphere",
            { diameter: 1.0, segments: 32 },
            ctx.scene
        );

        root_sphere.material = sphereMaterial;
        root_sphere.registerInstancedBuffer("color", 4);
        root_sphere.isVisible = false;
        meshes.children.push(root_sphere);

        const highlight = new HighlightLayer("highlight", ctx.scene);
        ctx.representationLayers.push(highlight);
        ctx.highlightMesh = root_sphere.clone("highlightMesh");
        if (ctx.highlightMesh) {
            highlight.addMesh(ctx.highlightMesh, Color3.Blue());
            ctx.highlightMesh.setEnabled(false);
            meshes.children.push(ctx.highlightMesh);
        }

        for (let i = 0; i < spheres.length; i++) {
            const sphere = spheres[i];
            const sphere_color = sphere_colors[i];
            const sphere_meta_data = repr.meta_data[i];

            const instance = root_sphere.createInstance("childSphere");
            instance.instancedBuffers.color = Color4.FromHexString(sphere_color);
            instance.billboardMode = 7;
            instance.metadata = {
                meta: sphere_meta_data,
                defaultColor: sphere_color,
                qutemolColor: sphere_colors_qutemol[i],
            };
            instance.position.copyFromFloats(sphere.center[0], sphere.center[1], sphere.center[2]);
            instance.scaling = instance.scaling.scale(sphere.r * 2.0);
            Tags.AddTagsTo(instance, sphere_meta_data[1]);
            instance.isVisible = sphere_meta_data[1] === "H" ? ctx.hAtomsVisible : true;

            meshes.children.push(instance);
        }
    }

    const cylinder_colors         = repr.colors["cylinder_colors"]         ?? [];
    const cylinder_colors_qutemol = repr.colors["cylinder_colors_qutemol"] ?? cylinder_colors;
    const cylinder_h_flags        = repr.flags?.["cylinder_h_flags"]       ?? [];
    const cylinders = repr.primitives["cylinders"] ?? [];
    if (cylinders.length > 0) {
        const root_cylinder = MeshBuilder.CreateCylinder(
            "rootCylinder",
            { diameter: 1.0, tessellation: 24, height: 1.0 },
            ctx.scene
        );
        root_cylinder.material = cylinderMaterial;
        root_cylinder.registerInstancedBuffer("color", 4);
        root_cylinder.isVisible = false;
        meshes.children.push(root_cylinder);

        for (let i = 0; i < cylinders.length; i++) {
            const isHBond = cylinder_h_flags[i] === true;
            const instance = createCylinderInstance(
                cylinder_colors[i], cylinder_colors_qutemol[i],
                cylinders[i], root_cylinder, isHBond
            );
            instance.isVisible = isHBond ? ctx.hAtomsVisible : true;
            meshes.children.push(instance);
        }
    }

    return meshes;
}

const createCylinderInstance = (
    defaultColor: string,
    qutemolColor: string,
    cylinder_data: { origin: number[]; extremity: number[]; r: number; },
    root_instance: Mesh,
    isHBond: boolean,
) => {
    const s = new Vector3(
        cylinder_data.origin[0],
        cylinder_data.origin[1],
        cylinder_data.origin[2]
    );
    const m = new Vector3(
        cylinder_data.extremity[0],
        cylinder_data.extremity[1],
        cylinder_data.extremity[2]
    );

    const instance: InstancedMesh = root_instance.createInstance("childCylinder");
    instance.isPickable = false;
    instance.instancedBuffers.color = Color4.FromHexString(defaultColor);
    instance.metadata = { defaultColor, qutemolColor, isHBond };
    const length = Vector3.Distance(s, m);
    instance.scaling.set(cylinder_data.r * 2.0, length, cylinder_data.r * 2.0);

    const stickAxis = m.subtract(s).normalize();
    const cylinderUpAxis = new Vector3(0, 1, 0);

    const quaternion = new Quaternion();
    Quaternion.FromUnitVectorsToRef(cylinderUpAxis, stickAxis, quaternion);
    instance.rotationQuaternion = quaternion;

    instance.translate(
        new Vector3((s.x + m.x) / 2, (s.y + m.y) / 2, (s.z + m.z) / 2),
        1,
        Space.WORLD
    );

    return instance;
}


export {
    addRepresentation,
    renderRepresentation
}
