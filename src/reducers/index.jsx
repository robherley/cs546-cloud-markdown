import { combineReducers } from 'redux';
import editor from './editorReducer';
import isFetching from './fetchingReducer';
import width from './widthReducer';
import user from './userReducer';

const rootReducer = combineReducers({
	isFetching,
	editor,
	width,
	user
});

export default rootReducer;
