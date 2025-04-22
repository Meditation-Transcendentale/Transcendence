// AABBTree.js

/**
 * A node in the dynamic AABB tree.
 * @class
 */
class AABBNode {
	/**
  * @param {object} entity  Game entity
  * @param {{x:number,y:number,width:number,height:number}} aabb  Bounding box
  */
	constructor(entity, aabb) {
		this.entity = entity;
		this.aabb = { x: aabb.x, y: aabb.y, width: aabb.width, height: aabb.height };
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	/** @returns {boolean} True if this node has no children */
	isLeaf() {
		return this.left === null && this.right === null;
	}
}

/**
 * Dynamic AABB Tree for broad‑phase collision queries.
 * @class
 */
class AABBTree {
	constructor() {
		/** @type {?AABBNode} */
		this.root = null;
		/** @type {Map<object,AABBNode>} */
		this.entityToNode = new Map();
	}

	/**
  * Insert or update an entity’s AABB.
  * @param {object} entity
  * @param {{x:number,y:number,width:number,height:number}} aabb
  */
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
		const lx = leafAABB.x, ly = leafAABB.y;
		const lw = leafAABB.width, lh = leafAABB.height;
		const leafMaxX = lx + lw, leafMaxY = ly + lh;

		let node = this.root;

		while (!node.isLeaf()) {
			const left = node.left;
			const right = node.right;

			const lAABB = left.aabb;
			const l_x = lAABB.x, l_y = lAABB.y;
			const l_w = lAABB.width, l_h = lAABB.height;
			const leftArea = l_w * l_h;
			const combinedLeftX = (l_x < lx) ? l_x : lx;
			const combinedLeftY = (l_y < ly) ? l_y : ly;
			const combinedLeftMaxX = ((l_x + l_w) > leafMaxX) ? (l_x + l_w) : leafMaxX;
			const combinedLeftMaxY = ((l_y + l_h) > leafMaxY) ? (l_y + l_h) : leafMaxY;
			const combinedLeftArea = (combinedLeftMaxX - combinedLeftX) * (combinedLeftMaxY - combinedLeftY);
			const costLeft = combinedLeftArea - leftArea;

			const rAABB = right.aabb;
			const r_x = rAABB.x, r_y = rAABB.y;
			const r_w = rAABB.width, r_h = rAABB.height;
			const rightArea = r_w * r_h;
			const combinedRightX = (r_x < lx) ? r_x : lx;
			const combinedRightY = (r_y < ly) ? r_y : ly;
			const combinedRightMaxX = ((r_x + r_w) > leafMaxX) ? (r_x + r_w) : leafMaxX;
			const combinedRightMaxY = ((r_y + r_h) > leafMaxY) ? (r_y + r_h) : leafMaxY;
			const combinedRightArea = (combinedRightMaxX - combinedRightX) * (combinedRightMaxY - combinedRightY);
			const costRight = combinedRightArea - rightArea;

			node = (costLeft < costRight) ? left : right;
		}

		const oldParent = node.parent;
		const n = node.aabb;
		const newParentX = (n.x < lx) ? n.x : lx;
		const newParentY = (n.y < ly) ? n.y : ly;
		const newParentMaxX = ((n.x + n.width) > leafMaxX) ? (n.x + n.width) : leafMaxX;
		const newParentMaxY = ((n.y + n.height) > leafMaxY) ? (n.y + n.height) : leafMaxY;
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

	/**
   * Query for entities whose AABBs intersect the given box.
   * @param {{x:number,y:number,width:number,height:number}} queryAABB
   * @returns {object[]} Array of matched entities
   */
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

	/**
   * Update an entity’s AABB (reinsert if it no longer fits).
   * @param {object} entity
   * @param {{x:number,y:number,width:number,height:number}} newAABB
   */
	updateEntity(entity, newAABB) {
		const node = this.entityToNode.get(entity);
		if (!node) return;
		if (this.contains(node.aabb, newAABB)) {
			return;
		}
		this.remove(entity);
		this.insert(entity, newAABB);
	}

	/**
  * Check if `inner` is fully contained within `outer`.
  * @param {{x:number,y:number,width:number,height:number}} outer
  * @param {{x:number,y:number,width:number,height:number}} inner
  * @returns {boolean}
  */
	contains(outer, inner) {
		return (inner.x >= outer.x &&
			inner.y >= outer.y &&
			inner.x + inner.width <= outer.x + outer.width &&
			inner.y + inner.height <= outer.y + outer.height);
	}

	/** Remove all entities and reset the tree */
	clear() {
		this.root = null;
		this.entityToNode.clear();
	}
}

export default AABBTree;

