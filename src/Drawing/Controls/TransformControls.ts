import { Group } from '../Group';
import { SvgElement } from '../SvgElement';
import { observable, computed, autorun } from 'mobx';
import { Polygon } from '../Polygon';
import { ControlPoint } from './ControlPoint';
import { Project } from '../../Editor/Project';
import { Point } from '../Geometry/Point';
import { Matrix } from '../Geometry/Matrix';
import { RotatePoint } from './RotatePoint';
import { MouseControllerEvent } from '../../Editor/Controllers/MouseController';
import { LineSegment } from '../Geometry/LineSegment';

interface ITransformControlsProps {
	element: SvgElement;
	project: Project;
}

export class TransformControls extends Group {
	private elem: SvgElement;
	private project: Project;
	@observable private controlBorder: Polygon;
	@observable private rotatePoints: RotatePoint[];
	@observable private controlPoints: ControlPoint[];

	constructor(props: ITransformControlsProps) {
		super();
		this.elem = props.element;
		this.project = props.project;

		this.controlBorder = new Polygon({
			points: []
		});
		this.controlBorder.setStyle('fill', 'transparent');
		this.controlBorder.setStyle('stroke', '#6C0FD9');
		this.controlBorder.element.addEventListener(
			'mousedown',
			this.onControlRectDown
		);

		this.rotatePoints = [
			new RotatePoint()
				.setCursor('nesw-resize')
				.setMouseDownListener(e => this.onRotatePointDown(e, 'lt')),
			new RotatePoint()
				.setCursor('nwse-resize')
				.setMouseDownListener(e => this.onRotatePointDown(e, 'rt')),
			new RotatePoint()
				.setCursor('nesw-resize')
				.setMouseDownListener(e => this.onRotatePointDown(e, 'rb')),
			new RotatePoint()
				.setCursor('nwse-resize')
				.setMouseDownListener(e => this.onRotatePointDown(e, 'lb'))
		];
		this.controlPoints = [
			new ControlPoint().setMouseDownListener(e =>
				this.onControlPointDown(e, 'lt')
			),
			new ControlPoint().setMouseDownListener(e =>
				this.onControlPointDown(e, 'rt')
			),
			new ControlPoint().setMouseDownListener(e =>
				this.onControlPointDown(e, 'rb')
			),
			new ControlPoint().setMouseDownListener(e =>
				this.onControlPointDown(e, 'lb')
			)
		];

		this.disposers.push(
			autorun(() => {
				const { lt, lb, rt, rb } = this.elem.tightBox;
				this.controlBorder.setPoints([lt, rt, rb, lb]);
				this.rotatePoints[0].setPosition(lt.x, lt.y);
				this.rotatePoints[1].setPosition(rt.x, rt.y);
				this.rotatePoints[2].setPosition(rb.x, rb.y);
				this.rotatePoints[3].setPosition(lb.x, lb.y);
				this.controlPoints[0].setPosition(lt.x, lt.y);
				this.controlPoints[1].setPosition(rt.x, rt.y);
				this.controlPoints[2].setPosition(rb.x, rb.y);
				this.controlPoints[3].setPosition(lb.x, lb.y);
			}),
			autorun(() => {
				const zoom = this.project.viewModel.zoom;
				this.controlPoints.forEach(point => point.setZoom(zoom));
				this.controlBorder.setStyle('stroke-width', String(1 / zoom));
			})
		);
	}

	@computed
	get children() {
		return [...this.rotatePoints, this.controlBorder, ...this.controlPoints];
	}

	private dragListener(listener: (e: MouseControllerEvent) => void) {
		const onMouseMove = (e: MouseEvent) => {
			const event = this.project.mouseController.toMouseControllerEvent(e);
			listener.call(this, event);
		};
		const onMouseUp = () => {
			window.removeEventListener('mousemove', onMouseMove);
			window.removeEventListener('mouseup', onMouseUp);
		};
		window.addEventListener('mousemove', onMouseMove);
		window.addEventListener('mouseup', onMouseUp);
	}

