import { Point } from '../../Drawing/Geometry/Point';
import { LineSegment } from '../../Drawing/Geometry/LineSegment';
import { OpeningTool } from './Opening';
import { Apartment } from '../Objects/Apartment';
import { Polygon } from '../../Drawing/Polygon';
import { BalconyDoor } from '../Objects/BalconyDoor';

export class BalconyDoorTool extends OpeningTool<BalconyDoor> {
	supportMultipleWalls = false;

	createElement(
		walls: [LineSegment, LineSegment][],
		rings: [Polygon, Polygon],
		startPoint: Point,
		endPoint: Point,
		apartment: Apartment
	) {
		return new BalconyDoor({
			walls,
			rings,
			startPoint,
			endPoint,
			apartment,
			balconyDoorType: 'wdw'
		});
	}
}

export default new BalconyDoorTool();
