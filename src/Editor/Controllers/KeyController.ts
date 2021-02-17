import { Project } from '../Project';
import ToolsStore from '../../Store/ToolsStore';

export interface KeyControllerEvent {
	key: string;
}

function eventKeyControllerEvent(e: KeyboardEvent, project: Project) {
	return {
		key: e.key
	};
}

export class KeyController {
	project: Project;

	constructor(project: Project) {
		this.project = project;

		window.addEventListener('keydown', this.onKeyDown);
		window.addEventListener('keypress', this.onKeypress);
		window.addEventListener('keyup', this.onKeyUp);
	}

	onKeyDown = (e: KeyboardEvent) => {
		if (ToolsStore.activeTool) {
			ToolsStore.activeTool.onKeyDown(eventKeyControllerEvent(e, this.project));
		}
	};

	onKeypress = (e: KeyboardEvent) => {
		if (ToolsStore.activeTool) {
			ToolsStore.activeTool.onKeypress(
				eventKeyControllerEvent(e, this.project)
			);
		}
	};

	onKeyUp = (e: KeyboardEvent) => {
		if (ToolsStore.activeTool) {
			ToolsStore.activeTool.onKeyUp(eventKeyControllerEvent(e, this.project));
		}
	};
}
