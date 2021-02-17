import React from 'react';
import cl from 'classnames';
import { Icon } from './Icon';
import { IconTypes } from './IconsSVG';
import './Button.scss';

const iconSizeForButtonSize = {
	s: 0,
	m: 21,
	b: 25
};

export class Button extends React.Component<{
	className?: string;
	size?: 's' | 'm' | 'b';
	theme?: 'default' | 'primary';
	active?: boolean;
	icon?: keyof IconTypes;
	onClick?: () => void;
}> {
	render() {
		const {
			className,
			size = 'm',
			theme = 'default',
			active = false,
			icon,
			children,
			onClick
		} = this.props;

		return (
			<div
				className={cl(
					'button',
					'button_size_' + size,
					'button_theme_' + theme,
					active && 'button_active',
					className
				)}
				onClick={onClick}
			>
				{icon && (
					<Icon
						type={icon}
						width={iconSizeForButtonSize[size]}
						height={iconSizeForButtonSize[size]}
					/>
				)}
				{children}
			</div>
		);
	}
}
