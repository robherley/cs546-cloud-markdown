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
import ReduxPage from './components/redux/ReduxPage';
import AboutPage from './components/about/AboutPage';

// Styling (thinking sass too)
import './styles/styles.scss';

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App>
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route path="/redux" component={ReduxPage} />
					<Route path="/about" component={AboutPage} />
				</Switch>
			</App>
		</BrowserRouter>
	</Provider>,
	document.getElementById('app')
);
