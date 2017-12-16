import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function editorReducer(state = initialState.editor, action) {
	switch (action.type) {
		case types.CHANGE_EDITOR_CONTENT:
			return { ...state, content: action.payload };
		case types.CHANGE_EDITOR_CSS:
			return { ...state, css: action.payload };
		case types.CHANGE_EDITOR_FILENAME:
			return { ...state, file: action.payload };
		case types.SET_CURRENT_FILE:
			return { ...state, id: action.payload };
		case types.LOAD_FILE_SUCCESS:
			const { filename, content, style } = action.payload;
			return { ...state, file: filename, content, css: style };
		default:
			return state;
	}
}
