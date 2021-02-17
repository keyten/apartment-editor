import { Polygon } from '../../Drawing/Polygon';
import { computed, observable, action } from 'mobx';
import { Apartment } from './Apartment';
import { delItem } from '../../utils/array';

export class Hatch extends Polygon {
	@observable apartment?: Apartment;
	@observable holes: Polygon[];

	constructor() {
		super({
			points: []
		});
		this.holes = [];
	}

	@computed
	get path() {
		let path = [];

		if (this.apartment) {
			path.push(this.apartment.path);
		}
		this.holes.forEach(hole => {
			path.push(hole.path);
		});
		return path.join(' ');
	}

	@computed
	get attributes() {
		return new Map([
			['d', this.path],
			['transform', `matrix(${this.matrix.join(',')})`],
			['fill', '#D0D0D0'],
			['fill-opacity', '0.5'],
			['fill-rule', 'evenodd']
		]);
	}

	@action
	setApartment(apartment: Apartment) {
		this.apartment = apartment;
	}

	@action
	addHole(hole: Polygon) {
		this.holes.push(hole);
	}

	@action
	removeHole(hole: Polygon) {
		delItem(this.holes, hole);
	}
}
