import { AppContext } from "./SceneComponent";

import { Vector3, Mesh, StandardMaterial, HighlightLayer, Color3, MeshBuilder, Color4, Tags, InstancedMesh, Quaternion, Space, VertexData } from "@babylonjs/core";


// Build and attach meshes for every representation in `reps`. Each
// mesh is tagged with its rep index in `.metadata.repIdx` so later
// per-rep visibility / removal can walk ctx.meshes by that key.
const renderScene = (ctx: AppContext, reps: any[]) => {
    reps.forEach((dr: any, i: number) => {
        const children = buildRepresentationMeshes(ctx, dr.repr, i);
        const visible  = dr.visible !== false;
        children.forEach((child: Mesh | InstancedMesh) => {
            ctx.scene.addMesh(child);
            // Hidden reps: hide visible meshes but leave the
            // instance-source roots isVisible=false as built.
            if (!visible && child.isVisible) child.isVisible = false;
            child.freezeWorldMatrix();
        });
        ctx.meshes = ctx.meshes.concat(children);
    });
    ctx.engine.hideLoadingUI();
};

// Build meshes for a single Representation. `repIdx` is stored in
// each mesh's metadata so a multi-rep scene can later toggle / delete
// per rep. Highlight layer is allocated on the FIRST sphere-bearing
// rep only — subsequent reps reuse `ctx.highlightMesh`, since picking
// uses one shared highlight cursor regardless of which rep was hit.
const buildRepresentationMeshes = (ctx: AppContext, repr: any, repIdx: number) => {
    const children: (Mesh|InstancedMesh)[] = [];
    const tagRep = (m: Mesh | InstancedMesh) => {
        m.metadata = { ...(m.metadata ?? {}), repIdx };
        return m;
    };

    const sphereMaterial = new StandardMaterial(`sphereMaterial_${repIdx}`, ctx.scene);
    const cylinderMaterial = new StandardMaterial(`cylinderMaterial_${repIdx}`, ctx.scene);
    ctx.representationMaterials.push(sphereMaterial, cylinderMaterial);

    const sphere_colors          = repr.colors["sphere_colors"]           ?? [];
    const sphere_colors_qutemol  = repr.colors["sphere_colors_qutemol"]   ?? sphere_colors;
    const spheres = repr.primitives["spheres"] ?? [];
    if (spheres.length > 0) {
        const root_sphere = MeshBuilder.CreateSphere(
            `rootSphere_${repIdx}`,
            { diameter: 1.0, segments: 32 },
            ctx.scene
        );

        root_sphere.material = sphereMaterial;
        root_sphere.registerInstancedBuffer("color", 4);
        root_sphere.isVisible = false;
        children.push(tagRep(root_sphere));

        // First rep with spheres owns the highlight layer; later reps
        // share it via ctx.highlightMesh.
        if (!ctx.highlightMesh) {
            const highlight = new HighlightLayer("highlight", ctx.scene);
            ctx.representationLayers.push(highlight);
            ctx.highlightMesh = root_sphere.clone("highlightMesh");
            if (ctx.highlightMesh) {
                highlight.addMesh(ctx.highlightMesh, Color3.Blue());
                ctx.highlightMesh.setEnabled(false);
                children.push(tagRep(ctx.highlightMesh));
            }
        }

        for (let i = 0; i < spheres.length; i++) {
            const sphere = spheres[i];
            const sphere_color = sphere_colors[i];
            const sphere_meta_data = repr.meta_data[i];

            const instance = root_sphere.createInstance("childSphere");
            instance.instancedBuffers.color = Color4.FromHexString(sphere_color);
            instance.billboardMode = 7;
            instance.metadata = {
                repIdx,
                meta: sphere_meta_data,
                defaultColor: sphere_color,
                qutemolColor: sphere_colors_qutemol[i],
            };
            instance.position.copyFromFloats(sphere.center[0], sphere.center[1], sphere.center[2]);
            instance.scaling = instance.scaling.scale(sphere.r * 2.0);
            Tags.AddTagsTo(instance, sphere_meta_data[1]);
            instance.isVisible = sphere_meta_data[1] === "H" ? ctx.hAtomsVisible : true;

            children.push(instance);
        }
    }

    const cylinder_colors         = repr.colors["cylinder_colors"]         ?? [];
    const cylinder_colors_qutemol = repr.colors["cylinder_colors_qutemol"] ?? cylinder_colors;
    const cylinder_h_flags        = repr.flags?.["cylinder_h_flags"]       ?? [];
    const cylinders = repr.primitives["cylinders"] ?? [];
    if (cylinders.length > 0) {
        const root_cylinder = MeshBuilder.CreateCylinder(
            `rootCylinder_${repIdx}`,
            { diameter: 1.0, tessellation: 24, height: 1.0 },
            ctx.scene
        );
        root_cylinder.material = cylinderMaterial;
        root_cylinder.registerInstancedBuffer("color", 4);
        root_cylinder.isVisible = false;
        children.push(tagRep(root_cylinder));

        for (let i = 0; i < cylinders.length; i++) {
            const isHBond = cylinder_h_flags[i] === true;
            const instance = createCylinderInstance(
                cylinder_colors[i], cylinder_colors_qutemol[i],
                cylinders[i], root_cylinder, isHBond
            );
            instance.metadata = { ...(instance.metadata ?? {}), repIdx };
            instance.isVisible = isHBond ? ctx.hAtomsVisible : true;
            children.push(instance);
        }
    }

    // Surface (SAS / SES) representation — single triangulated mesh
    // with per-vertex colors. Julia ships positions/normals as flat
    // float arrays, indices as flat int32, and one hex color per vertex.
    if (repr.mesh) {
        const surfaceMesh = buildSurfaceMesh(ctx, repr.mesh, repIdx);
        if (surfaceMesh) children.push(surfaceMesh);
    }

    return children;
};

const buildSurfaceMesh = (
    ctx: AppContext,
    md: { positions: number[]; normals: number[]; indices: number[]; vertex_colors: string[] },
    repIdx: number,
): Mesh | null => {
    if (!md.positions || md.positions.length === 0) return null;

    const surfaceMaterial = new StandardMaterial(`surfaceMaterial_${repIdx}`, ctx.scene);
    surfaceMaterial.backFaceCulling = false;  // SAS/SES are open in tight pockets
    ctx.representationMaterials.push(surfaceMaterial);

    const mesh = new Mesh(`surfaceMesh_${repIdx}`, ctx.scene);
    mesh.isPickable = false;
    mesh.material = surfaceMaterial;
    mesh.metadata = { repIdx };

    const vd = new VertexData();
    vd.positions = new Float32Array(md.positions);
    vd.normals   = new Float32Array(md.normals);
    vd.indices   = new Uint32Array(md.indices);

    const n = md.vertex_colors.length;
    const rgba = new Float32Array(n * 4);
    for (let i = 0; i < n; i++) {
        const c = Color4.FromHexString(md.vertex_colors[i]);
        rgba[i * 4]     = c.r;
        rgba[i * 4 + 1] = c.g;
        rgba[i * 4 + 2] = c.b;
        rgba[i * 4 + 3] = 1.0;
    }
    vd.colors = rgba;

    vd.applyToMesh(mesh);
    mesh.useVertexColors = true;

    return mesh;
};

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
    renderScene,
}
