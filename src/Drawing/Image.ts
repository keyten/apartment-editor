import { SvgElement } from './SvgElement';
import { observable, computed } from 'mobx';
interface Props {
	path: string;
	x?: number;
	y?: number;
	width?: number;
	height?: number;
}

export class Image extends SvgElement {
	@observable path: string;
	@observable x?: number;
	@observable y?: number;
	@observable width?: number;
	@observable height?: number;

	constructor(props: Props) {
		super({
			tagName: 'image'
		});
		this.path = props.path;
		this.x = props.x;
		this.y = props.y;
		this.width = props.width;
		this.height = props.height;
	}

	@computed
	get attributes() {
		const attrs = new Map(this.styles);
		attrs.set('href', this.path);
		if (this.x) {
			attrs.set('x', String(this.x));
		}
		if (this.y) {
			attrs.set('y', String(this.y));
		}
		if (this.width) {
			attrs.set('width', String(this.width));
		}
		if (this.height) {
			attrs.set('height', String(this.height));
		}
		attrs.set('transform', `matrix(${this.matrix.join(',')})`);
		return attrs;
	}
}
