import * as types from './actionTypes';
import * as fetching from './fetchingActions';
import axios from 'axios';

const defaultStyle =
	'* {\n\tcolor: #f1f1f1; \n\tfont-family: sans-serif;\n}\n\nbody {\n\tpadding: 1em 2em; \n} \n\npre {\n\tpadding: 1em;\n\tbackground-color: rgba(255, 255, 255, 0.1);\n\tborder-radius: 4px;\n}\n\npre > code {\n\tbackground-color: rgba(255, 255, 255, 0);\n}\n\ncode {\n\tpadding: 0.5em;\n\tbackground-color: rgba(255, 255, 255, 0.1);\n\tborder-radius: 4px;\n}\t';

export function setFile(id) {
	return {
		type: types.SET_CURRENT_FILE,
		payload: id
	};
}

export function createFile(obj) {
	return dispatch => {
		return axios
			.post('/api/v1/file/new', {
				fileName: obj.name,
				content: '',
				style: obj.default ? defaultStyle : ''
			})
			.then(res => {
				dispatch({
					type: types.SET_CURRENT_FILE,
					payload: res.data.id
				});
			})
			.catch(error => {
				dispatch(fetching.error(error));
			});
	};
}

export function loadFile(id) {
	return dispatch => {
		return axios
			.post('/api/v1/file/load', {
				fileId: id
			})
			.then(res => {
				dispatch({
					type: types.LOAD_FILE_SUCCESS,
					payload: res.data
				});
			})
			.catch(error => {
				dispatch(fetching.error(error));
			});
	};
}
