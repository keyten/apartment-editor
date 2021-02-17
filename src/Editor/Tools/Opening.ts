import { Tool } from './Tool';
import { editorStore } from '../../Store';
import { Point } from '../../Drawing/Geometry/Point';
import { LineSegment } from '../../Drawing/Geometry/LineSegment';
import { Polygon } from '../../Drawing/Polygon';
import { delItem } from '../../utils/array';
import { MouseControllerEvent } from '../Controllers/MouseController';
import { Opening } from '../Objects/Opening';
import { isPointInPolygon } from '../../Drawing/Geometry/Intersections';
import { Apartment } from '../Objects/Apartment';
import { Ray } from '../../Drawing/Geometry/Ray';
import { Room } from '../Objects/Room';
import ArrowTool from './Arrow';

export function findWalls(point: Point, rings: Polygon[]) {
	const { wall: wall1, ring: ring1 } = findNearestWall(point, rings);
	if (wall1 !== null && ring1 !== null) {
		delItem(rings, ring1);

		const { wall: wall2, ring: ring2 } = findOppositeWall(
			point,
			rings,
			wall1,
			ring1
		);
		if (wall2 !== null) {
			return { wall1, wall2, ring1, ring2 };
		}
	}
	return {
		wall1,
		ring1,
		wall2: null,
		ring2: null
	};
}

export function findNearestWall(
	point: Point,
	rings: Polygon[]
): { wall: LineSegment; ring: Polygon } | { wall: null; ring: null } {
	let minDistance = Infinity;
	let minRing: Polygon | null = null;
	let minLine: LineSegment | null = null;
	rings.forEach(ring => {
		ring.lines.forEach(line => {
			const projection = point.projectOnLine(line);
			const isContain = line.isPointIn(projection);
			let distance: number;

			if (isContain) {
				distance = Math.abs(point.distanceToLine(line.getLine()));
			} else {
				distance = Math.min(
					point.sub(line.start).length(),
					point.sub(line.end).length()
				);
			}

			if (distance < minDistance) {
				minDistance = distance;
				minRing = ring;
				minLine = line;
			}
		});
	});
	return {
		wall: minLine,
		ring: minRing
	};
}

export function findOppositeWall(
	point: Point,
	rings: Polygon[],
	wall: LineSegment,
	sourceRing: Polygon
): { wall: LineSegment; ring: Polygon } | { wall: null; ring: null } {
	const pointOnWall = point.projectOnLine(wall);
	const direction = wall.getNormal();
	// немного сдвигаем луч, чтобы он не пересекался со стеной, из которой выходит
	let normalRay = new Ray(pointOnWall.add(direction.mul(1 / 2)), direction);

	// если луч пересекается с любой стеной ring, значит смотрит внутрь
	const isRayInward = sourceRing.lines.find(
		line => normalRay.intersect(line) !== null
	);
	// лучи от квартиры должны смотреть внутрь, а от комнаты наружу
	if (
		(sourceRing instanceof Apartment && !isRayInward) ||
		(sourceRing instanceof Room && isRayInward)
	) {
		normalRay = normalRay.reverse();
	}

	let minDistance = Infinity;
	let minRing: Polygon | null = null;
	let minLine: LineSegment | null = null;
	rings.forEach(ring => {
		ring.lines.forEach(line => {
			const intersectPoint = normalRay.intersect(line);
			if (intersectPoint) {
				const distance = intersectPoint.sub(point).length();
				if (distance < minDistance) {
					minDistance = distance;
					minRing = ring;
					minLine = line;
				}
			}
		});
	});

	return {
		wall: minLine,
		ring: minRing
	};
}

export abstract class OpeningTool<T extends Opening> extends Tool {
	currentElement: T | null = null;
	currentApartment: Apartment | null = null;
	abstract createElement(
		walls: [LineSegment, LineSegment][],
		rings: [Polygon, Polygon],
		startPoint: Point,
		endPoint: Point,
		apartment: Apartment
	): T;
	abstract supportMultipleWalls: boolean;

	onMouseDown = (e: MouseControllerEvent) => {
		this.currentElement = null;
		this.currentApartment = null;

		const point = new Point(e.x, e.y);
		const apartment = editorStore.project.apartments.filter(ap => {
			return isPointInPolygon(point, ap.points);
		})[0];

		if (!apartment) {
			return;
		}

		const rings: Polygon[] = editorStore.project.rooms.filter(
			room => room.apartment === apartment
		);
		rings.push(apartment);

		const { wall1, wall2, ring1, ring2 } = findWalls(point, rings);
		if (wall1 && wall2 && ring1 && ring2) {
			this.currentElement = this.createElement(
				[[wall1, wall2]],
				[ring1, ring2],
				point,
				point,
				apartment
			);
			this.currentApartment = apartment;
			editorStore.project.addObject(this.currentElement);
			editorStore.project.showControlsOf(this.currentElement, false);
		}
	};

	onMouseDrag = (e: MouseControllerEvent) => {
		if (!this.currentElement || !this.currentApartment) {
			return;
		}

		const point = new Point(e.x, e.y);
		this.currentElement.setEndPoint(point);

		if (this.supportMultipleWalls) {
			const { wall1, wall2, ring1, ring2 } = findWalls(
				point,
				this.currentElement.rings.slice()
			);
			if (wall1 && wall2 && ring1 && ring2) {
				this.currentElement.setLastWall([wall1, wall2]);
			}
		}
	};

	destruct(tool: Tool) {
		const elem = this.currentElement;

		editorStore.project.hideControls();
		this.currentElement = null;
		this.currentApartment = null;

		if (tool === ArrowTool && elem) {
			editorStore.project.showControlsOf(elem, true);
		}
	}
}
