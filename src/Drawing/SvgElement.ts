import { ReactSVG } from 'react';
import { observable, computed, autorun, action } from 'mobx';
import { setAttr } from '../utils/svg';
import { Point } from './Geometry/Point';
import { uid } from '../utils/uid';
import { Matrix } from './Geometry/Matrix';

export interface ISvgElementProps {
	tagName: keyof ReactSVG;
	type?: string;
}

export class SvgElement {
	protected disposers: (() => void)[] = [];
	@observable protected svgElement?: SVGElement;
	@observable protected bonds: SvgElement[];
	readonly tagName: keyof ReactSVG;
	readonly id: string;
	@observable position: Point;
	@observable scale: Point;
	@observable scaleOffset: Point;
	@observable rotation: number;
	@observable rotationOffset: Point;
	@observable styles: Map<string, string>;
	type: string;
	controlsClass?: any;

	constructor(props: ISvgElementProps) {
		this.tagName = props.tagName;
		if (props.type) {
			this.type = props.type;
		}
		this.position = new Point(0, 0);
		this.scale = new Point(1, 1);
		this.scaleOffset = new Point(0, 0);
		this.rotationOffset = new Point(0, 0);
		this.rotation = 0;
		this.styles = new Map();
		this.bonds = [];
		this.id = uid();
	}

	@computed
	get matrix(): [number, number, number, number, number, number] {
		// https://gamedev.stackexchange.com/questions/29260/transform-matrix-multiplication-order
		return [
			Matrix.translate(this.position.x, this.position.y),
			Matrix.translate(this.rotationOffset.x, this.rotationOffset.y),
			Matrix.rotate(this.rotation),
			Matrix.translate(this.scaleOffset.x, this.scaleOffset.y),
			Matrix.scale(this.scale.x, this.scale.y)
		].reduce((acc, v) => acc.mul(v), Matrix.eye()).values;
	}

	@computed get attributes(): Map<string, string> {
		return new Map([['transform', `matrix(${this.matrix.join(',')})`]]);
	}

	@computed get element(): SVGElement {
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

		setAttr(this.svgElement, this.attributes);
		return this.svgElement;
	}

	@computed get tightBox() {
		const svgElem = this.element as SVGGraphicsElement;
		const bbox = svgElem.getBBox();
		let lt = new Point(bbox.x, bbox.y);
		let rt = new Point(bbox.x + bbox.width, bbox.y);
		let lb = new Point(bbox.x, bbox.y + bbox.height);
		let rb = new Point(bbox.x + bbox.width, bbox.y + bbox.height);
		const matrix = new Matrix(this.matrix);
		lt = matrix.mul(lt);
		rt = matrix.mul(rt);
		lb = matrix.mul(lb);
		rb = matrix.mul(rb);
		return {
			lt,
			rt,
			lb,
			rb
		};
	}

	@action setPosition(x: number, y: number) {
		this.position = new Point(x, y);
	}

	@action setScale(x: number, y: number) {
		this.scale = new Point(x, y);
	}

	@action setRotation(rotation: number) {
		this.rotation = rotation;
	}

	@action setScaleOffset(x: number, y: number) {
		this.scaleOffset = new Point(x, y);
	}

	@action setRotationOffset(x: number, y: number) {
		this.rotationOffset = new Point(x, y);
	}

	@action setStyle(key: string, value: string) {
		this.styles.set(key, value);
		return this;
	}

	initElement(svgElement: SVGElement) {}

	addDisposer(fn: () => void) {
		this.disposers.push(fn);
	}

	@action addBond(bond: SvgElement) {
		this.bonds.push(bond);
	}

	remove() {
		this.element.parentNode?.removeChild(this.element);
		this.disposers.forEach(disposer => {
			disposer();
		});
		this.disposers = [];
	}

	toJSON(): any {
		return {
			type: this.type,
			tagName: this.tagName,
			id: this.id
		};
	}
}
