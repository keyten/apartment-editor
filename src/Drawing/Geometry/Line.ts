import { Point } from './Point';
import { intersectLines } from './Intersections';
import { LineSegment } from './LineSegment';
import { Ray } from './Ray';

export class Line {
	start: Point;
	direction: Point;
	constructor(start: Point, direction: Point) {
		this.start = start;
		this.direction = direction;
	}

	round() {
		return new Line(this.start.round(), this.direction);
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

	intersect(line: Line | LineSegment | Ray) {
		if (line instanceof Line) {
			return this.intersectLine(line);
		} else if (line instanceof LineSegment) {
			return this.intersectLineSegment(line);
		} else {
			return this.intersectRay(line);
		}
	}

	intersectLine(line: Line) {
		const intersection = intersectLines(
			this.start,
			this.start.add(this.direction),
			line.start,
			line.start.add(line.direction)
		);
		return intersection && intersection.point;
	}

	intersectLineSegment(line: LineSegment) {
		return line.intersect(this);
	}

	intersectRay(line: Ray) {
		const intersection = intersectLines(
			this.start,
			this.start.add(this.direction),
			line.start,
			line.start.add(line.direction)
		);
		if (intersection) {
			const { w } = intersection;
			if (w < 0) {
				return null;
			}
		}
		return intersection && intersection.point;
	}

	pointAt(t: number) {
		return this.start.add(this.direction.normalize().mul(t));
	}
}
