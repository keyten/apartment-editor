import React from 'react';
import { observer, inject } from 'mobx-react';
import { ToolsStore } from '../../Store/ToolsStore';
import { Tool } from '../Tools/Tool';
import ArrowTool from '../Tools/Arrow';
import PolygonTool from '../Tools/Polygon';
import DoorTool from '../Tools/Door';
import InteriorsTool from '../Tools/Interiors';
import { ArrowPanel } from './ToolsPanels/ArrowPanel';
import { PolygonPanel } from './ToolsPanels/PolygonPanel';
import { DoorPanel } from './ToolsPanels/DoorPanel';
import { InteriorsPanel } from './ToolsPanels/InteriorsPanel';
import { Button } from '../../Components/Button';
import { EditorStore } from '../../Store/EditorStore';

const components = new Map<Tool, any>([
	[ArrowTool, ArrowPanel],
	[PolygonTool, PolygonPanel],
	[DoorTool, DoorPanel],
	[InteriorsTool, InteriorsPanel]
]);

@inject('toolsStore', 'editorStore')
@observer
export class SidePanel extends React.Component<{
	toolsStore?: ToolsStore;
	editorStore?: EditorStore;
}> {
	onSaveClick = () => this.props.editorStore?.project.save();

	renderPanel() {
		const { toolsStore } = this.props;
		const activeTool = toolsStore?.activeTool;

		if (!activeTool) {
			return <div className="editor__side">Выберите инструмент</div>;
		}

		const Panel = components.get(activeTool);
		if (!Panel) {
			return <div />;
		}

		return <Panel />;
	}

	render() {
		return (
			<div className="editor__side">
				{this.renderPanel()}
				<div style={{ marginTop: '30px', padding: '0 30px' }}>
					<Button onClick={this.onSaveClick}>Сохранить</Button>
				</div>
			</div>
		);
	}
}
