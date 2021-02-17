import { SvgElement } from './SvgElement';
import { observable, computed } from 'mobx';
import { Point } from './Geometry/Point';
import { Polygon } from './Polygon';

export interface ILineProps {
	start: Point;
	end: Point;
	type?: string;
}

export class Line extends Polygon {
	@observable start: Point;
	@observable end: Point;

	constructor(props: ILineProps) {
		super({
			points: [
				{
					x: props.start.x,
					y: props.start.y
				},
				{
					x: props.end.x,
					y: props.end.y
				}
			]
		});
		this.start = props.start;
		this.end = props.end;
	}

	@computed
	get attributes() {
		return new Map([
			['d', this.path],
			['stroke', 'black']
		]);
	}
}
