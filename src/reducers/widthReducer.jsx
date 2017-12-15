import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function editorReducer(state = initialState.width, action) {
	switch (action.type) {
		case types.CHANGE_WIDTH:
			return action.payload;
		default:
			return state;
	}
}
