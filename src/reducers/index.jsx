import { combineReducers } from 'redux';
import editor from './editorReducer';
import sample from './sampleReducer';
import width from './widthReducer';

const rootReducer = combineReducers({
	sample,
	editor,
	width
});

export default rootReducer;
