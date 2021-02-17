import { SvgElement } from './SvgElement';
import { observable, computed, action } from 'mobx';

export interface IPolygonProps {
	path: string;
	type?: string;
}

export class Path extends SvgElement {
	@observable path: string;

	constructor(props: IPolygonProps) {
		super({
			tagName: 'path',
			type: 'path'
		});
		this.path = props.path;
	}

	@computed
	get attributes() {
		const attrs = new Map(this.styles);
		attrs.set('d', this.path);
		return attrs;
	}

	@action
	setPath(path: string) {
		this.path = path;
	}
}
