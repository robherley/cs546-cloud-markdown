import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function fetchingReducer(
	state = initialState.isFetching,
	action
) {
	switch (action.type) {
		case types.DONE_FETCHING:
			return { ...state, status: false };
		case types.START_FETCHING:
			return { ...state, status: true };
		case types.ERROR_FETCHING:
			return { ...state, error: action.payload };
		default:
			return state;
	}
}
