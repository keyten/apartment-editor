import React from 'react';
import './NotFoundPage.scss';

interface INotFoundPageProps {}

export const NotFoundPage: React.FC<INotFoundPageProps> = () => {
	return (
		<div className="not-found-page">
			<h1 className="not-found-page__title">404</h1>
			<span className="not-found-page__subtitle">План не найден</span>
		</div>
	);
};
