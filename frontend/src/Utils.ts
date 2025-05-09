const Utils = {
	random: [1.3, 0.2, 0.8, 0.3, 1.2, 2.6, 0.9, 1.5],
	index: 0,
	getRandom: () => {
		//Utils.index = (Utils.index + 1) % Utils.random.length;
		//return Utils.random[Utils.index];
		return Utils.random[Math.floor((Math.random() * 7.9))];
	}
}

export { Utils };
