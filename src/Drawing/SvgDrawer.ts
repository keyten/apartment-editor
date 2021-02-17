import { Layer } from './Layer';
import { SvgElement } from './SvgElement';
import { computed, observable, action, autorun } from 'mobx';
import { setAttr } from '../utils/svg';
import { Matrix } from './Geometry/Matrix';
import { Point } from './Geometry/Point';
import { animate } from '../utils/animation';

interface ISvgDrawerProps {
	name?: string;
}

export class SvgDrawer extends SvgElement {
	private svgContainer?: SVGGElement;
	private layers: Map<string, Layer>;
	private currentLayer: Layer | null;
	private name?: string;
	@observable private width: number;
	@observable private height: number;
	@observable zoom: number;
	@observable position: Point;
	@observable private zoomPoint: { x: number; y: number };

	constructor({ name }: ISvgDrawerProps) {
		super({
			tagName: 'svg'
		});
		this.name = name;
		this.layers = new Map();
		this.currentLayer = null;
		this.position = new Point(0, 0);
		this.zoom = 1;
	}

	@computed
	get matrix(): [number, number, number, number, number, number] {
		const translate = Matrix.translate(this.position.x, this.position.y);
		const scale = Matrix.scale(this.zoom, this.zoom, this.zoomPoint);
		return translate.mul(scale).values;
	}

	@computed
	get attributes() {
		return new Map([
			['id', `${this.name}`],
			['width', `${this.width}`],
			['height', `${this.height}`],
			/*[
				'viewBox',
				`${this.position.getX()},${this.position.getY()},
      ${this.width / this.zoom},${this.height / this.zoom}`
			], */
			//	['transform', 'scale(1,-1)'],
			['baseProfile', 'full'],
			['xmlns', 'http://www.w3.org/2000/svg'],
			['xmlns:xlink', 'http://www.w3.org/1999/xlink'],
			['xmlns:ev', 'http://www.w3.org/2001/xml-events']
		]);
	}

	@computed
	get containerAttributes() {
		return new Map([['transform', `matrix(${this.matrix.join(', ')})`]]);
	}

	@computed
	get container() {
		if (!this.svgContainer) {
			const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
			g.setAttribute('id', 'main');
			this.element.appendChild(g);
			this.svgContainer = g;
			this.disposers.push(autorun(() => this.container));
		}

		setAttr(this.svgContainer, this.containerAttributes);
		return this.svgContainer;
	}

	render(rootElement: Element) {
		const setSize = () => {
			this.setWidth(rootElement.clientWidth);
			this.setHeight(rootElement.clientHeight);
		};
		setSize();
		rootElement.appendChild(this.element);
		window.addEventListener('resize', setSize, false);
		return this;
	}

	getWidth(): number {
		return this.width;
	}

	getHeight(): number {
		return this.height;
	}

	@action setPosition(x: number, y: number) {
		this.position = new Point(x, y);
	}

	@action
	setWidth(width: number) {
		this.width = width;
	}

	@action
	setHeight(height: number) {
		this.height = height;
	}

	addLayer(layer: Layer) {
		this.layers.set(layer.getName(), layer);
		this.container.appendChild(layer.element);
	}

	add(elem: SvgElement, layer?: string) {
		if (layer) {
			this.layers.get(layer)?.addElement(elem);
		} else if (this.currentLayer) {
			this.currentLayer.addElement(elem);
		}
	}

	@action
	setCurrentLayer(name: string) {
		this.currentLayer = this.layers.get(name) || null;
	}

	clearLayer(name: string) {
		this.layers.get(name)?.clear();
	}

	@action
	setZoom(value: number, point: { x: number; y: number }) {
		const zoomValue = value < 0 && this.zoom > 1 ? value / 500 : value / 1000;
		const oldZoom = this.zoom;
		const newZoom = Math.min(Math.max(this.zoom - zoomValue, 0.1), 2.5);

		const { x, y } = point;

		const oldPosition = this.position;
		const newPosition = {
			x: this.position.x - (x * newZoom - x * oldZoom),
			y: this.position.y - (y * newZoom - y * oldZoom)
		};
		animate(0, 1, 40, factor => {
			action(() => {
				this.setPosition(
					oldPosition.x + (newPosition.x - oldPosition.x) * factor,
					oldPosition.y + (newPosition.y - oldPosition.y) * factor
				);
				this.zoom = oldZoom + (newZoom - oldZoom) * factor;
			})();
		});
	}
}
