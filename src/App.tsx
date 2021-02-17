import React from 'react';
import { Provider } from 'mobx-react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Editor } from './Editor/Editor';
import { Main } from './Pages/Main';
import './assets/scss/styles.scss';

import { editorStore, toolsStore } from './Store';
import { NotFoundPage } from './Pages/NotFoundPage';

const stores = {
	//	planStore,
	editorStore,
	//	userStore,
	toolsStore
};

const App: React.FC = () => {
	return (
		<Provider {...stores}>
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Main} />
					<Route exact path="/editor/:id" component={Editor} />
					<Route exact path="/404" component={NotFoundPage} />
				</Switch>
			</BrowserRouter>
		</Provider>
	);
};

export default App;
