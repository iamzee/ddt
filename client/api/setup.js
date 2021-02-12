import axios from 'axios';
import { getToken } from '../helpers/getToken';

export const create = async payload => {
	try {
		const { data } = await axios({
			method: 'POST',
			url: '/api/setups',
			headers: {
				Authorization: `Bearer ${getToken()}`,
				'Content-Type': 'application/json',
			},
			data: payload,
		});

		return data;
	} catch (e) {
		return e.response.data;
	}
};

export const list = async () => {
	try {
		const { data } = await axios({
			methos: 'GET',
			url: '/api/setups',
			headers: {
				Authorization: `Bearer ${getToken()}`,
			},
		});
		return data.setups;
	} catch (e) {
		return e.response.data;
	}
};

export const edit = async (setupId, payload) => {
	try {
		const { data } = await axios({
			method: 'PATCH',
			url: `/api/setups/${setupId}`,
			data: payload,
			headers: {
				Authorization: `Bearer ${getToken()}`,
				'Content-Type': 'application/json',
			},
		});

		return data.setup;
	} catch (e) {}
};
