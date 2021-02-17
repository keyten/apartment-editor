import React from 'react';
import cl from 'classnames';
import { observer, inject } from 'mobx-react';
import { Button } from '../../Components/Button';
import { EditorStore } from '../../Store/EditorStore';
import './HistoryPanel.scss';

@inject('editorStore')
@observer
export class HistoryPanel extends React.Component<{
	editorStore?: EditorStore;
}> {
	undo = () => this.props.editorStore?.project.undo();
	redo = () => this.props.editorStore?.project.redo();

	render() {
		return (
			<div className="editor__history history-panel">
				<Button
					size="m"
					icon="undo"
					onClick={this.undo}
					className={cl(
						'history-panel__undo',
						this.props.editorStore?.project?.historyManager.isUndoStackEmpty ===
							false && 'history-panel__undo_enabled'
					)}
				/>
				<Button
					size="m"
					icon="redo"
					onClick={this.redo}
					className={cl(
						'history-panel__redo',
						this.props.editorStore?.project?.historyManager.isRedoStackEmpty ===
							false && 'history-panel__redo_enabled'
					)}
				/>
			</div>
		);
	}
}
