import { Polygon } from '../../Drawing/Polygon';
import { computed, observable, action } from 'mobx';
import { LineSegment } from '../../Drawing/Geometry/LineSegment';
import { Point } from '../../Drawing/Geometry/Point';
import { Line } from '../../Drawing/Geometry/Line';
import { OpeningControls } from './Controls/OpeningControls';
import { Apartment } from './Apartment';
import { lastItem } from '../../utils/array';

interface IPoint {
	x: number;
	y: number;
}

export interface IOpeningProps {
	walls: [LineSegment, LineSegment][];
	rings: [Polygon, Polygon];
	startPoint: Point;
	endPoint: Point;
	apartment: Apartment;
	type?: string;
}

export abstract class Opening extends Polygon {
	@observable walls: [LineSegment, LineSegment][];
	@observable rings: [Polygon, Polygon];
	@observable startPoint: Point;
	@observable endPoint: Point;
	apartment: Apartment;
	controlsClass: any = OpeningControls;
	abstract supportMultipleWalls: boolean;

	constructor(props: IOpeningProps) {
		super({
			type: props.type || 'opening',
			points: []
		});
		this.walls = props.walls;
		this.rings = props.rings;
		this.startPoint = props.startPoint;
		this.endPoint = props.endPoint;
		this.apartment = props.apartment;
	}

	getAxisOf(wall1: LineSegment, wall2: LineSegment) {
		const line1 = wall1.getLine();
		const line2 = wall2.getLine();

		const point1OnLine1 = line1.pointAt(0);
		const point1OnLine2 = point1OnLine1.projectOnLine(line2);
		const point2OnLine1 = line1.pointAt(100);
		const point2OnLine2 = point2OnLine1.projectOnLine(line2);

		const start = new LineSegment(point1OnLine1, point1OnLine2).getMiddle();
		const end = new LineSegment(point2OnLine1, point2OnLine2).getMiddle();
		return new Line(start, end.sub(start));
	}

	@computed
	get sidePoints() {
		// todo: проецируем старт на линии стен, проверяем, находятся ли они внутри отрезка
		// если нет, то максимизируем / минимизируем
		const firstWall = this.walls[0];
		const lastWall = lastItem(this.walls);
		const startAxis = this.getAxisOf(firstWall[0], firstWall[1]);
		const endAxis = this.getAxisOf(lastWall[0], lastWall[1]);
		const start = this.startPoint.projectOnLine(startAxis);
		const end = this.endPoint.projectOnLine(endAxis);
		const startSideLine = new Line(start, startAxis.getNormal());
		const endSideLine = new Line(end, endAxis.getNormal());

		const startAt1 = startSideLine.intersect(firstWall[0]);
		const startAt2 = startSideLine.intersect(firstWall[1]);
		const endAt1 = endSideLine.intersect(lastWall[0]);
		const endAt2 = endSideLine.intersect(lastWall[1]);
		if (!startAt1 || !startAt2 || !endAt1 || !endAt2) {
			return null;
		}

		return {
			startAt1,
			startAt2,
			endAt1,
			endAt2
		};
	}

	@computed
	get isClockwise() {
		if (this.walls.length < 2) {
			return false;
		}
		const firstWall = this.walls[0];
		const secondWall = this.walls[1];

		return (
			firstWall[0].start.equals(secondWall[0].end) ||
			firstWall[0].start.equals(secondWall[1].end)
		);
	}

	@computed
	get pathPoints() {
		const points: IPoint[] = [];
		if (!this.sidePoints) {
			return [];
		}

		const { startAt1, startAt2, endAt1, endAt2 } = this.sidePoints;

		if (this.walls.length === 1) {
			points.push(startAt1, startAt2);
			points.push(endAt2, endAt1);
		} else {
			points.push(startAt2, startAt1);
			this.walls.forEach((wall, i) => {
				if (i === this.walls.length - 1) {
					return;
				}
				points.push(wall[i % 2][this.isClockwise ? 'start' : 'end']);
			});
			points.push(
				...(this.walls.length % 2 === 1 ? [endAt1, endAt2] : [endAt2, endAt1])
			);
			this.walls
				.slice()
				.reverse()
				.forEach((wall, l) => {
					const i = this.walls.length - l;
					if (i === 0 || l === 0) {
						return;
					}
					points.push(wall[i % 2][this.isClockwise ? 'start' : 'end']);
				});
		}

		return points;
	}

	@computed
	get attributes() {
		return new Map([['d', this.path]]);
	}

	@action
	setStartPoint(point: Point) {
		this.startPoint = point;
	}

	@action
	setEndPoint(point: Point) {
		this.endPoint = point;
	}

	@action
	setLastWall([wall1, wall2]: [LineSegment, LineSegment]) {
		const existingWalls = this.walls.find(
			([a, b]) =>
				(wall1.equals(a) && wall2.equals(b)) ||
				(wall1.equals(b) && wall2.equals(a))
		);

		if (existingWalls) {
			const index = this.walls.indexOf(existingWalls);
			this.walls.length = index + 1;
		} else {
			const lastWall = lastItem(this.walls);
			if (
				(lastWall[0].end.equals(wall1.start) &&
					lastWall[1].end.equals(wall2.start)) ||
				(lastWall[0].start.equals(wall1.end) &&
					lastWall[1].start.equals(wall2.end))
			) {
				this.walls.push([wall2, wall1]);
			} else if (
				(lastWall[0].end.equals(wall2.start) &&
					lastWall[1].end.equals(wall1.start)) ||
				(lastWall[0].start.equals(wall2.end) &&
					lastWall[1].start.equals(wall1.end))
			) {
				this.walls.push([wall1, wall2]);
			}
		}
	}

	toJSON() {
		const { points, closed, ...json } = Polygon.prototype.toJSON.call(this);
		return {
			...json,
			walls: this.walls,
			startPoint: this.startPoint,
			endPoint: this.endPoint,
			apartment: this.apartment.id
		};
	}
}
