import { observable, computed, action, autorun } from 'mobx';
import { Group } from './Group';
import { TextSpan } from './TextSpan';

export interface ITextProps {
	text: string[];
	type?: string;
}

export class Text extends Group {
	@observable text: string[];
	@observable tspans: TextSpan[];

	constructor({ text, type = 'text' }: ITextProps) {
		super({
			tagName: 'text',
			type: type
		});

		this.tspans = [];
		this.disposers.push(
			autorun(() => {
				this.setTSpansLength(this.text.length);
				this.text.forEach((text, i) => {
					//	if (this.tspans.length < i + 1) {
					//		this.tspans[i] = new TextSpan({text});
					//	}
					this.tspans[i].setText(text);
				});
			})
		);
		this.text = text;
	}

	@computed
	get attributes() {
		const attrs = new Map(this.styles);
		attrs.set('transform', `matrix(${this.matrix.join(', ')})`);
		return attrs;
	}

	@computed
	get children() {
		return this.tspans;
	}

	@action
	setText(text: string[]) {
		this.text = text;
	}

	@action
	private setTSpansLength(count: number) {
		if (count > this.tspans.length) {
			for (let i = this.tspans.length; i < count; i++) {
				this.tspans[i] = new TextSpan({ text: '' });
			}
		} else if (count < this.tspans.length) {
			for (let i = count; i < this.tspans.length; i++) {
				this.tspans[i].remove();
			}
			this.tspans.length = count;
		}
	}
}
