import React from 'react';
import { observer, inject } from 'mobx-react';
import { Button } from '../../Components/Button';
import { ToolsStore } from '../../Store/ToolsStore';
import PolygonTool from '../Tools/Polygon';
import RectTool from '../Tools/Rect';
import WindowTool from '../Tools/Window';
import HandTool from '../Tools/Hand';
import DoorTool from '../Tools/Door';
import BalconyDoorTool from '../Tools/BalconyDoor';
import InteriorsTool from '../Tools/Interiors';
import TransformTool from '../Tools/TransformTool';
import ArrowTool from '../Tools/Arrow';

@inject('toolsStore')
@observer
export class ToolsPanel extends React.Component<{
	toolsStore?: ToolsStore;
}> {
	selectArrow = () => this.props.toolsStore?.setTool(ArrowTool);
	selectPolygon = () => this.props.toolsStore?.setTool(PolygonTool);
	selectRect = () => this.props.toolsStore?.setTool(RectTool);
	selectWindow = () => this.props.toolsStore?.setTool(WindowTool);
	selectDoor = () => this.props.toolsStore?.setTool(DoorTool);
	selectBalconyDoor = () => this.props.toolsStore?.setTool(BalconyDoorTool);
	selectInteriors = () => this.props.toolsStore?.setTool(InteriorsTool);
	selectTransform = () => this.props.toolsStore?.setTool(TransformTool);
	selectHand = () => this.props.toolsStore?.setTool(HandTool);

	render() {
		const { toolsStore } = this.props;

		return (
			<div className="editor__tools">
				<Button
					size="b"
					icon="selectTool"
					active={toolsStore?.activeTool === ArrowTool}
					onClick={this.selectArrow}
				/>
				<Button
					size="b"
					icon="directTool"
					active={toolsStore?.activeTool === PolygonTool}
					onClick={this.selectPolygon}
				/>
				<Button
					size="b"
					icon="rectTool"
					active={toolsStore?.activeTool === RectTool}
					onClick={this.selectRect}
				/>
				<Button
					size="b"
					icon="windowTool"
					active={toolsStore?.activeTool === WindowTool}
					onClick={this.selectWindow}
				/>
				<Button
					size="b"
					icon="doorTool"
					active={toolsStore?.activeTool === DoorTool}
					onClick={this.selectDoor}
				/>
				<Button
					size="b"
					icon="balconyDoorTool"
					active={toolsStore?.activeTool === BalconyDoorTool}
					onClick={this.selectBalconyDoor}
				/>
				<Button
					size="b"
					icon="interiorsTool"
					active={toolsStore?.activeTool === InteriorsTool}
					onClick={this.selectInteriors}
				/>
				<Button size="b" icon="adjustmentTool" />
				<Button
					size="b"
					icon="handTool"
					active={toolsStore?.activeTool === TransformTool}
					onClick={this.selectTransform}
				/>
				<Button
					size="b"
					icon="handTool"
					active={toolsStore?.activeTool === HandTool}
					onClick={this.selectHand}
				/>
			</div>
		);
	}
}
