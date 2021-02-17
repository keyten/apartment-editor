import { editorStore } from '../../Store';
import { SvgElement } from '../../Drawing/SvgElement';
import { SelectTool } from './Select';

export class ArrowTool extends SelectTool {
	selectItem(elem: SvgElement | null) {
		this.currentElement = elem;
		if (elem === null) {
			editorStore.project.hideControls();
		} else {
			editorStore.project.showControlsOf(elem, true);
		}
	}
}

export default new ArrowTool();
