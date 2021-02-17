import React from 'react';
import { observer, inject } from 'mobx-react';
import { EditorStore } from '../Store/EditorStore';
import './Editor.scss';
import { RouteComponentProps } from 'react-router-dom';
import { Spinner } from '../Components/Spinner';
import { ToolsPanel } from './Views/ToolsPanel';
import { SidePanel } from './Views/SidePanel';
import { ToolsStore } from '../Store/ToolsStore';
import PolygonTool from './Tools/Polygon';
import { HistoryPanel } from './Views/HistoryPanel';

interface Props
	extends RouteComponentProps<{
		id?: string;
	}> {
	editorStore: EditorStore;
	toolsStore: ToolsStore;
}

@inject('editorStore', 'toolsStore')
@observer
export class Editor extends React.Component<Props> {
	editorRef: React.RefObject<HTMLDivElement>;

	constructor(props: Props) {
		super(props);
		this.editorRef = React.createRef();
	}

	async componentDidMount() {
		const { editorStore, toolsStore } = this.props;

		const imageId = this.props.match.params?.id;
		if (imageId) {
			editorStore.loadPlan(imageId);
		}

		const domElement = this.editorRef.current;
		if (domElement) {
			editorStore.initView(domElement);
		}

		toolsStore.setTool(PolygonTool);
	}

	render() {
		const { editorStore } = this.props;

		return (
			<div className="editor">
				<div className="editor__content">
					{editorStore.isLoading ? (
						<div className="editor__spinner-container">
							<Spinner />
						</div>
					) : (
						<div ref={this.editorRef} className="editor__main" />
					)}

					<ToolsPanel />
					{editorStore.project && <HistoryPanel />}
				</div>
				<div className="editor__panel">
					<SidePanel />
				</div>
			</div>
		);
	}
}
