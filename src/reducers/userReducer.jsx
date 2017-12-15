import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.user, action) {
	switch (action.type) {
		case types.LOAD_USER_INFO:
			return { ...state, about: action.payload };
		case types.LOAD_USER_FILES:
			return { ...state, fileList: action.payload };
		default:
			return state;
	}
}
