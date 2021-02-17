import { SvgElement } from '../SvgElement';
import { observable, action, computed } from 'mobx';

export class ControlPoint extends SvgElement {
	@observable cx: number;
	@observable cy: number;
	@observable zoom: number;
	onMouseDown?: (e: MouseEvent) => void;
	onDblClick?: (e: MouseEvent) => void;

	constructor() {
		super({
			tagName: 'circle',
			type: 'controlPoint'
		});
		this.zoom = 1;
	}

	@computed
	get attributes() {
		return new Map([
			['cx', String(this.cx)],
			['cy', String(this.cy)],
			['r', String(4 / this.zoom)],
			['fill', '#6C0FD9']
		]);
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
		svgElement.addEventListener('dblclick', e => {
			if (this.onDblClick) {
				this.onDblClick(e);
			}
		});
	}

	setMouseDownListener = (fn: (e: MouseEvent) => void) => {
		this.onMouseDown = fn;
		return this;
	};

	setDblClickListener = (fn: (e: MouseEvent) => void) => {
		this.onDblClick = fn;
		return this;
	};
}
