import { Point } from './Point';
import { Line } from './Line';
import { intersectLines } from './Intersections';
import { Ray } from './Ray';

export class LineSegment {
	start: Point;
	end: Point;
	constructor(start: Point, end: Point) {
		this.start = start;
		this.end = end;
	}

	round() {
		return new LineSegment(this.start.round(), this.end.round());
	}

	length() {
		return this.end.sub(this.start).length();
	}

	reverse() {
		return new LineSegment(this.end, this.start);
	}

	getDirection() {
		return this.end.sub(this.start);
	}

	getNormal() {
		const v = this.getDirection().normalize();
		return v.normal();
	}

	getMiddle() {
		return this.start.add(this.end).mul(1 / 2);
	}

	isPointIn(point: Point): boolean {
		const start = this.start;
		const direction = this.getDirection();
		const vector: Point = point.sub(start);

		if (vector.isCollinear(direction)) {
			return (
				Math.min(this.start.x, this.end.x) <= point.x &&
				point.x <= Math.max(this.start.x, this.end.x) &&
				Math.min(this.start.y, this.end.y) <= point.y &&
				point.y <= Math.max(this.start.y, this.end.y)
			);
		}
		return false;
	}

	isVertical(accuracy: number = 0.000001) {
		return Math.abs(this.getDirection().x) <= accuracy;
	}

	getLine() {
		return new Line(this.start, this.getDirection());
	}

	equals(line: LineSegment) {
		return this.start.equals(line.start) && this.end.equals(line.end);
	}

	intersect(line: LineSegment | Line | Ray) {
		if (line instanceof Line) {
			return this.intersectLine(line);
		} else if (line instanceof LineSegment) {
			return this.intersectLineSegment(line);
		} else {
			return this.intersectRay(line);
		}
	}

	intersectLineSegment(line: LineSegment) {
		const intersection = intersectLines(
			this.start,
			this.end,
			line.start,
			line.end
		);
		if (intersection) {
			const { t, w } = intersection;
			if (t < 0 || t > 1 || w < 0 || w > 1) {
				return null;
			}
		}
		return intersection && intersection.point;
	}

	intersectLine(line: Line) {
		const intersection = intersectLines(
			this.start,
			this.end,
			line.start,
			line.start.add(line.direction)
		);
		if (intersection) {
			const { t } = intersection;
			if (t < 0 || t > 1) {
				return null;
			}
		}
		return intersection && intersection.point;
	}

	intersectRay(line: Ray) {
		const intersection = intersectLines(
			this.start,
			this.end,
			line.start,
			line.start.add(line.direction)
		);
		if (intersection) {
			const { t, w } = intersection;
			if (t < 0 || t > 1 || w < 0) {
				return null;
			}
		}
		return intersection && intersection.point;
	}

	pointAt(t: number) {
		return this.start.add(this.end.sub(this.start).mul(t));
	}
}
