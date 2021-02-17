import { Opening } from '../Opening';
import { Project } from '../../Project';
import { Group } from '../../../Drawing/Group';
import { ControlPoint } from '../../../Drawing/Controls/ControlPoint';
import { observable, autorun, computed, action } from 'mobx';
import { Path } from '../../../Drawing/Path';
import { Point } from '../../../Drawing/Geometry/Point';
import { findWalls } from '../../Tools/Opening';

interface IOpeningControlsProps {
	element: Opening;
	project: Project;
}

export class OpeningControls extends Group {
	private opening: Opening;
	private project: Project;
	private controlPath: Path;
	private controlPointStart: ControlPoint;
	private controlPointEnd: ControlPoint;
	@observable interactive: boolean = false;

	constructor(props: IOpeningControlsProps) {
		super();
		this.opening = props.element;
		this.project = props.project;
		this.controlPath = new Path({ path: '' });
		this.controlPath.setStyle('fill', 'none');
		this.controlPath.setStyle('stroke', '#6C0FD9');

		this.controlPointStart = new ControlPoint();
		this.controlPointEnd = new ControlPoint();
		this.controlPointStart.setMouseDownListener(() =>
			this.onControlPointDown('start')
		);
		this.controlPointEnd.setMouseDownListener(() =>
			this.onControlPointDown('end')
		);
		this.disposers.push(
			autorun(() => {
				this.controlPath.setPath(this.opening.path);
				this.controlPointStart.setPosition(
					this.opening.startPoint.x,
					this.opening.startPoint.y
				);
				this.controlPointEnd.setPosition(
					this.opening.endPoint.x,
					this.opening.endPoint.y
				);
			}),
			autorun(() => {
				const zoom = this.project.viewModel.zoom;
				this.controlPath.setStyle('stroke-width', String(1 / zoom));
				this.controlPointStart.setZoom(zoom);
				this.controlPointEnd.setZoom(zoom);
			})
		);
	}

	@computed
	get children() {
		return [this.controlPath, this.controlPointStart, this.controlPointEnd];
	}

	@action
	setInteractive(value: boolean) {
		this.interactive = value;
	}

	@action
	private onControlPointDown(type: 'start' | 'end') {
		if (!this.interactive) {
			return;
		}

		const onMouseMove = (e: MouseEvent) => {
			const event = this.project.mouseController.toMouseControllerEvent(e);
			const point = new Point(event.x, event.y); // .projectOnLine(this.opening.axis);
			if (type === 'start') {
				this.opening.setStartPoint(point);
			} else {
				this.opening.setEndPoint(point);
			}

			if (type === 'end' && this.opening.supportMultipleWalls) {
				const { wall1, wall2, ring1, ring2 } = findWalls(
					point,
					this.opening.rings.slice()
				);
				if (wall1 && wall2 && ring1 && ring2) {
					this.opening.setLastWall([wall1, wall2]);
				}
			}
		};
		const onMouseUp = () => {
			window.removeEventListener('mousemove', onMouseMove);
			window.removeEventListener('mouseup', onMouseUp);
		};
		window.addEventListener('mousemove', onMouseMove);
		window.addEventListener('mouseup', onMouseUp);
	}
}
