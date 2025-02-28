import { Vector } from Vector;

class User {

	#socket;
	#pos = new Vector();

	constructor(socket) {
		this.#socket = socket;
	}
}
