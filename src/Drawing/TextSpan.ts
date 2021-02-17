import { SvgElement } from './SvgElement';
import { observable, computed, action, autorun } from 'mobx';
import { setAttr } from '../utils/svg';

interface ITextSpanProps {
	text: string;
}

export class TextSpan extends SvgElement {
	@observable text: string;

	constructor(props: ITextSpanProps) {
		super({
			tagName: 'tspan'
		});
		this.text = props.text;
	}

	@computed
	get attributes() {
		const attrs = new Map(this.styles);
		attrs.set('x', '0');
		attrs.set('text-anchor', 'middle');
		attrs.set('dy', '1.3em');
		return attrs;
	}

	@computed
	get element(): SVGElement {
		if (!this.svgElement) {
			this.svgElement = document.createElementNS(
				'http://www.w3.org/2000/svg',
				this.tagName
			);
			this.initElement(this.svgElement);
			this.disposers.push(
				autorun(() => (this.element, this.bonds.forEach(bond => bond)))
			);
		}

		this.svgElement.textContent = this.text;
		setAttr(this.svgElement, this.attributes);
		return this.svgElement;
	}

	@action
	setText(value: string) {
		this.text = value;
	}
}
