import { Point } from './Point';

type MatrixValues = [number, number, number, number, number, number];
export class Matrix {
	values: MatrixValues;

	constructor(values: MatrixValues) {
		this.values = values;
	}

	get a() {
		return this.values[0];
	}
	get b() {
		return this.values[1];
	}
	get c() {
		return this.values[2];
	}
	get d() {
		return this.values[3];
	}
	get e() {
		return this.values[4];
	}
	get f() {
		return this.values[5];
	}

	add(matrix: Matrix) {
		return new Matrix([
			this.a + matrix.a,
			this.b + matrix.b,
			this.c + matrix.c,
			this.d + matrix.d,
			this.e + matrix.e,
			this.f + matrix.f
		]);
	}

	mul(value: number | Matrix): Matrix;
	mul(value: Point): Point;
	mul(value: number | Matrix | Point) {
		if (typeof value === 'number') {
			return this.mulNumber(value);
		} else if (value instanceof Matrix) {
			return this.mulMatrix(value);
		} else {
			return this.mulPoint(value);
		}
	}

	mulNumber(value: number) {
		return new Matrix([
			this.a * value,
			this.b * value,
			this.c * value,
			this.d * value,
			this.e * value,
			this.f * value
		]);
	}

	mulMatrix(matrix: Matrix) {
		// [this.a this.c this.e]   [matrix.a matrix.c matrix.e]   [this.a * matrix.a + this.c * matrix.b, this.a * matrix.c + this.c * matrix.d, this.a * matrix.e + this.c * matrix.f + this.e]
		// [this.b this.d this.f] * [matrix.b matrix.d matrix.f] = [this.b * matrix.a + this.d * matrix.b, this.b * matrix.c + this.d * matrix.d, this.b * matrix.e + this.d * matrix.f + this.f]
		// [   0      0     1   ]   [    0        0       1    ]   [0 0 1]

		return new Matrix([
			this.a * matrix.a + this.c * matrix.b,
			this.b * matrix.a + this.d * matrix.b,
			this.a * matrix.c + this.c * matrix.d,
			this.b * matrix.c + this.d * matrix.d,
			this.a * matrix.e + this.c * matrix.f + this.e,
			this.b * matrix.e + this.d * matrix.f + this.f
		]);
	}

	mulPoint(point: Point) {
		// [a c e]   [x]   [ax + cy + e]
		// [b d f] * [y] = [bx + dy + f]
		// [0 0 1]   [1]   [1]
		return new Point(
			this.a * point.x + this.c * point.y + this.e,
			this.b * point.x + this.d * point.y + this.f
		);
	}

	div(value: number | Matrix) {
		if (value instanceof Matrix) {
			value = value.inv();
		} else {
			value = 1 / value;
		}
		return this.mul(value);
	}

	det() {
		//     [a c e]
		// det [b d f] = a * det [d f] - b * [c e] = ad - bc
		//     [0 0 1]           [0 1]       [0 1]
		return this.a * this.d - this.b * this.c;
	}

	inv() {
		// [a c e]    [d -c cf - ed]
		// [b d f] -> [-b a eb - af] / det
		// [0 0 1]    [0 0 det]
		const det = this.det();
		return new Matrix([
			this.d / det,
			-this.b / det,
			-this.c / det,
			this.a / det,
			(this.c * this.f - this.e * this.d) / det,
			(this.e * this.b - this.a * this.f) / det
		]);
	}

	// https://stackoverflow.com/questions/57823592/decompose-3x3-matrix
	decompose() {
		let sx = new Point(this.values[0], this.values[1]).length();
		let sy = new Point(this.values[2], this.values[3]).length();
		const det = this.det();
		if (det < 0) {
			sx = -sx;
		}
		const position = new Point(this.values[4], this.values[5]);
		// работает не совсем правильно
		const rotation = Math.acos(this.values[0] / sx);
		const scale = new Point(sx, sy);
		return {
			position,
			rotation,
			scale
		};
	}
	/*
	decompose() {    //TODO Надо проверить  https://stackoverflow.com/questions/57823592/decompose-3x3-matrix
		var te = this.elements;
		var sx = new Vector().set(te[0], te[1]).length();
		var sy = new Vector().set(te[3], te[4]).length();
		// if determine is negative, we need to invert one scale
		var det = this.determinant();
		if (det < 0) sx = - sx;
		const position = new Vector().set(te[6], te[7]);
		const rotation = Math.acos(te[0]/sx)
		const scale = new Vector().set(sx,sy);
		return {position,rotation,scale};
	  }
	*/

	static eye() {
		return new Matrix([1, 0, 0, 1, 0, 0]);
	}

	static translate(x: number, y: number) {
		return new Matrix([1, 0, 0, 1, x, y]);
	}

	static scale(x: number, y: number, point?: { x: number; y: number }) {
		const mt = new Matrix([x, 0, 0, y, 0, 0]);
		if (point) {
			return Matrix.translate(point.x, point.y)
				.mul(mt)
				.mul(Matrix.translate(-point.x, -point.y));
		}
		return mt;
	}

	static rotate(angle: number, point?: { x: number; y: number }) {
		const mt = new Matrix([
			Math.cos(angle),
			Math.sin(angle),
			-Math.sin(angle),
			Math.cos(angle),
			0,
			0
		]);
		if (point) {
			return Matrix.translate(point.x, point.y)
				.mul(mt)
				.mul(Matrix.translate(-point.x, -point.y));
		}
		return mt;
	}
}
