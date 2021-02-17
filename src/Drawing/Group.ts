import { observable, computed, autorun } from 'mobx';
import { SvgElement } from './SvgElement';
import { setAttr } from '../utils/svg';
import { ReactSVG } from 'react';

interface IGroupProps {
	tagName?: keyof ReactSVG;
	type?: string;
}

export class Group extends SvgElement {
	@observable elements: SvgElement[];
	constructor({ tagName = 'g', type = 'group' }: IGroupProps = {}) {
		super({ tagName, type });
		this.elements = [];
	}

	@computed
	get children(): SvgElement[] {
		return this.elements;
	}

	@computed
	get element(): SVGElement {
		if (!this.svgElement) {
			this.svgElement = document.createElementNS(
				'http://www.w3.org/2000/svg',
				this.tagName
			);
		}

		this.disposers.push(autorun(() => this.element));

		setAttr(this.svgElement, this.attributes);
		setChildren(this.svgElement, this.children);
		return this.svgElement;
	}
}

function setChildren(parent: SVGElement, children: SvgElement[]) {
	const domElements = parent.childNodes;
	children.forEach((child, i) => {
		if (child.element === domElements[i]) {
			return;
		}

		if (domElements.length < i + 1) {
			parent.appendChild(child.element);
		} else {
			parent.insertBefore(child.element, domElements[i]);
			parent.removeChild(domElements[i]);
		}
	}); // todo: remove old nodes!
	// while(lastItem(children).element.nextNode !== null) remove
}
