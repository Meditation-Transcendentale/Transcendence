// utils/Easing.ts

export const Easing = {
	linear: (t: number) => t,
	easeInOutQuad: (t: number) =>
		t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
	easeInOutCubic: (t: number) =>
		t < 0.5
			? 4 * t * t * t
			: (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
	easeOutElastic: (t: number) => {
		const p = 0.3;
		return Math.pow(2, -10 * t) * Math.sin((t - p / 4) * (2 * Math.PI) / p) + 1;
	},
	// … add more as you like
};

