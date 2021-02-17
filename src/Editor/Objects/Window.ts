import { Opening, IOpeningProps } from './Opening';
import { computed } from 'mobx';

export class Window extends Opening {
	supportMultipleWalls = true;

	constructor(props: IOpeningProps) {
		super({
			type: 'window',
			...props
		});
	}

	@computed
	get attributes() {
		return new Map([
			['d', this.path],
			['fill', 'rgba(224, 234, 243, 0.5)'],
			['stroke', 'black'],
			['stroke-opacity', '0.3']
		]);
	}
}
