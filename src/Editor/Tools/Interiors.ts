import { Tool } from './Tool';
import { editorStore, toolsStore } from '../../Store';
import { MouseControllerEvent } from '../Controllers/MouseController';
import { Image } from '../../Drawing/Image';
import TransformTool from './TransformTool';

export class InteriorsTool extends Tool {
	onMouseDown = (e: MouseControllerEvent) => {
		if (!toolsStore.selectedInterior) {
			return;
		}

		const image = new Image({
			path: toolsStore.selectedInterior.image_2d.original_url,
			x: e.x - 50,
			y: e.y - 50,
			width: 100,
			height: 100
		});
		editorStore.project.addObject(image);

		toolsStore.setTool(TransformTool);
		TransformTool.selectItem(image);
	};
}

export default new InteriorsTool();
