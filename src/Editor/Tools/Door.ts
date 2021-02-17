import { Point } from '../../Drawing/Geometry/Point';
import { LineSegment } from '../../Drawing/Geometry/LineSegment';
import { OpeningTool } from './Opening';
import { Door } from '../Objects/Door';
import { toolsStore } from '../../Store';
import { Apartment } from '../Objects/Apartment';
import { Polygon } from '../../Drawing/Polygon';

export class DoorTool extends OpeningTool<Door> {
	supportMultipleWalls = false;

	createElement(
		walls: [LineSegment, LineSegment][],
		rings: [Polygon, Polygon],
		startPoint: Point,
		endPoint: Point,
		apartment: Apartment
	) {
		return new Door({
			walls,
			rings,
			startPoint,
			endPoint,
			doorType: toolsStore.doorType,
			apartment
		});
	}
}

export default new DoorTool();
