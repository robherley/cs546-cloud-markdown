import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const middleware =
	process.env.NODE_ENV === 'production'
		? applyMiddleware(thunk)
		: applyMiddleware(thunk, reduxImmutableStateInvariant(), logger);

export default function configureStore(initialState) {
	return createStore(rootReducer, initialState, middleware);
}
