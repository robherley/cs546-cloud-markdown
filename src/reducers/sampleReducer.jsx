import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function sampleReducer(state = initialState.sample, action) {
	switch (action.type) {
		case types.LOAD_SAMPLE_SUCCESS:
			return action.payload;
		default:
			return state;
	}
}
