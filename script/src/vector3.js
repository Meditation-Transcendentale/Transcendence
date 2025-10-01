// scripts/vector3.js
class Vector3 {
	constructor(x = 0, y = 0, z = 0) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	clone() {
		return new Vector3(this.x, this.y, this.z);
	}

	set(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
		return this;
	}

	add(other) {
		return new Vector3(
			this.x + other.x,
			this.y + other.y,
			this.z + other.z
		);
	}

	subtract(other) {
		return new Vector3(
			this.x - other.x,
			this.y - other.y,
			this.z - other.z
		);
	}

	multiply(scalar) {
		return new Vector3(
			this.x * scalar,
			this.y * scalar,
			this.z * scalar
		);
	}

	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}

	normalize() {
		const len = this.length();
		if (len === 0) return new Vector3(0, 0, 0);
		return new Vector3(this.x / len, this.y / len, this.z / len);
	}

	static Dot(a, b) {
		return a.x * b.x + a.y * b.y + a.z * b.z;
	}

	static Zero() {
		return new Vector3(0, 0, 0);
	}

	static Right() {
		return new Vector3(1, 0, 0);
	}

	static Up() {
		return new Vector3(0, 1, 0);
	}

	static Forward() {
		return new Vector3(0, 0, 1);
	}
}

class Vector2 {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}

	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
}

class Quaternion {
	constructor(x = 0, y = 0, z = 0, w = 1) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
	}

	static RotationAxis(axis, angle) {
		const sin = Math.sin(angle / 2);
		const cos = Math.cos(angle / 2);
		return new Quaternion(
			axis.x * sin,
			axis.y * sin,
			axis.z * sin,
			cos
		);
	}

	multiply(other) {
		return new Quaternion(
			this.w * other.x + this.x * other.w + this.y * other.z - this.z * other.y,
			this.w * other.y + this.y * other.w + this.z * other.x - this.x * other.z,
			this.w * other.z + this.z * other.w + this.x * other.y - this.y * other.x,
			this.w * other.w - this.x * other.x - this.y * other.y - this.z * other.z
		);
	}

	conjugate() {
		return new Quaternion(-this.x, -this.y, -this.z, this.w);
	}
}

module.exports = { Vector3, Vector2, Quaternion };
