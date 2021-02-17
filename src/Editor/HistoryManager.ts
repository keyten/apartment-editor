import { Project } from './Project';
import { Command } from './Commands/Command';
import { observable, computed, action } from 'mobx';

export class HistoryManager {
	private project: Project;
	@observable private undoStack: Command<any, any>[];
	@observable private redoStack: Command<any, any>[];

	constructor(project: Project) {
		this.project = project;
		this.undoStack = [];
		this.redoStack = [];
	}

	@action
	execute<A, B>(command: Command<A, B>): A {
		this.undoStack.push(command);
		this.redoStack = [];
		return command.execute(this.project, 'initial');
	}

	@action
	undo() {
		const command = this.undoStack.pop();
		if (command) {
			this.redoStack.push(command);
			return command.undo(this.project);
		}
	}

	@action
	redo() {
		const command = this.redoStack.pop();
		if (command) {
			this.undoStack.push(command);
			return command.execute(this.project, 'redo');
		}
	}

	@computed
	get isUndoStackEmpty() {
		return this.undoStack.length === 0;
	}

	@computed
	get isRedoStackEmpty() {
		return this.redoStack.length === 0;
	}
}
