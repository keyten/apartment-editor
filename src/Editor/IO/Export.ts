import { Project } from '../Project';
import { setAttr } from '../../utils/svg';
import { getPolygonArea } from '../../Drawing/Geometry/Polygon';
import { lastItem } from '../../utils/array';

interface SVGGroup {
	id: string;
	children: Array<SVGElement | SVGGroup>;
}

interface IPoint {
	x: number;
	y: number;
}

class Export {
	static exportAsJSON(project: Project) {
		const object = {
			apartments: project.apartments
				.map(ap => preparePolygon(ap.toJSON()))
				.filter(ap => ap !== null),
			rooms: project.rooms
				.map(room => preparePolygon(room.toJSON()))
				.filter(room => room !== null),
			objects: project.objects.map(obj => obj.toJSON())
		};

		return JSON.stringify(object);
	}

	static exportAsSVG(project: Project) {
		const svg = project.viewModel.element.cloneNode(false) as SVGElement;
		const groups: SVGGroup[] = [];
		const bboxes: DOMRect[] = [];
		project.apartments.forEach((apartment, id) => {
			const group: SVGGroup = {
				id: `${id}_group`,
				children: []
			};

			const back = apartment.element.cloneNode(false) as SVGElement;
			setAttr(
				back,
				new Map([
					['fill', '#EEEEEE'],
					['stroke', 'none']
				])
			);

			const walls = apartment.hatch.element.cloneNode(false) as SVGElement;
			setAttr(
				walls,
				new Map([
					['fill', '#5A5A5A'],
					['fill-opacity', '1']
				])
			);

			const rooms = project.rooms.filter(room => room.apartment === apartment);
			const text: SVGElement[] = [];
			rooms.forEach(room => {
				const area = Math.abs(getPolygonArea(room.points) / 1000);
				if (area > 0.1) {
					const elem = room.label.element.cloneNode(true) as SVGElement;
					setAttr(elem, new Map([['fill', '#5A5A5A']]));
					text.push(elem);
				}
			});

			group.children.push(
				{
					id: `${id}_back_plate`,
					children: [back]
				},
				{
					id: `${id}_walls`,
					children: [walls]
				} /*
				{
					id: `${id}_text`,
					children: text
				} */
			);
			groups.push(group);
			bboxes.push((apartment.element as SVGGraphicsElement).getBBox());
		});

		groups.forEach(group => {
			svg.appendChild(groupToSvg(group));
		});

		const svgBBox = maximizeBBox(bboxes);
		svg.setAttribute('width', String(svgBBox.x2 + 10));
		svg.setAttribute('height', String(svgBBox.y2 + 10));
		console.log(svg.outerHTML);

		return svg.outerHTML;
	}
}

function groupToSvg(group: SVGGroup) {
	const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	g.setAttribute('id', group.id);
	group.children.forEach(elem => {
		if (elem instanceof SVGElement) {
			g.appendChild(elem);
		} else {
			g.appendChild(groupToSvg(elem));
		}
	});
	return g;
}

function maximizeBBox(bboxes: DOMRect[]) {
	const maximized = {
		x1: Infinity,
		y1: Infinity,
		x2: -Infinity,
		y2: -Infinity
	};

	bboxes.forEach(bbox => {
		const [x1, y1, x2, y2] = [
			bbox.x,
			bbox.y,
			bbox.x + bbox.width,
			bbox.y + bbox.height
		];
		maximized.x1 = Math.min(maximized.x1, x1);
		maximized.y1 = Math.min(maximized.y1, y1);
		maximized.x2 = Math.max(maximized.x2, x2);
		maximized.y2 = Math.max(maximized.y2, y2);
	});

	return maximized;
}

function preparePolygon<T extends { points: IPoint[] }>(polygon: T): T | null {
	const points = polygon.points;
	if (points.length > 1) {
		const lastPoint = lastItem(points);
		if (points[0].x === lastPoint.x && points[0].y === lastPoint.y) {
			points.slice();
		}
	}
	if (points.length < 3) {
		return null;
	}
	if (getPolygonArea(points) < 0) {
		points.reverse();
	}
	return {
		...polygon,
		points
	};
}

export default Export;
