import { AbstractMesh, Vector3, Material, Mesh, BoundingBox, StandardMaterial, Color3, CustomMaterial } from "@babylonImport";

export class Tile {
	public _mesh!: Mesh;
	private _boundingBox: BoundingBox;

	private static __id = 0;


	constructor(mesh: Mesh, material: CustomMaterial, position: Vector3, width: number, depth: number) {
		this._mesh = mesh.clone(mesh.name + Tile.__id, null, false, false);
		this._mesh.setEnabled(true);

		this._mesh.position.copyFrom(position);
		this._mesh.material = material;
		// this._mesh.makeGeometryUnique();

		// this._mesh.rotation.y = Math.PI;

		// const m = new StandardMaterial("gr", mesh._scene);
		// m.backFaceCulling = false;
		// m.emissiveColor = Color3.Red();
		// this._mesh.material = m;


		this._mesh.freezeWorldMatrix();
		this._mesh.doNotSyncBoundingInfo = false;
		this._mesh.buildBoundingInfo(
			new Vector3(-width * 0.5, 1., -depth * 0.5),
			new Vector3(width * 0.5, 1., depth * 0.5),
			this._mesh.getWorldMatrix()
		);

		//this._mesh.markVerticesDataAsUpdatable(VertexBuffer.PositionKind, false);

		// this._boundingBox = this._mesh.getBoundingInfo().boundingBox;

		this._mesh._thinInstanceDataStorage = mesh._thinInstanceDataStorage;
		this._mesh.thinInstanceAllowAutomaticStaticBufferRecreation = false;
		this._mesh.isPickable = false;
		this._mesh.occlusionType = AbstractMesh.OCCLUSION_TYPE_NONE;
		this._mesh.alwaysSelectAsActiveMesh = true;


		Tile.__id++;
	}


	public dispose() {
		this._mesh.dispose();
		this._boundingBox.dispose();
	}

}
