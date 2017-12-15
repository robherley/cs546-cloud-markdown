import * as types from './actionTypes';
import axios from 'axios';

export function start() {
	return { type: types.START_FETCHING };
}

export function done() {
	return { type: types.DONE_FETCHING };
}

export function error(error) {
	return { type: types.ERROR_FETCHING, payload: error };
}
