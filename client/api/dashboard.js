import axios from 'axios';
import { getToken } from '../helpers/getToken';

export const getDashboardData = async () => {
	try {
		const { data } = await axios({
			method: 'GET',
			url: '/api/dashboard',
			headers: {
				Authorization: `Bearer ${getToken()}`,
			},
		});
		return data;
	} catch (e) {
		console.log('ERROR', e.message);
	}
};
