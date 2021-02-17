import { Point } from '../../Drawing/Geometry/Point';
import { LineSegment } from '../../Drawing/Geometry/LineSegment';
import { Window } from '../Objects/Window';
import { OpeningTool } from './Opening';
import { Apartment } from '../Objects/Apartment';
import { Polygon } from '../../Drawing/Polygon';

export class WindowTool extends OpeningTool<Window> {
	supportMultipleWalls = true;

	createElement(
		walls: [LineSegment, LineSegment][],
		rings: [Polygon, Polygon],
		startPoint: Point,
		endPoint: Point,
		apartment: Apartment
	) {
		return new Window({
			walls,
			rings,
			startPoint,
			endPoint,
			apartment
		});
	}
}

export default new WindowTool();
