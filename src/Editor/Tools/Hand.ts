import { Tool } from './Tool';
import { editorStore } from '../../Store';
import { MouseControllerEvent } from '../Controllers/MouseController';
import { Point } from '../../Drawing/Geometry/Point';

export class HandTool extends Tool {
	private startPosition?: Point;
	private clickPosition?: Point;

	onMouseDown = (e: MouseControllerEvent) => {
		const viewModel = editorStore.project.viewModel;
		this.clickPosition = new Point(e.clientX, e.clientY);
		this.startPosition = viewModel.position;
	};

	onMouseDrag = (e: MouseControllerEvent) => {
		const current = new Point(e.clientX, e.clientY);
		const diff = this.clickPosition && current.sub(this.clickPosition);
		const newPosition = diff && this.startPosition?.add(diff);

		const viewModel = editorStore.project.viewModel;
		if (newPosition) {
			viewModel.setPosition(newPosition.x, newPosition.y);
		}
	};
}

export default new HandTool();
