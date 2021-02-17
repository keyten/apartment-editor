import { Polygon, IPolygonProps } from '../../Drawing/Polygon';
import { computed, autorun, observable } from 'mobx';
import { Apartment } from './Apartment';
import { Text } from '../../Drawing/Text';
import {
	getPolygonCentroid,
	getPolygonArea
} from '../../Drawing/Geometry/Polygon';
import { toolsStore } from '../../Store';

interface IRoomProps extends IPolygonProps {
	apartment: Apartment;
	name?: string;
}

export class Room extends Polygon {
	apartment: Apartment;
	label: Text;
	@observable name: string;

	constructor(props: IRoomProps) {
		super({
			type: 'room',
			...props
		});
		this.apartment = props.apartment;
		this.name = props.name || 'Новая комната';
		this.label = new Text({ text: [] });
		this.label.setStyle('font-size', '1em');
		this.label.setStyle('font-weight', 'bold');
		this.label.setStyle('style', 'user-select: none');
		this.addDisposer(
			autorun(() => {
				const point = getPolygonCentroid(this.points);
				this.label.setPosition(point.x, point.y);
			})
		);
		this.disposers.push(
			() => this.label.remove(),
			autorun(() => {
				const area = Math.abs(getPolygonArea(this.points) / 1000);
				if (area < 0.1) {
					this.label.setStyle('fill', 'none');
				} else {
					if (toolsStore?.areaFactor) {
						this.label.setStyle('fill', 'black');
						const strArea = (area * toolsStore?.areaFactor).toFixed(2);
						this.label.setText([this.name, strArea]);
					}
				}
			})
		);
	}

	@computed
	get attributes() {
		return new Map([
			['d', this.path],
			['fill', 'rgba(255, 255, 255, 0.1)'],
			['stroke', '#FF7B52'],
			['stroke-width', '1']
		]);
	}

	toJSON() {
		return {
			...Polygon.prototype.toJSON.call(this),
			apartment: this.apartment.id,
			name: this.name
		};
	}
}
