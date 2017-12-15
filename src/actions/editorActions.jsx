import * as types from './actionTypes';
import axios from 'axios';

export function updateContent(content) {
	return { type: types.CHANGE_EDITOR_CONTENT, payload: content };
}

export function updateCSS(css) {
	return { type: types.CHANGE_EDITOR_CSS, payload: css };
}

export function updateFileName(file) {
	return { type: types.CHANGE_EDITOR_FILENAME, payload: file };
}
