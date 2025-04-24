/**
 * Create a 2D position component.
 * @param {number} x
 * @param {number} y
 * @returns {{x:number,y:number}}
 */
export function Position(x, y) {
	return { x, y };
}

/**
 * Create a 2D velocity component.
 * @param {number} x
 * @param {number} y
 * @returns {{x:number,y:number}}
 */
export function Velocity(x, y) {
	return { x, y };
}

/**
 * Create an axis‐aligned box collider.
 * @param {number} width
 * @param {number} height
 * @param {number} [rotation=0]  In radians
 * @param {number} [offsetX=0]
 * @param {number} [offsetY=0]
 * @returns {{
 *   type: 'box',
 *   width: number,
 *   height: number,
 *   rotation: number,
 *   offsetX: number,
 *   offsetY: number,
 *   cos: number,
 *   sin: number,
 *   aabb: {x:number,y:number,width:number,height:number}
 * }}
 */
export function BoxCollider(width, height, rotation = 0, offsetX = 0, offsetY = 0) {
	return {
		type: 'box',
		width,
		height,
		rotation,
		offsetX,
		offsetY,
		cos: Math.cos(-rotation),
		sin: Math.sin(-rotation),
		aabb: { x: 0, y: 0, width: 0, height: 0 }
	};
}

/**
 * Create a circular collider.
 * @param {number} radius
 * @returns {{type:'circle',radius:number,aabb:{x:number,y:number,width:number,height:number}}}
 */
export function CircleCollider(radius) {
	return {
		type: 'circle',
		radius,
		aabb: { x: 0, y: 0, width: 0, height: 0 }
	};
}
