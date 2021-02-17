import { editorStore } from '../../Store';
import { SvgElement } from '../../Drawing/SvgElement';
import { SelectTool } from './Select';
import { TransformControls } from '../../Drawing/Controls/TransformControls';
import { Image } from '../../Drawing/Image';

export class TransformTool extends SelectTool {
	private controls?: SvgElement;

	selectItem(elem: SvgElement | null) {
		if (this.currentElement) {
			this.deselect();
		}

		this.currentElement = null;

		if (!(elem instanceof Image)) {
			return;
		}

		this.currentElement = elem;
		if (elem) {
			this.select(elem);
		}
	}

	deselect() {
		this.controls?.remove();
		editorStore.project.viewModel.clearLayer('controls');
	}

	select(element: SvgElement) {
		const controls = new TransformControls({
			element,
			project: editorStore.project
		});
		editorStore.project.viewModel.add(controls, 'controls');
		this.controls = controls;
	}
}

export default new TransformTool();
