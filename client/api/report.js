import axios from 'axios';
import { getToken } from '../helpers/getToken';

export const fetchWeekdayReport = async () => {
	try {
		const { data } = await axios({
			method: 'GET',
			url: '/api/reports/weekday',
			headers: {
				Authorization: `Bearer ${getToken()}`,
			},
		});

		return data;
	} catch (e) {
		console.log('ERROR', e);
	}
};

export const fetchEntryTimeReport = async () => {
	try {
		const { data } = await axios({
			method: 'GET',
			url: '/api/reports/entryTime',
			headers: {
				Authorization: `Bearer ${getToken()}`,
			},
		});

		return data;
	} catch (e) {
		console.log('ERROR', e);
	}
};

export const fetchDailyReport = async month => {
	try {
		const { data } = await axios({
			method: 'GET',
			url: `/api/reports/daily?month=${month}`,
			headers: {
				Authorization: `Bearer ${getToken()}`,
			},
		});

		return data;
	} catch (e) {
		console.log('ERROR', e);
	}
};

export const fetchMonthlyReport = async year => {
	try {
		const { data } = await axios({
			method: 'GET',
			url: `/api/reports/monthly?year=${year}`,
			headers: {
				Authorization: `Bearer ${getToken()}`,
			},
		});

		return data;
	} catch (e) {
		console.log('ERROR', e);
	}
};

export const fetchPercentReturnReport = async year => {
	try {
		const { data } = await axios({
			method: 'GET',
			url: `/api/reports/percentReturn?interval=0.5`,
			headers: {
				Authorization: `Bearer ${getToken()}`,
			},
		});

		return data;
	} catch (e) {
		console.log('ERROR', e);
	}
};

export const fetchSetupReport = async () => {
	try {
		const { data } = await axios({
			method: 'GET',
			url: `/api/reports/setup`,
			headers: {
				Authorization: `Bearer ${getToken()}`,
			},
		});

		return data;
	} catch (e) {
		console.log('ERROR', e);
	}
};

export const fetchTradeDurationReport = async () => {
	try {
		const { data } = await axios({
			method: 'GET',
			url: `/api/reports/tradeDuration`,
			headers: {
				Authorization: `Bearer ${getToken()}`,
			},
		});

		return data;
	} catch (e) {
		console.log('ERROR', e);
	}
};
