import { SvgElement } from '../SvgElement';
import { observable, action, computed } from 'mobx';

export class RotatePoint extends SvgElement {
	@observable cx: number;
	@observable cy: number;
	@observable zoom: number;
	@observable cursor: string;
	onMouseDown?: (e: MouseEvent) => void;

	constructor() {
		super({
			tagName: 'circle',
			type: 'rotatePoint'
		});
		this.zoom = 1;
	}

	@computed
	get attributes() {
		return new Map([
			['cx', String(this.cx)],
			['cy', String(this.cy)],
			['r', String(30 / this.zoom)],
			['fill', 'transparent'],
			['style', `cursor: ${this.cursor}`]
		]);
	}

	@action
	setCursor(value: string) {
		this.cursor = value;
		return this;
	}

	@action
	setPosition(cx: number, cy: number) {
		this.cx = cx;
		this.cy = cy;
	}

	@action
	setZoom(zoom: number) {
		this.zoom = zoom;
	}

	initElement(svgElement: SVGElement) {
		// можно вынести иф на верхний уровень и в конструкторе сделать reaction на изменения
		svgElement.addEventListener('mousedown', e => {
			if (this.onMouseDown) {
				this.onMouseDown(e);
			}
		});
	}

	setMouseDownListener = (fn: (e: MouseEvent) => void) => {
		this.onMouseDown = fn;
		return this;
	};
}
