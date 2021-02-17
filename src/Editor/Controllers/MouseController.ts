import { Project } from '../Project';
import ToolsStore from '../../Store/ToolsStore';
import { Matrix } from '../../Drawing/Geometry/Matrix';
import { Point } from '../../Drawing/Geometry/Point';

export interface MouseControllerEvent {
	type: string;
	x: number;
	y: number;
	clientX: number;
	clientY: number;
	target: EventTarget | null;
	ctrlKey: boolean;
	altKey: boolean;
	shiftKey: boolean;
}

export class MouseController {
	project: Project;
	down: boolean = false;

	constructor(project: Project) {
		this.project = project;

		const svg = project.viewModel.element;
		svg.addEventListener('mousedown', this.onMouseDown);
		svg.addEventListener('wheel', this.onMouseWheel);
		window.addEventListener('mousemove', this.onMouseMove);
		window.addEventListener('mouseup', this.onMouseUp);
	}

	toMouseControllerEvent = (
		e: MouseEvent | WheelEvent,
		pinning: boolean = false
	): MouseControllerEvent => {
		const matrix = new Matrix(this.project.viewModel.matrix);
		const p = matrix.inv().mul(new Point(e.clientX, e.clientY));
		const { x, y } = p;
		return {
			type: e.type,
			x,
			y,
			clientX: e.clientX,
			clientY: e.clientY,
			target: e.target,
			ctrlKey: e.ctrlKey,
			altKey: e.altKey,
			shiftKey: e.shiftKey
		};
	};

	onMouseDown = (e: MouseEvent) => {
		if (ToolsStore.activeTool) {
			ToolsStore.activeTool.onMouseDown(this.toMouseControllerEvent(e));
		}
		this.down = true;
	};

	onMouseMove = (e: MouseEvent) => {
		// пока включаем пиннинг для всего
		if (ToolsStore.activeTool) {
			ToolsStore.activeTool.onMouseMove(this.toMouseControllerEvent(e));
			if (this.down) {
				ToolsStore.activeTool.onMouseDrag(this.toMouseControllerEvent(e, true));
			}
		}
	};

	onMouseUp = (e: MouseEvent) => {
		if (ToolsStore.activeTool) {
			ToolsStore.activeTool.onMouseUp(this.toMouseControllerEvent(e));
		}
		this.down = false;
	};

	onMouseWheel = (e: WheelEvent) => {
		const event = this.toMouseControllerEvent(e);
		this.project.zoom(e.deltaY, {
			x: event.x,
			y: event.y
		});
	};
}
