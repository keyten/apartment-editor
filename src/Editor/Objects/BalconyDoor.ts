import { Opening, IOpeningProps } from './Opening';
import { computed, observable } from 'mobx';

interface IPoint {
	x: number;
	y: number;
}

interface BalconyDoorPart {
	type: 'window' | 'door';
	startPoint: IPoint;
	endPoint: IPoint;
}

type BalconyDoorTypes = 'wdw';
interface IBalconyDoorProps extends IOpeningProps {
	balconyDoorType: BalconyDoorTypes;
}

export class BalconyDoor extends Opening {
	supportMultipleWalls = false;

	@observable objects: BalconyDoorPart[];

	@observable doorType: string;
	constructor(props: IBalconyDoorProps) {
		super({
			type: 'balcony_door',
			...props
		});
	}

	@computed
	get attributes() {
		return new Map([
			['d', this.path],
			['fill', 'transparent'],
			['stroke', '#FF7B52'],
			['stroke-width', '1']
		]);
	}

	@computed
	get pathPoints() {
		const points: IPoint[] = [];
		if (!this.sidePoints) {
			return [];
		}

		const { startAt1, startAt2, endAt1, endAt2 } = this.sidePoints;

		if (this.walls.length === 1) {
			points.push(startAt1, startAt2);
			points.push(endAt2, endAt1);
		} else {
			points.push(startAt2, startAt1);
			this.walls.forEach((wall, i) => {
				if (i === this.walls.length - 1) {
					return;
				}
				points.push(wall[i % 2][this.isClockwise ? 'start' : 'end']);
			});
			points.push(
				...(this.walls.length % 2 === 1 ? [endAt1, endAt2] : [endAt2, endAt1])
			);
			this.walls
				.slice()
				.reverse()
				.forEach((wall, l) => {
					const i = this.walls.length - l;
					if (i === 0 || l === 0) {
						return;
					}
					points.push(wall[i % 2][this.isClockwise ? 'start' : 'end']);
				});
		}

		return points;
	}

	toJSON() {
		return {
			...Opening.prototype.toJSON.call(this)
		};
	}
}
