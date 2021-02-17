import { SvgElement } from './SvgElement';
import { observable, computed, action } from 'mobx';
import { PolygonControls } from './Controls/PolygonControls';
import { LineSegment } from './Geometry/LineSegment';
import { Point } from './Geometry/Point';
import { lastItem } from '../utils/array';

interface IPoint {
	x: number;
	y: number;
}

export interface IPolygonProps {
	points: IPoint[];
	closed?: boolean;
	type?: string;
}

export class Polygon extends SvgElement {
	@observable points: IPoint[];
	@observable closed: boolean;
	controlsClass: any = PolygonControls;

	constructor(props: IPolygonProps) {
		super({
			tagName: 'path',
			type: props.type || 'polygon'
		});
		this.points = props.points;
		this.closed = props.closed === undefined ? true : props.closed;
	}

	@computed
	get lines() {
		const lines: LineSegment[] = [];
		this.points.forEach((point, i) => {
			if (i === 0) {
				return;
			}

			const prev = new Point(this.points[i - 1].x, this.points[i - 1].y);
			const cur = new Point(point.x, point.y);
			const line = new LineSegment(prev, cur);
			lines.push(line);
		});

		if (this.closed) {
			const firstLine = lines[0];
			const lastLine = lastItem(lines);

			if (!firstLine.start.equals(lastLine.end)) {
				lines.push(
					new LineSegment(lastLine.end.clone(), firstLine.start.clone())
				);
			}
		}
		return lines;
	}

	@computed
	get pathPoints() {
		return this.points;
	}

	@computed
	get path() {
		if (this.pathPoints.length === 0) {
			return '';
		}

		return (
			this.pathPoints
				.map((segment, i) => {
					if (i === 0) {
						return `M${segment.x},${segment.y}`;
					} else {
						return `L${segment.x},${segment.y}`;
					}
				})
				.join(' ') + (this.closed ? 'z' : '')
		);
	}

	@computed
	get attributes() {
		const attrs = new Map(this.styles);
		attrs.set('d', this.path);
		return attrs;
	}

	@action
	addPoint(point: IPoint) {
		this.points.push(point);
	}

	@action
	setPoint(i: number, point: IPoint) {
		this.points[i] = point;
	}

	@action
	setPoints(points: IPoint[]) {
		this.points = points;
	}

	@action
	removePoint(i: number) {
		this.points.splice(i, 1);
	}

	@action
	removeLastPoint() {
		this.points.pop();
	}

	toJSON() {
		return {
			...SvgElement.prototype.toJSON.call(this),
			points: this.points,
			closed: this.closed
		};
	}
}
