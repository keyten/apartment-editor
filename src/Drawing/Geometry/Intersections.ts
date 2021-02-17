import { Point } from './Point';

interface Coordinates {
	x: number;
	y: number;
}

export function intersectLines(
	a0: Coordinates,
	a1: Coordinates,
	b0: Coordinates,
	b1: Coordinates
) {
	var d = (a1.x - a0.x) * (b0.y - b1.y) - (a1.y - a0.y) * (b0.x - b1.x);
	if (d === 0) {
		return null;
	}

	var t = (b0.x - a0.x) * (b0.y - b1.y) - (b0.y - a0.y) * (b0.x - b1.x);
	var w = (a1.x - a0.x) * (b0.y - a0.y) - (b0.x - a0.x) * (a1.y - a0.y);

	t /= d;
	w /= d;

	return {
		point: new Point(a0.x + (a1.x - a0.x) * t, a0.y + (a1.y - a0.y) * t),
		t,
		w
	};
}

export function isPointInPolygon(point: Coordinates, poly: Coordinates[]) {
	const { x, y } = point;
	let c = false;
	for (var i = 0, j = poly.length - 1; i < poly.length; j = i, i++) {
		if (
			poly[i].y > y !== poly[j].y > y &&
			x <
				((poly[j].x - poly[i].x) * (y - poly[i].y)) / (poly[j].y - poly[i].y) +
					poly[i].x
		) {
			c = !c;
		}
	}
	return c;
}
