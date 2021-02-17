import React from 'react';
import { observer, inject } from 'mobx-react';
import { Button } from '../../../Components/Button';
import { ToolsStore } from '../../../Store/ToolsStore';
import './InteriorsPanel.scss';
import { Spinner } from '../../../Components/Spinner';

@inject('toolsStore')
@observer
export class InteriorsPanel extends React.Component<{
	toolsStore?: ToolsStore;
}> {
	async componentDidMount() {
		const { toolsStore } = this.props;

		if (toolsStore && toolsStore.interiors === null) {
			toolsStore.loadInteriors();
		}
	}

	render() {
		const { toolsStore } = this.props;

		if (!toolsStore || !toolsStore.interiors || toolsStore.isInteriorsLoading) {
			return (
				<div className="interiors-panel interiors-panel_loading">
					<Spinner />
				</div>
			);
		}

		return (
			<div className="interiors-panel">
				{toolsStore.interiors.map(interior => {
					return (
						<Button
							key={interior.id}
							active={toolsStore.selectedInterior?.id === interior.id}
							onClick={() => toolsStore.setSelectedInterior(interior)}
						>
							{interior.name}
						</Button>
					);
				})}
			</div>
		);
	}
}
