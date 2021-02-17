import { Tool } from './Tool';
import { Room } from '../Objects/Room';
import { Apartment } from '../Objects/Apartment';
import { editorStore, toolsStore } from '../../Store';
import { reaction } from 'mobx';
import { MouseControllerEvent } from '../Controllers/MouseController';
import { AddPolygonPointCommand } from '../Commands/AddPolyPoint';
import { CreatePolygonCommand } from '../Commands/CreatePolygon';
import ArrowTool from './Arrow';
import { KeyControllerEvent } from '../Controllers/KeyController';

export class PolygonTool extends Tool {
	private disposers: (() => void)[] = [];
	private currentPolygon: Apartment | Room | null;

	onMouseDown = (e: MouseControllerEvent) => {
		if (this.currentPolygon && this.currentPolygon.points.length !== 1) {
			this.currentPolygon.removeLastPoint();
		}
		const { x, y } = editorStore.project.snapService.getCoordinates(e);

		if (this.currentPolygon) {
			// если клик по первой точке, то просто завершаем редактирование
			if (
				this.currentPolygon.points[0].x === x &&
				this.currentPolygon.points[0].y === y
			) {
				toolsStore.setTool(ArrowTool);
				return;
			}

			// здесь есть баг, т.к. в AddPolygon не передаётся новосозданный полигон при отменить всё - вернуть всё
			// видимо нужно сделать обращение по id и передавать id полигона
			// лиибо же никогда до конца не удалять полигон)
			// по крайней мере, пока command отменённый не будет выкинут из истории
			// выжно в dispose передать режим и 'redoStackCleared' чтобы если создавать новые режимы типа 'undoStackOverflow',
			// не появились баги
			editorStore.project.executeCommand(
				new AddPolygonPointCommand({
					point: { x, y },
					polygon: this.currentPolygon
				})
			);
		} else {
			this.currentPolygon = editorStore.project.executeCommand(
				new CreatePolygonCommand({
					point: { x: e.x, y: e.y },
					drawType: toolsStore.drawType
				})
			);
		}
		this.currentPolygon?.addPoint({ x: e.x, y: e.y });
	};

	onMouseMove = (e: MouseControllerEvent) => {
		if (!this.currentPolygon) {
			return;
		}

		const pointIndex = this.currentPolygon.points.length - 1;
		const { x, y } = editorStore.project.snapService.getCoordinates(
			e,
			this.currentPolygon.points[pointIndex]
		);

		this.currentPolygon.setPoint(pointIndex, {
			x,
			y
		});
	};

	onKeyDown = (e: KeyControllerEvent) => {
		if (e.key === 'Enter' || e.key === 'Escape') {
			if (this.currentPolygon) {
				this.currentPolygon.removeLastPoint();
				toolsStore.setTool(ArrowTool);
			}
		}
	};

	init() {
		this.disposers.push(
			reaction(
				() => toolsStore.drawType,
				() => {
					editorStore.project.hideControls();
					this.currentPolygon = null;
				}
			)
		);
	}

	destruct(tool: Tool) {
		const currentPolygon = this.currentPolygon;
		editorStore.project.hideControls();
		this.currentPolygon = null;

		this.disposers.forEach(disposer => {
			disposer();
		});
		this.disposers = [];

		if (tool === ArrowTool && currentPolygon) {
			editorStore.project.showControlsOf(currentPolygon, true);
		}
	}
}

export default new PolygonTool();
