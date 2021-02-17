import React from 'react';
import { observer, inject } from 'mobx-react';
import { Button } from '../../../Components/Button';
import { ToolsStore } from '../../../Store/ToolsStore';

@inject('toolsStore')
@observer
export class RectPanel extends React.Component<{
	toolsStore?: ToolsStore;
}> {
	render() {
		const { toolsStore } = this.props;

		return <div></div>;
	}
}
