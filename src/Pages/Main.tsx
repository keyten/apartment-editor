import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

@observer
export class Main extends Component {
	static propTypes = {};
	static defaultProps = {};

	render() {
		return (
			<div>
				<ol>
					<Link to="/editor">
						<li>Editor</li>
					</Link>
					<Link to="/test">
						<li>Test</li>
					</Link>
				</ol>
			</div>
		);
	}
}
