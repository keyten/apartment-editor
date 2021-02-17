import { MouseControllerEvent } from '../Controllers/MouseController';
import { KeyControllerEvent } from '../Controllers/KeyController';

export class Tool {
	init() {}
	destruct(newTool: Tool) {}
	onMouseDown(e: MouseControllerEvent) {}
	onMouseUp(e: MouseControllerEvent) {}
	onMouseDrag(e: MouseControllerEvent) {}
	onMouseMove(e: MouseControllerEvent) {}
	onKeyDown(e: KeyControllerEvent) {}
	onKeypress(e: KeyControllerEvent) {}
	onKeyUp(e: KeyControllerEvent) {}
}
