import { Command } from './Command';
import { Polygon } from '../../Drawing/Polygon';
import { Project } from '../Project';

interface IAddPolygonPointCommandProps {
	point: { x: number; y: number };
	polygon: Polygon;
}

export class AddPolygonPointCommand extends Command {
	private polygon: Polygon;
	private point: { x: number; y: number };

	constructor({ polygon, point }: IAddPolygonPointCommandProps) {
		super();
		this.polygon = polygon;
		this.point = point;
	}

	execute(project: Project) {
		project.showControlsOf(this.polygon, false);
		this.polygon.addPoint({
			x: this.point.x,
			y: this.point.y
		});
	}

	undo(project: Project) {
		project.showControlsOf(this.polygon, false);
		this.polygon.removeLastPoint();
	}
}
