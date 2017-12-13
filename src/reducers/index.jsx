import { combineReducers } from 'redux';
import editor from './editorReducer';
import sample from './editorReducer';

const rootReducer = combineReducers({
	sample,
	editor
});

export default rootReducer;
