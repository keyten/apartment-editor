import { SvgElement } from './SvgElement';
import { observable, computed, action } from 'mobx';

export interface ICircleProps {
	cx: number;
	cy: number;
	r: number;
	type?: string;
}

export class Circle extends SvgElement {
	@observable cx: number;
	@observable cy: number;
	@observable r: number;

	constructor(props: ICircleProps) {
		super({
			tagName: 'circle',
			type: props.type || 'circle'
		});
		this.cx = props.cx;
		this.cy = props.cy;
		this.r = props.r;
	}

	@action
	setCoords(cx: number, cy: number) {
		this.cx = cx;
		this.cy = cy;
	}

	@computed
	get attributes() {
		const attrs = new Map(this.styles);
		attrs.set('cx', String(this.cx));
		attrs.set('cy', String(this.cy));
		attrs.set('r', String(this.r));
		return attrs;
	}
}
