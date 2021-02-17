import { Opening, IOpeningProps } from './Opening';
import { computed, observable } from 'mobx';

interface IDoorProps extends IOpeningProps {
	doorType: string;
}

export class Door extends Opening {
	supportMultipleWalls = false;

	@observable doorType: string;
	constructor(props: IDoorProps) {
		super({
			type: 'door',
			...props
		});
		this.doorType = props.doorType;
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
	get doorPoints() {
		if (!this.sidePoints) {
			return [];
		}

		const { startAt1, startAt2, endAt1, endAt2 } = this.sidePoints;

		let baseCorner, baseAuxiliary, dirAuxiliary;
		if (this.doorType === 'swingLt') {
			baseCorner = startAt2;
			baseAuxiliary = endAt2;
			dirAuxiliary = startAt1;
		} else if (this.doorType === 'swingLb') {
			baseCorner = startAt1;
			baseAuxiliary = endAt1;
			dirAuxiliary = startAt2;
		} else if (this.doorType === 'swingRt') {
			baseCorner = endAt2;
			baseAuxiliary = startAt2;
			dirAuxiliary = endAt1;
		} else if (this.doorType === 'swingRb') {
			baseCorner = endAt1;
			baseAuxiliary = startAt1;
			dirAuxiliary = endAt2;
		} else {
			return [];
		}

		// number params
		const thickness = startAt2.sub(startAt1).length() / 10;
		const len = baseAuxiliary.sub(baseCorner).length();

		// 2 directions
		const baseDirection = baseAuxiliary.sub(baseCorner).normalize();
		const dirDirection = dirAuxiliary.sub(baseCorner).normalize();

		// points
		const p1 = baseCorner;
		const p2 = baseCorner.sub(dirDirection.mul(len));
		const p3 = p2.add(baseDirection.mul(thickness));
		const p4 = p1.add(baseDirection.mul(thickness));

		return [p1, p2, p3, p4];
	}

	@computed
	get path() {
		if (!this.sidePoints) {
			return '';
		}

		const { startAt1, startAt2, endAt1, endAt2 } = this.sidePoints;
		const [door1, door2, door3, door4] = this.doorPoints;

		return [
			`M${endAt1.x},${endAt1.y}`,
			`L${endAt2.x},${endAt2.y}`,
			`L${startAt2.x},${startAt2.y}`,
			`L${startAt1.x},${startAt1.y}`,
			`Z`,
			`M${door1.x},${door1.y}`,
			`L${door2.x},${door2.y}`,
			`L${door3.x},${door3.y}`,
			`L${door4.x},${door4.y}`
		].join(' ');
	}

	toJSON() {
		return {
			...Opening.prototype.toJSON.call(this),
			doorType: this.doorType
		};
	}
}
