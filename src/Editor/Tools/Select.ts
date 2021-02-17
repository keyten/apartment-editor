import { Tool } from './Tool';
import { editorStore, toolsStore } from '../../Store';
import { SvgElement } from '../../Drawing/SvgElement';
import { hasParentWithId } from '../../utils/svg';
import { MouseControllerEvent } from '../Controllers/MouseController';
import { KeyControllerEvent } from '../Controllers/KeyController';

export abstract class SelectTool extends Tool {
	abstract selectItem(elem: SvgElement | null): void;

	protected disposers: (() => void)[] = [];
	currentElement: SvgElement | null = null;
	onMouseDown = (e: MouseControllerEvent) => {
		const project = editorStore.project;
		if (e.target instanceof Element) {
			if (hasParentWithId(e.target, 'controls')) {
				return;
			}

			const elem = project.getElementByDom(e.target);
			if (elem !== this.currentElement) {
				if (elem && 'controlsClass' in elem) {
					this.selectItem(elem);
					toolsStore.setSelectedElement(elem);
				} else {
					this.selectItem(null);
					toolsStore.setSelectedElement(null);
				}
			}
		} else {
			this.selectItem(null);
			toolsStore.setSelectedElement(null);
		}
	};

	onKeyDown = (e: KeyControllerEvent) => {
		if (e.key === 'Delete' || e.key === 'Backspace') {
			if (this.currentElement) {
				const elem = this.currentElement;
				this.selectItem(null);
				toolsStore.setSelectedElement(null);
				elem.remove();
				//			editorStore.project.hideControls();
				//			this.currentElement.remove();
				//			this.currentElement = null;
			}
		}
	};

	destruct() {
		this.selectItem(null);
		toolsStore.setSelectedElement(null);
		//		editorStore.project.hideControls();
		//		this.currentElement = null;

		this.disposers.forEach(disposer => {
			disposer();
		});
		this.disposers = [];
	}
}
