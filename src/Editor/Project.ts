import { SvgDrawer } from '../Drawing/SvgDrawer';
import { Layer } from '../Drawing/Layer';
import { MouseController } from './Controllers/MouseController';
import { SvgElement } from '../Drawing/SvgElement';
import { Apartment } from './Objects/Apartment';
import { observable, reaction, action } from 'mobx';
import { Room } from './Objects/Room';
import { KeyController } from './Controllers/KeyController';
import { HistoryManager } from './HistoryManager';
import { SnapService } from './Services/SnapService';
import { Command } from './Commands/Command';
import { Opening } from './Objects/Opening';
import { delItem } from '../utils/array';
import { editorStore } from '../Store';
import Export from './IO/Export';
import Import from './IO/Import';
import { Point } from '../Drawing/Geometry/Point';
import { Matrix } from '../Drawing/Geometry/Matrix';

export class Project {
	private mapElements: Map<Element, SvgElement>; // todo: удалять элементы отсюда при удалении
	historyManager: HistoryManager;
	mouseController: MouseController;
	keyController: KeyController;
	snapService: SnapService;
	readonly viewModel: SvgDrawer;
	@observable apartments: Apartment[];
	@observable rooms: Room[];
	@observable objects: SvgElement[];
	@observable selected: SvgElement | null = null;

	constructor() {
		this.viewModel = new SvgDrawer({ name: 'layout' });
		this.viewModel.addLayer(new Layer('background'));
		this.viewModel.addLayer(new Layer('drawing'));
		this.viewModel.addLayer(new Layer('controls'));
		this.viewModel.setCurrentLayer('drawing');
		this.apartments = [];
		this.rooms = [];
		this.objects = [];

		this.mapElements = new Map();
		this.historyManager = new HistoryManager(this);
		this.mouseController = new MouseController(this);
		this.keyController = new KeyController(this);
		this.snapService = new SnapService(this);

		reaction(
			() => this.selected,
			() => {
				// todo: нормально запускать remove у контролс
				// и чтоб с диспозерами
				this.viewModel.clearLayer('controls');

				if (this.selected && 'controlsClass' in this.selected) {
					const controls = new this.selected.controlsClass({
						element: this.selected,
						project: this
					});
					this.viewModel.add(controls, 'controls');
					controls.setInteractive(true);
				}
			}
		);
	}

	load(data: any) {
		Import.importJSON(this, data);
	}

	save() {
		editorStore.sendDataToServerDebounce(
			Export.exportAsJSON(this),
			Export.exportAsSVG(this)
		);
	}

	addObject(element: SvgElement) {
		this.viewModel.add(element);

		if (element instanceof Apartment) {
			this.viewModel.add(element.hatch);
			this.mapElements.set(element.hatch.element, element);
			this.apartments.push(element);
		} else if (element instanceof Room) {
			this.viewModel.add(element.label);
			this.mapElements.set(element.label.element, element);
			this.rooms.push(element);
			element.apartment.hatch.addHole(element);
		} else if (element instanceof Opening) {
			this.objects.push(element);
			element.apartment.hatch.addHole(element);
		}

		element.addDisposer(() => {
			this.removeElement(element);
		});
		this.mapElements.set(element.element, element);
	}

	removeElement(element: SvgElement) {
		this.mapElements.delete(element.element);
		if (element instanceof Apartment) {
			delItem(this.apartments, element);
			[...this.rooms, ...this.objects].forEach((object: any) => {
				if (object.apartment === element) {
					object.remove();
				}
			});
		} else if (element instanceof Room) {
			delItem(this.rooms, element);
			element.apartment.hatch.removeHole(element);
		} else if (element instanceof Opening) {
			element.apartment.hatch.removeHole(element);
		}
	}

	getElementByDom(element: Element) {
		return this.mapElements.get(element);
	}

	getBBoxOf(element: SvgElement, useTransform: boolean = true) {
		const svgElem = element.element as SVGGraphicsElement;
		const bbox = svgElem.getBBox();
		let lt = new Point(bbox.x, bbox.y);
		let rb = new Point(bbox.x + bbox.width, bbox.y + bbox.height);
		if (useTransform) {
			const matrix = new Matrix(element.matrix);
			lt = matrix.mul(lt);
			rb = matrix.mul(rb);
		}
		return {
			width: rb.x - lt.x,
			height: rb.y - lt.y,
			x1: lt.x,
			y1: lt.y,
			x2: rb.x,
			y2: rb.y
		};
		/* let {x, y, width, height} = elem.getBoundingClientRect();
		let x1 = x - offset.x;
		let y1 = y - offset.y;
		let x2 = x1 + width;
		let y2 = y1 + height; */
		//return {x1, y1, x2, y2};
	}

	@action
	showControlsOf(element: SvgElement, pointerEvents: boolean) {
		this.selected = element;
	}

	@action
	hideControls() {
		this.selected = null;
	}

	executeCommand<A, B>(command: Command<A, B>): A {
		return this.historyManager.execute(command);
	}

	undo() {
		return this.historyManager.undo();
	}

	redo() {
		return this.historyManager.redo();
	}

	zoom(value: number, point: { x: number; y: number }) {
		this.viewModel.setZoom(value, point);
	}
}
