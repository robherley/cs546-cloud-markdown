import * as types from './actionTypes';
import axios from 'axios';

export function changeWidth(newWidth) {
	return { type: types.CHANGE_WIDTH, payload: newWidth };
}
