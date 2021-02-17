import { Command } from './Command';
import { Apartment } from '../Objects/Apartment';
import { Room } from '../Objects/Room';
import { Project } from '../Project';
import { isPointInPolygon } from '../../Drawing/Geometry/Intersections';

interface ICreatePolygonCommandProps {
	point: { x: number; y: number };
	drawType: 'apartment' | 'room';
}

export class CreatePolygonCommand extends Command<
	Apartment | Room | null,
	void
> {
	private polygon?: Apartment | Room;
	private point: { x: number; y: number };
	private drawType: 'apartment' | 'room';

	constructor({ point, drawType }: ICreatePolygonCommandProps) {
		super();
		this.point = point;
		this.drawType = drawType;
	}

	execute(project: Project) {
		const points = [
			{
				x: this.point.x,
				y: this.point.y
			}
		];

		if (this.drawType === 'apartment') {
			this.polygon = new Apartment({ points });
		} else {
			const apartment = project.apartments.filter(ap =>
				isPointInPolygon(this.point, ap.points)
			)[0];
			if (!apartment) {
				return null;
			}
			this.polygon = new Room({ points, apartment });
		}

		project.addObject(this.polygon);
		project.showControlsOf(this.polygon, false);
		return this.polygon;
	}

	undo(project: Project) {
		if (!this.polygon) {
			return null;
		}

		project.hideControls();
		this.polygon.remove();
		delete this.polygon;
	}
}
