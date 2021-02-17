const easing = (x: number) => x;

export function animate(
	from: number,
	to: number,
	duration: number,
	tickFunction: (val: number) => void
) {
	const start = Date.now();
	const tick = () => {
		const t = easing(Math.min((Date.now() - start) / duration, 1));
		tickFunction(from + (to - from) * t);
		if (t < 1) {
			requestAnimationFrame(tick);
		}
	};
	requestAnimationFrame(tick);
}
