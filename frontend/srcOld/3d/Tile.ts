import { AbstractMesh, Vector3, Mesh, BoundingBox, CustomMaterial, Plane } from "@babylonImport";

export class Tile {
	public _mesh!: Mesh;
	private _boundingBox: BoundingBox;

	private static __id = 0;


	constructor(mesh: Mesh, material: CustomMaterial, position: Vector3, width: number, depth: number) {
		this._mesh = mesh.clone(mesh.name + Tile.__id, null, false, false);
		this._mesh.setEnabled(true);
		this._mesh.layerMask = 0x01000000;

		this._mesh.position.copyFrom(position);
		this._mesh.material = material;


		this._mesh.freezeWorldMatrix();
		this._mesh.doNotSyncBoundingInfo = false;
		this._mesh.buildBoundingInfo(
			new Vector3(-width * 0.5, 1., -depth * 0.5),
			new Vector3(width * 0.5, 1., depth * 0.5),
			this._mesh.getWorldMatrix()
		);


		this._boundingBox = this._mesh.getBoundingInfo().boundingBox;

		this._mesh._thinInstanceDataStorage = mesh._thinInstanceDataStorage;
		this._mesh.thinInstanceAllowAutomaticStaticBufferRecreation = false;
		this._mesh.isPickable = false;
		this._mesh.occlusionType = AbstractMesh.OCCLUSION_TYPE_NONE;
		this._mesh.alwaysSelectAsActiveMesh = true;


		Tile.__id++;
	}

	public isInFrustrum(frustrumPlane: Array<Plane>): boolean {
		const enable = this._boundingBox.isInFrustum(frustrumPlane);
		this._mesh.setEnabled(enable);
		return enable;

	}

	public dispose() {
		this._mesh.dispose();
		this._boundingBox.dispose();
	}

}
