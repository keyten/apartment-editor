import { lastItem } from '../../utils/array';

interface IPoint {
	x: number;
	y: number;
}

function arePointsEqual(a: IPoint, b: IPoint) {
	return a.x === b.x && a.y === b.y;
}

function getClosedPolygon(points: IPoint[]) {
	return arePointsEqual(points[0], lastItem(points))
		? points
		: [...points, points[0]];
}

export function getPolygonArea(points: IPoint[]) {
	if (points.length < 3) {
		return 0;
	}
	points = getClosedPolygon(points);

	let sum = 0;
	for (let i = 0; i < points.length - 1; i++) {
		sum += points[i].x * points[i + 1].y - points[i + 1].x * points[i].y;
	}
	return sum / 2;
}

export function getPolygonCentroid(points: IPoint[]) {
	if (points.length === 1) {
		return points[0];
	} else if (points.length === 2) {
		return {
			x: (points[0].x + points[1].x) / 2,
			y: (points[0].y + points[1].y) / 2
		};
	}

	const area = getPolygonArea(points);
	points = getClosedPolygon(points);

	let sumX = 0;
	let sumY = 0;
	for (let i = 0; i < points.length - 1; i++) {
		sumX +=
			(points[i].x + points[i + 1].x) *
			(points[i].x * points[i + 1].y - points[i + 1].x * points[i].y);
		sumY +=
			(points[i].y + points[i + 1].y) *
			(points[i].x * points[i + 1].y - points[i + 1].x * points[i].y);
	}
	return {
		x: sumX / (6 * area),
		y: sumY / (6 * area)
	};
}

/*     @computed
    get area() {
        const points = [...this.vertices];
        points.push(this.head);
        let sum: number = 0;
        for (let i = 0; i < points.length - 1; i++) {
            sum += points[i].getX() * points[i + 1].getY() - points[i + 1].getX() * points[i].getY()
        }
        return sum / 2
    }

    get isClockwise() {
        return this.area < 0;
    }

    @computed
    get centroid() {
        const points = [...this.vertices];
        points.push(this.head);
        let sumX: number = 0;
        let sumY: number = 0;
        for (let i = 0; i < points.length - 1; i++) {
            sumX += (points[i].getX() + points[i + 1].getX()) * (points[i].getX() * points[i + 1].getY() - points[i + 1].getX() * points[i].getY());
            sumY += (points[i].getY() + points[i + 1].getY()) * (points[i].getX() * points[i + 1].getY() - points[i + 1].getX() * points[i].getY())

        }
        sumX = sumX / (6 * this.area);
        sumY = sumY / (6 * this.area);
        return new Vector(sumX, sumY);
    }
 */
