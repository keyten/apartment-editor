import { Project } from '../Project';
import { angleFrom0To2Pi } from '../../utils/geometry';

interface IPoint {
	x: number;
	y: number;
}

export class SnapService {
	project: Project;
	maxDistance = 4;
	maxAngle = (1 / 180) * Math.PI;

	constructor(project: Project) {
		this.project = project;
	}

	getAllPoints() {
		const project = this.project;
		const points: IPoint[] = [];
		[...project.apartments, ...project.rooms].forEach(polygon => {
			points.push(...polygon.points);
		});
		return points;
	}

	// если будет работать слишком медленно,
	// то тут нужно сделать квадратичное дерево
	// и кэшировать вызовы getAllPoints между движениями мышки
	getCoordinates({ x, y }: IPoint, ignoredPoint?: IPoint) {
		const allPoints = this.getAllPoints();
		let newX = x;
		let newY = y;
		let xDiff = Infinity;
		let yDiff = Infinity;
		for (let i = 0; i < allPoints.length; i++) {
			const currentPoint = allPoints[i];
			if (
				ignoredPoint &&
				ignoredPoint.x === currentPoint.x &&
				ignoredPoint.y === currentPoint.y
			) {
				continue;
			}

			const diffX = Math.abs(currentPoint.x - x);
			const diffY = Math.abs(currentPoint.y - y);

			if (diffX < this.maxDistance && xDiff > diffX) {
				newX = currentPoint.x;
				xDiff = diffX;
			}
			if (diffY < this.maxDistance && yDiff > diffY) {
				newY = currentPoint.y;
				yDiff = diffY;
			}
		}
		return {
			x: newX,
			y: newY
		};
	}

	getAngle(angle: number) {
		angle = angleFrom0To2Pi(angle);
		const snapAngles = [
			(0 / 180) * Math.PI,
			(45 / 180) * Math.PI,
			(90 / 180) * Math.PI,
			(135 / 180) * Math.PI,
			(180 / 180) * Math.PI,
			(225 / 180) * Math.PI,
			(270 / 180) * Math.PI,
			(315 / 180) * Math.PI
		];
		for (var i = 0; i < snapAngles.length; i++) {
			if (Math.abs(angle - snapAngles[i]) < this.maxAngle) {
				return snapAngles[i];
			}
		}
		return angle;
	}
}
