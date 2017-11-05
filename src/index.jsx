import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

// React Router
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

// Components
import App from './components/App';
import HomePage from './components/home/HomePage';
import TestPage from './components/test/TestPage';
import AboutPage from './components/about/AboutPage';

// Styling (thinking sass too)
import './styles/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App>
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route path="/test" component={TestPage} />
					<Route path="/about" component={AboutPage} />
				</Switch>
			</App>
		</BrowserRouter>
	</Provider>,
	document.getElementById('app')
);
