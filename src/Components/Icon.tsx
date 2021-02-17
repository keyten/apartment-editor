import React from 'react';
import { icons, IconTypes } from './IconsSVG';

export class Icon extends React.Component<{
	width: number;
	height: number;
	type: keyof IconTypes;
}> {
	render() {
		const { width, height, type } = this.props;
		return (
			<svg
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				width={width}
				height={height}
				viewBox={`0 0 ${width} ${height}`}
			>
				{icons[type]}
			</svg>
		);
	}
}
