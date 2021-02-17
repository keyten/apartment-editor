import { Project } from '../Project';

export abstract class Command<ExecValue = void, UndoValue = ExecValue> {
	abstract execute(project: Project, type: 'initial' | 'redo'): ExecValue;
	abstract undo(project: Project): UndoValue;
}
