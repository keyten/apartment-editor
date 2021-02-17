import React from 'react';
import { observer, inject } from 'mobx-react';
import { Button } from '../../../Components/Button';
import { ToolsStore } from '../../../Store/ToolsStore';
import './PolygonPanel.scss';

@inject('toolsStore')
@observer
export class PolygonPanel extends React.Component<{
	toolsStore?: ToolsStore;
}> {
	setDrawTypeApartment = () => this.props?.toolsStore?.setDrawType('apartment');
	setDrawTypeRoom = () => this.props?.toolsStore?.setDrawType('room');

	render() {
		const { toolsStore } = this.props;

		return (
			<div className="polygon-panel">
				<Button
					onClick={this.setDrawTypeApartment}
					active={toolsStore?.drawType === 'apartment'}
				>
					Квартира
				</Button>
				<Button
					onClick={this.setDrawTypeRoom}
					active={toolsStore?.drawType === 'room'}
				>
					Комната
				</Button>
			</div>
		);
	}
}
