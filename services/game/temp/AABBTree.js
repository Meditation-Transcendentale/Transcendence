// AABBTree.js
class AABBNode {
	constructor(entity, aabb) {
		this.entity = entity;
		this.aabb = { x: aabb.x, y: aabb.y, width: aabb.width, height: aabb.height };
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	isLeaf() {
		return this.left === null && this.right === null;
	}
}

class AABBTree {
	constructor() {
		this.root = null;
		this.entityToNode = new Map();
	}

	insert(entity, aabb) {
		const leaf = new AABBNode(entity, aabb);
		this.entityToNode.set(entity, leaf);
		this.insertLeaf(leaf);
	}
	insertLeaf(leaf) {
		if (this.root === null) {
			this.root = leaf;
			return;
		}

		const leafAABB = leaf.aabb;
		let node = this.root;

		while (!node.isLeaf()) {
			const left = node.left;
			const right = node.right;

			const l = left.aabb;
			const leftArea = l.width * l.height;
			const combinedLeftX = Math.min(l.x, leafAABB.x);
			const combinedLeftY = Math.min(l.y, leafAABB.y);
			const combinedLeftMaxX = Math.max(l.x + l.width, leafAABB.x + leafAABB.width);
			const combinedLeftMaxY = Math.max(l.y + l.height, leafAABB.y + leafAABB.height);
			const combinedLeftArea = (combinedLeftMaxX - combinedLeftX) * (combinedLeftMaxY - combinedLeftY);
			const costLeft = combinedLeftArea - leftArea;

			const r = right.aabb;
			const rightArea = r.width * r.height;
			const combinedRightX = Math.min(r.x, leafAABB.x);
			const combinedRightY = Math.min(r.y, leafAABB.y);
			const combinedRightMaxX = Math.max(r.x + r.width, leafAABB.x + leafAABB.width);
			const combinedRightMaxY = Math.max(r.y + r.height, leafAABB.y + leafAABB.height);
			const combinedRightArea = (combinedRightMaxX - combinedRightX) * (combinedRightMaxY - combinedRightY);
			const costRight = combinedRightArea - rightArea;

			node = costLeft < costRight ? left : right;
		}

		const oldParent = node.parent;
		const n = node.aabb;
		const newParentX = Math.min(n.x, leafAABB.x);
		const newParentY = Math.min(n.y, leafAABB.y);
		const newParentMaxX = Math.max(n.x + n.width, leafAABB.x + leafAABB.width);
		const newParentMaxY = Math.max(n.y + n.height, leafAABB.y + leafAABB.height);
		const newParentAABB = {
			x: newParentX,
			y: newParentY,
			width: newParentMaxX - newParentX,
			height: newParentMaxY - newParentY
		};
		const newParent = new AABBNode(null, newParentAABB);
		newParent.parent = oldParent;
		newParent.left = node;
		newParent.right = leaf;
		node.parent = newParent;
		leaf.parent = newParent;

		if (oldParent === null) {
			this.root = newParent;
		} else {
			if (oldParent.left === node) {
				oldParent.left = newParent;
			} else {
				oldParent.right = newParent;
			}
			this.fixUpwardTree(oldParent);
		}
	}

	// insertLeaf(leaf) {
	// 	if (this.root === null) {
	// 		this.root = leaf;
	// 		return;
	// 	}
	//
	// 	let node = this.root;
	// 	while (!node.isLeaf()) {
	// 		const left = node.left;
	// 		const right = node.right;
	//
	// 		const combinedLeft = this.combineAABB(left.aabb, leaf.aabb);
	// 		const combinedRight = this.combineAABB(right.aabb, leaf.aabb);
	//
	// 		const costLeft = this.aabbArea(combinedLeft) - this.aabbArea(left.aabb);
	// 		const costRight = this.aabbArea(combinedRight) - this.aabbArea(right.aabb);
	//
	// 		node = costLeft < costRight ? left : right;
	// 	}
	//
	// 	const oldParent = node.parent;
	// 	const newParent = new AABBNode(null, this.combineAABB(node.aabb, leaf.aabb));
	// 	newParent.parent = oldParent;
	// 	newParent.left = node;
	// 	newParent.right = leaf;
	// 	node.parent = newParent;
	// 	leaf.parent = newParent;
	//
	// 	if (oldParent === null) {
	// 		this.root = newParent;
	// 	} else {
	// 		if (oldParent.left === node) {
	// 			oldParent.left = newParent;
	// 		} else {
	// 			oldParent.right = newParent;
	// 		}
	// 		this.fixUpwardTree(oldParent);
	// 	}
	// }

	fixUpwardTree(node) {
		while (node !== null) {
			node.aabb = this.combineAABB(node.left.aabb, node.right.aabb);
			node = node.parent;
		}
	}

	combineAABB(aabb1, aabb2) {
		const x = Math.min(aabb1.x, aabb2.x);
		const y = Math.min(aabb1.y, aabb2.y);
		const maxX = Math.max(aabb1.x + aabb1.width, aabb2.x + aabb2.width);
		const maxY = Math.max(aabb1.y + aabb1.height, aabb2.y + aabb2.height);
		return {
			x,
			y,
			width: maxX - x,
			height: maxY - y
		};
	}

	aabbArea(aabb) {
		return aabb.width * aabb.height;
	}

	query(queryAABB) {
		const results = [];
		if (this.root === null) return results;

		const stack = [this.root];
		const bX = queryAABB.x;
		const bY = queryAABB.y;
		const bMaxX = queryAABB.x + queryAABB.width;
		const bMaxY = queryAABB.y + queryAABB.height;

		while (stack.length > 0) {
			const node = stack.pop();
			const a = node.aabb;
			const aX = a.x;
			const aY = a.y;
			const aMaxX = a.x + a.width;
			const aMaxY = a.y + a.height;

			if (aX < bMaxX && aMaxX > bX && aY < bMaxY && aMaxY > bY) {
				if (node.isLeaf()) {
					results.push(node.entity);
				} else {
					if (node.left) stack.push(node.left);
					if (node.right) stack.push(node.right);
				}
			}
		}

		return results;
	}

	remove(entity) {
		const leaf = this.entityToNode.get(entity);
		if (!leaf) return;
		this.removeLeaf(leaf);
		this.entityToNode.delete(entity);
	}

	removeLeaf(leaf) {
		if (leaf === this.root) {
			this.root = null;
			return;
		}
		const parent = leaf.parent;
		const sibling = parent.left === leaf ? parent.right : parent.left;
		if (parent.parent) {
			sibling.parent = parent.parent;
			if (parent.parent.left === parent) {
				parent.parent.left = sibling;
			} else {
				parent.parent.right = sibling;
			}
			this.fixUpwardTree(parent.parent);
		} else {
			this.root = sibling;
			sibling.parent = null;
		}
	}

	updateEntity(entity, newAABB) {
		const node = this.entityToNode.get(entity);
		if (!node) return;
		if (this.contains(node.aabb, newAABB)) {
			return;
		}
		this.remove(entity);
		this.insert(entity, newAABB);
	}

	contains(outer, inner) {
		return (inner.x >= outer.x &&
			inner.y >= outer.y &&
			inner.x + inner.width <= outer.x + outer.width &&
			inner.y + inner.height <= outer.y + outer.height);
	}

	clear() {
		this.root = null;
		this.entityToNode.clear();
	}
}

export default AABBTree;

