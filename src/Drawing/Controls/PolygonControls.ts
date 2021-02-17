import { observable, computed, action, autorun } from 'mobx';
import { Polygon } from '../Polygon';
import { Project } from '../../Editor/Project';
import { Group } from '../Group';
import { ControlPoint } from './ControlPoint';

interface IPolygonControlsProps {
	element: Polygon;
	project: Project;
}

export class PolygonControls extends Group {
	private polygon: Polygon;
	private project: Project;
	private controlPath: Polygon;
	@observable private controlPoints: ControlPoint[];
	@observable interactive: boolean = false;

	constructor(props: IPolygonControlsProps) {
		super();
		this.polygon = props.element;
		this.project = props.project;
		this.controlPath = new Polygon({ points: [] });
		this.controlPath.setStyle('fill', 'none');
		this.controlPath.setStyle('stroke', '#6C0FD9');

		this.controlPoints = [];
		this.disposers.push(
			autorun(() => {
				this.controlPath.setPoints(this.polygon.points);
				this.polygon.points.forEach((point, i) => {
					if (this.controlPoints.length < i + 1) {
						const point = new ControlPoint();
						point.setMouseDownListener(e => this.onControlPointDown(e, i));
						point.setDblClickListener(e => this.onControlPointDblClick(e, i));
						this.setControlPoint(i, point);
					}
					this.controlPoints[i].setPosition(point.x, point.y);
				});
				while (this.controlPoints.length > this.polygon.points.length) {
					this.removeLastControlPoint();
				}
			}),
			autorun(() => {
				const zoom = this.project.viewModel.zoom;
				this.controlPoints.forEach(point => point.setZoom(zoom));
				this.controlPath.setStyle('stroke-width', String(1 / zoom));
			})
		);
	}

	@computed
	get children() {
		return [this.controlPath, ...this.controlPoints];
	}

	@action
	setInteractive(value: boolean) {
		this.interactive = value;
	}

	@action
	private setControlPoint(i: number, value: ControlPoint) {
		this.controlPoints[i] = value;
	}

	@action
	private removeLastControlPoint() {
		this.controlPoints.pop()?.remove();
	}

	private onControlPointDown(e: MouseEvent, pointIndex: number) {
		if (!this.interactive) {
			return;
		}
		const mouseDownEvent = this.project.mouseController.toMouseControllerEvent(
			e
		);

		const onMouseMove = (e: MouseEvent) => {
			const event = this.project.mouseController.toMouseControllerEvent(e);
			let { x, y } = this.project.snapService.getCoordinates(
				event,
				this.polygon.points[pointIndex]
			);
			if (event.shiftKey) {
				if (
					Math.abs(mouseDownEvent.x - event.x) <
					Math.abs(mouseDownEvent.y - event.y)
				) {
					x = mouseDownEvent.x;
				} else {
					y = mouseDownEvent.y;
				}
			}
			this.polygon.setPoint(pointIndex, { x, y });
		};
		const onMouseUp = () => {
			window.removeEventListener('mousemove', onMouseMove);
			window.removeEventListener('mouseup', onMouseUp);
		};
		window.addEventListener('mousemove', onMouseMove);
		window.addEventListener('mouseup', onMouseUp);
	}

	private onControlPointDblClick(e: MouseEvent, pointIndex: number) {
		if (!this.interactive) {
			return;
		}

		this.polygon.removePoint(pointIndex);
		if (this.polygon.points.length === 0) {
			this.polygon.remove();
		}
	}
}
