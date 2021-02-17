import { action, observable } from 'mobx';
import { Tool } from '../Editor/Tools/Tool';
import { Interior } from '../types/Interiors';
import agent from '../agent';
import { SvgElement } from '../Drawing/SvgElement';

export type TDrawType = 'apartment' | 'room';
export type TDoorType = 'swingLt' | 'swingRt' | 'swingLb' | 'swingRb';
export class ToolsStore {
	@observable activeTool: Tool | null = null;
	@action setTool(tool: Tool) {
		if (this.activeTool) {
			this.activeTool.destruct(tool);
		}
		this.activeTool = tool;
		tool.init();
	}

	@observable drawType: TDrawType = 'apartment';
	@action setDrawType(type: TDrawType) {
		this.drawType = type;
	}

	@observable doorType: TDoorType = 'swingLt';
	@action setDoorType(type: TDoorType) {
		this.doorType = type;
	}

	@observable isInteriorsLoading: boolean = false;
	@observable interiors: Interior[] | null = null;
	@observable selectedInterior: Interior | null = null;

	loadInteriors = () => {
		this.isInteriorsLoading = true;

		return agent.Tools.getInteriors()
			.then(
				action(response => {
					this.interiors = response;
					this.selectedInterior = response[0];
				})
			)
			.catch(() => {
				console.warn('Interiors are not loaded');
			})
			.finally(
				action(() => {
					this.isInteriorsLoading = false;
				})
			);
	};

	@action setSelectedInterior(interior: Interior) {
		this.selectedInterior = interior;
	}

	@observable selectedElement: SvgElement | null = null;
	@action setSelectedElement(element: SvgElement | null) {
		this.selectedElement = element;
	}

	@observable areaFactor = 1;
	@action setAreaFactor(value: number) {
		this.areaFactor = value;
	}
}

export default new ToolsStore();
