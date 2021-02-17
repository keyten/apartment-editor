import { SvgElement } from './SvgElement';
import { computed } from 'mobx';

export class Layer extends SvgElement {
	private name: string;

	constructor(name: string) {
		super({
			tagName: 'g',
			type: 'layer'
		});

		this.name = name;
	}

	getName() {
		return this.name;
	}

	@computed
	get attributes() {
		return new Map([['id', this.name]]);
	}

	addElement(elem: SvgElement) {
		this.element.appendChild(elem.element);
	}

	clear() {
		// remove disposers
		this.element.childNodes.forEach(node => this.element.removeChild(node));
	}
}
