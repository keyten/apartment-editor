import { Polygon, IPolygonProps } from '../../Drawing/Polygon';
import { Hatch } from './Hatch';
import { computed, observable } from 'mobx';

export class Apartment extends Polygon {
	@observable hatch: Hatch;

	constructor(props: IPolygonProps) {
		super({
			type: 'apartment',
			...props
		});
		this.hatch = new Hatch();
		this.hatch.setApartment(this);
		this.disposers.push(() => {
			this.hatch.remove();
		});
	}

	@computed
	get attributes() {
		return new Map([
			['d', this.path],
			['transform', `matrix(${this.matrix.join(',')})`],
			['fill', 'none'],
			['stroke', '#6267E1'],
			['stroke-width', '1']
		]);
	}
}
