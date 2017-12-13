import * as types from './actionTypes';
import axios from 'axios';

export function updateContent(content) {
	return { type: types.CHANGE_EDITOR_CONTENT, payload: content };
}

export function updateCSS(content) {
	return { type: types.CHANGE_EDITOR_CSS, payload: css };
}
