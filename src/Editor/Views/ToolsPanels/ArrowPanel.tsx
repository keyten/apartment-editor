import React from 'react';
import { autorun } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Button } from '../../../Components/Button';
import { ToolsStore } from '../../../Store/ToolsStore';
import { Room } from '../../Objects/Room';
import { getPolygonArea } from '../../../Drawing/Geometry/Polygon';
import './ArrowPanel.scss';

interface IArrowPanelProps {
	toolsStore?: ToolsStore;
}

interface IArrowPanelState {
	areaValue: null | string;
}

@inject('toolsStore')
@observer
export class ArrowPanel extends React.Component<
	IArrowPanelProps,
	IArrowPanelState
> {
	protected disposers: (() => void)[] = [];
	state: IArrowPanelState = {
		areaValue: null
	};

	private setAreaValue = (e: React.SyntheticEvent) => {
		this.setState({
			areaValue: (e.target as any).value
		});
	};

	componentDidMount() {
		const { toolsStore } = this.props;
		this.disposers.push(
			autorun(() => {
				const element = toolsStore?.selectedElement;
				if (!element || !(element instanceof Room) || !toolsStore?.areaFactor) {
					this.setState({ areaValue: null });
					return;
				}
				const areaValue = Math.abs(
					(getPolygonArea(element.points) / 1000) * toolsStore?.areaFactor
				).toFixed(2);
				this.setState({ areaValue });
			})
		);
	}

	componentWillUnmount() {
		this.disposers.forEach(disposer => disposer());
	}

	onAreaChange = () => {
		const { toolsStore } = this.props;
		const element = toolsStore?.selectedElement;
		if (!element || !(element instanceof Room) || !toolsStore?.areaFactor) {
			return;
		}
		const initialArea = Number(
			Math.abs(getPolygonArea(element.points) / 1000).toFixed(2)
		);
		const newArea = Number(this.state.areaValue);
		toolsStore.setAreaFactor(newArea / initialArea);
	};

	render() {
		if (this.state.areaValue === null) {
			return <div />;
		}

		return (
			<div className="arrow-panel">
				<div className="label">Площадь:</div>
				<input value={this.state.areaValue} onChange={this.setAreaValue} />
				<Button onClick={this.onAreaChange}>Применить</Button>
			</div>
		);
	}
}
