import React from 'react';
import { observer, inject } from 'mobx-react';
import { Button } from '../../../Components/Button';
import { ToolsStore } from '../../../Store/ToolsStore';
import './DoorPanel.scss';

@inject('toolsStore')
@observer
export class DoorPanel extends React.Component<{
	toolsStore?: ToolsStore;
}> {
	setDoorTypeSwingLt = () => this.props?.toolsStore?.setDoorType('swingLt');
	setDoorTypeSwingLb = () => this.props?.toolsStore?.setDoorType('swingLb');
	setDoorTypeSwingRt = () => this.props?.toolsStore?.setDoorType('swingRt');
	setDoorTypeSwingRb = () => this.props?.toolsStore?.setDoorType('swingRb');

	render() {
		const { toolsStore } = this.props;

		return (
			<div className="door-panel">
				<Button
					onClick={this.setDoorTypeSwingLt}
					active={toolsStore?.doorType === 'swingLt'}
				>
					Swing LT
				</Button>
				<Button
					onClick={this.setDoorTypeSwingLb}
					active={toolsStore?.doorType === 'swingLb'}
				>
					Swing LB
				</Button>
				<Button
					onClick={this.setDoorTypeSwingRt}
					active={toolsStore?.doorType === 'swingRt'}
				>
					Swing RT
				</Button>
				<Button
					onClick={this.setDoorTypeSwingRb}
					active={toolsStore?.doorType === 'swingRb'}
				>
					Swing RB
				</Button>
			</div>
		);
	}
}
