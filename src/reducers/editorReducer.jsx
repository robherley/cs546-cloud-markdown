import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function editorReducer(state = initialState.editor, action) {
	let newState = { ...state };
	switch (action.type) {
		case types.CHANGE_EDITOR_CONTENT:
			newState.content = action.payload;
			return newState;
		case types.CHANGE_CSS_CONTENT:
			newState.css = action.payload;
			return newState;
		default:
			return state;
	}
}
