import { Matrix, Vector3 } from "@babylonImport";

export class CameraUtils {
	public static LookAt(eye: Vector3, target: Vector3, up: Vector3): Float32Array {
		let x, y, z;
		z = eye.subtract(target);
		z.normalize();
		x = up.cross(z);
		y = z.cross(x);
		x.normalize();
		y.normalize();

		const array = new Float32Array(16);
		array[0] = x.x;
		array[4] = x.y;
		array[8] = x.z;
		array[12] = -x.dot(eye);
		array[1] = y.x;
		array[5] = y.y;
		array[9] = y.z;
		array[13] = -y.dot(eye);
		array[2] = z.x;
		array[6] = z.y;
		array[10] = z.z;
		array[14] = -z.dot(eye);
		array[3] = 0;
		array[7] = 0;
		array[11] = 0;
		array[15] = 1.0;
		return array;
	}
}
