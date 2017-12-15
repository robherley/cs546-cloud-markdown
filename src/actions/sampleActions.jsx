import * as types from './actionTypes';
import axios from 'axios';

export function loadSampleSuccess(sample) {
	return { type: types.LOAD_SAMPLE_SUCCESS, payload: sample };
}

export function loadSampleData() {
	return dispatch => {
		return axios
			.get('/api/sample')
			.then(response => {
				dispatch(loadSampleSuccess(response.data));
			})
			.catch(error => {
				throw error;
			});
	};
}
