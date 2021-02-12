import axios from 'axios';
import { getToken } from '../helpers/getToken';

export const create = async payload => {
	try {
		const { data } = await axios({
			method: 'POST',
			url: '/api/trades',
			data: payload,
			headers: {
				Authorization: `Bearer ${getToken()}`,
				'Content-Type': 'application/json',
			},
		});

		console.log(data);
	} catch (e) {
		console.log('ERROR', e);
	}
};

export const list = async (page, date, setup, type) => {
	try {
		let url = `/api/trades?page=${page}`;
		if (date) {
			url += `&startDate=${date[0].format(
				'YYYY-MM-DD'
			)}&endDate=${date[1].format('YYYY-MM-DD')}`;
		}

		if (setup) {
			url += `&setup=${setup}`;
		}

		if (type) {
			url += `&type=${type}`;
		}

		const { data } = await axios({
			method: 'GET',
			url,
			headers: {
				Authorization: `Bearer ${getToken()}`,
			},
		});

		return data;
	} catch (e) {
		console.log('ERROR', e);
	}
};

export const read = async tradeId => {
	try {
		const { data } = await axios({
			method: 'GET',
			url: `/api/trades/${tradeId}`,
			headers: {
				Authorization: `Bearer ${getToken()}`,
			},
		});

		return data.trade;
	} catch (e) {
		console.log('ERROR', e);
	}
};

export const edit = async (tradeId, payload) => {
	try {
		const { data } = await axios({
			method: 'PATCH',
			url: `/api/trades/${tradeId}`,
			data: payload,
			headers: {
				Authorization: `Bearer ${getToken()}`,
				'Content-Type': 'application/json',
			},
		});
	} catch (e) {
		console.log('ERROR', e.message);
	}
};

export const remove = async tradeId => {
	try {
		const { data } = await axios({
			method: 'DELETE',
			url: `/api/trades/${tradeId}`,
			headers: {
				Authorization: `Bearer ${getToken()}`,
			},
		});
	} catch (e) {
		console.log('ERROR', e.message);
	}
};
