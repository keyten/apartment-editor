import { Line } from './Line';
import { LineSegment } from './LineSegment';

export class Point {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	add(point: Point) {
		return new Point(this.x + point.x, this.y + point.y);
	}

	sub(point: Point) {
		return new Point(this.x - point.x, this.y - point.y);
	}

	mul(scalar: number) {
		return new Point(this.x * scalar, this.y * scalar);
	}

	div(scalar: number) {
		return this.mul(1 / scalar);
	}

	round() {
		return new Point(Math.round(this.x), Math.round(this.y));
	}

	negate() {
		return this.mul(-1);
	}

	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	dot(v: Point): number {
		return this.x * v.x + this.y * v.y;
	}

	cross(v: Point): number {
		const x = this.x;
		const y = this.y;
		return x * v.y - y * v.x;
	}

	angle(): number {
		const angle = Math.atan2(this.y, this.x) * -1;
		return angle; //angle < 0 ? angle + Math.PI * 2 : angle;
	}

	angleWith(v: Point) {
		return Math.acos(this.dot(v) / (this.length() * v.length()));
	}

	normalize() {
		return this.mul(1 / this.length());
	}

	normal() {
		return new Point(this.y, -this.x);
	}

	isCollinear(b: Point): boolean {
		if (Math.abs(this.cross(b)) <= 0.001) {
			return true;
		} else {
			return false;
		}
	}

	projectOnVector(vector: Point): Point {
		const normalDir = vector.normalize();
		const projectionLength = this.dot(normalDir);
		return normalDir.mul(projectionLength);
	}

	projectOnLine(line: Line | LineSegment): Point {
		const vector = line.getDirection();
		return this.sub(line.start).projectOnVector(vector).add(line.start);
	}

	distanceToLine(line: Line): number {
		return line.start.sub(this).cross(line.getDirection().normalize());
	}
	/*
	getPolarAngle() {
		return Math.atan2(this.y, this.x);
	} */

	getPolarAngle() {
		if (this.y >= 0) {
			return Math.atan2(this.y, this.x);
		} else if (this.y < 0) {
			return Math.atan2(this.y, this.y) + 2 * Math.PI;
		} else if (this.x === 0 && this.y > 0) {
			return Math.PI / 2;
		} else if (this.x === 0 && this.y < 0) {
			return (3 * Math.PI) / 2;
		} else {
			return NaN;
		}
	}
	/*
	getPolarAngle() {
		if (this.x > 0 && this.y >= 0) {
			return Math.atan2(this.y, this.x);
		} else if (this.x > 0 && this.y < 0) {
			return Math.atan2(this.y, this.x) + 2 * Math.PI;
		} else if (this.x < 0) {
			return Math.atan2(this.y, this.x) + Math.PI;
		} else if (this.x === 0 && this.y > 0) {
			return Math.PI / 2;
		} else if (this.x === 0 && this.y < 0) {
			return (3 * Math.PI) / 2;
		} else {
			return NaN;
		}
	} */

	equals(point: Point) {
		return this.x === point.x && this.y === point.y;
	}

	clone() {
		return new Point(this.x, this.y);
	}

	static byAngle(angle: number) {
		return new Point(Math.cos(angle), Math.sin(angle));
	}

	static minX(...points: Point[]) {
		return minBy('x', points);
	}

	static minY(...points: Point[]) {
		return minBy('y', points);
	}

	static maxX(...points: Point[]) {
		return maxBy('x', points);
	}

	static maxY(...points: Point[]) {
		return maxBy('y', points);
	}
}

function minBy(param: 'x' | 'y', points: Point[]) {
	let min = Infinity;
	let minItem: Point | undefined;
	points.forEach(item => {
		if (item[param] < min) {
			min = item[param];
			minItem = item;
		}
	});
	return minItem;
}

function maxBy(param: 'x' | 'y', points: Point[]) {
	let max = -Infinity;
	let maxItem: Point | undefined;
	points.forEach(item => {
		if (item[param] > max) {
			max = item[param];
			maxItem = item;
		}
	});
	return maxItem;
}
