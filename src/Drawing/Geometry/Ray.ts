import { Point } from './Point';
import { intersectLines } from './Intersections';
import { LineSegment } from './LineSegment';
import { Line } from './Line';

export class Ray {
	start: Point;
	direction: Point;
	constructor(start: Point, direction: Point) {
		this.start = start;
		this.direction = direction;
	}

	round() {
		return new Ray(this.start.round(), this.direction);
	}

	getDirection() {
		return this.direction;
	}

	getNormal() {
		const v = this.direction.normalize();
		return v.normal();
	}

	getPolynomialCoefficients(): [number, number] {
		const k = this.direction.y / this.direction.x;
		const b = this.start.y - this.start.x * k;
		return [b, k];
	}

	isVertical(accuracy: number = 0.000001) {
		return Math.abs(this.getDirection().x) <= accuracy;
	}

	reverse() {
		return new Ray(this.start, this.direction.negate());
	}

	intersect(line: LineSegment | Line | Ray) {
		return line.intersectRay(this);
	}

	intersectRay(line: Ray) {
		const intersection = intersectLines(
			this.start,
			this.start.add(this.direction),
			line.start,
			line.start.add(line.direction)
		);
		if (intersection) {
			const { t, w } = intersection;
			if (t < 0 || w < 0) {
				return null;
			}
		}
		return intersection && intersection.point;
	}
}