	private onRotatePointDown(e: MouseEvent, type: 'lt' | 'rt' | 'lb' | 'rb') {
		const oldRotation = this.elem.rotation;
		const box = this.elem.tightBox;
		const center = new Point(
			(box.lt.x + box.rb.x) / 2,
			(box.lt.y + box.rb.y) / 2
		);
		const corner = box[type];
		const direction = corner.sub(center).normalize();
		this.dragListener(event => {
			const newDirection = new Point(event.x, event.y).sub(center).normalize();
			const newAngle = newDirection.angle();
			const diff = direction.angle() - newAngle;
			let newSnappedAngle = this.project.snapService.getAngle(
				diff + oldRotation
			);

			const pivot = this.getElemCenter();
			const matrix = Matrix.rotate(newSnappedAngle, pivot);
			const { position } = matrix.decompose();
			this.elem.setRotation(newSnappedAngle);
			this.elem.setRotationOffset(position.x, position.y);
		});
	}

	private getElemCenter() {
		const bbox = this.project.getBBoxOf(this.elem, false);
		const initialCenter = new Point(
			(bbox.x1 + bbox.x2) / 2,
			(bbox.y1 + bbox.y2) / 2
		);
		return initialCenter; //new Matrix(this.elem.matrix).mul(initialCenter);
	}

	private onControlRectDown = (e: MouseEvent) => {
		const mouseDownEvent = this.project.mouseController.toMouseControllerEvent(
			e
		);
		const oldPosition = this.elem.position;

		this.dragListener(event => {
			const diff = new Point(
				event.x - mouseDownEvent.x,
				event.y - mouseDownEvent.y
			);
			this.elem.setPosition(oldPosition.x + diff.x, oldPosition.y + diff.y);
		});
	};

	private onControlPointDown(e: MouseEvent, type: 'lt' | 'rt' | 'lb' | 'rb') {
		const oldScale = this.elem.scale;
		const oldPosition = this.elem.position;
		const bbox = this.project.getBBoxOf(this.elem, false);
		const tbox = this.elem.tightBox;
		const box = {
			left: new LineSegment(tbox.lt, tbox.lb),
			top: new LineSegment(tbox.lt, tbox.rt),
			right: new LineSegment(tbox.rt, tbox.rb),
			bottom: new LineSegment(tbox.lb, tbox.rb)
		};
		const initialWidth = box.top.length();
		const initialHeight = box.left.length();
		this.dragListener(event => {
			let newtbox = { ...tbox };
			if (type === 'rb') {
				newtbox.rb = new Point(event.x, event.y);
				newtbox.rt = newtbox.rb.projectOnLine(box.top);
				newtbox.lb = newtbox.rb.projectOnLine(box.left);
			} else if (type === 'rt') {
				newtbox.rt = new Point(event.x, event.y);
				newtbox.rb = newtbox.rt.projectOnLine(box.bottom);
				newtbox.lt = newtbox.rt.projectOnLine(box.left);
			} else if (type === 'lt') {
				newtbox.lt = new Point(event.x, event.y);
				newtbox.lb = newtbox.lt.projectOnLine(box.bottom);
				newtbox.rt = newtbox.lt.projectOnLine(box.right);
			} else {
				newtbox.lb = new Point(event.x, event.y);
				newtbox.lt = newtbox.lb.projectOnLine(box.top);
				newtbox.rb = newtbox.lb.projectOnLine(box.right);
			}
			const newWidth = newtbox.rt.sub(newtbox.lt).length();
			const newHeight = newtbox.rt.sub(newtbox.rb).length();
			const newScaleX = (newWidth / initialWidth) * oldScale.x;
			const newScaleY = (newHeight / initialHeight) * oldScale.y;
			const mt = event.shiftKey
				? Matrix.scale(
						Math.min(newScaleX, newScaleY),
						Math.min(newScaleX, newScaleY),
						{
							x: bbox.x1,
							y: bbox.y1
						}
				  )
				: Matrix.scale(newScaleX, newScaleY, {
						x: bbox.x1,
						y: bbox.y1
				  });
			const { scale, position } = mt.decompose();
			this.elem.setScale(scale.x, scale.y);
			this.elem.setScaleOffset(position.x, position.y);
			this.elem.setPosition(
				oldPosition.x + (newtbox.lt.x - tbox.lt.x),
				oldPosition.y + (newtbox.lt.y - tbox.lt.y)
			);
		});
	}
}
