import * as types from './actionTypes';
import * as fetching from './fetchingActions';
import axios from 'axios';

export function loadUserFiles() {
	return dispatch => {
		return axios
			.get('/api/v1/user/getfiles')
			.then(res => {
				dispatch({
					type: types.LOAD_USER_FILES,
					payload: res.data.files
				});
			})
			.catch(error => {
				dispatch(fetching.error(error));
			});
	};
}

export function loadUserInfo() {
	return dispatch => {
		return axios
			.get('/api/v1/user/about')
			.then(res => {
				dispatch({
					type: types.LOAD_USER_INFO,
					payload: res.data
				});
			})
			.catch(error => {
				dispatch(fetching.error(error));
			});
	};
}
