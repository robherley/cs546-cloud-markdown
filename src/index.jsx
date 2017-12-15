import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

// React Router
import { Route, Switch } from 'react-router';
import { HashRouter } from 'react-router-dom';

// Components
import App from './components/App';
import HomePage from './components/home/HomePage';
import Editor from './components/editor/Editor';

// Styling
import 'pivotal-ui/components.css';
import './styles/styles.scss';

const store = configureStore();

const NotFound = () => <div>404: How did you get here?</div>;

ReactDOM.render(
	<Provider store={store}>
		<HashRouter>
			<Switch>
				<Route
					exact
					path="/"
					render={() => <App children={<HomePage />} />}
				/>
				<Route
					exact
					path="/editor"
					render={() => <App children={<Editor />} />}
				/>
				<Route path="*" component={NotFound} />
			</Switch>
		</HashRouter>
	</Provider>,
	document.getElementById('app')
);
