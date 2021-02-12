import axios from 'axios';

export const create = data => {
	return new Promise((resolve, reject) => {
		axios({
			method: 'POST',
			url: '/api/users',
			data,
		})
			.then(res => {
				console.log('res', res);
				resolve();
			})
			.catch(e => {
				reject(e.response.data);
			});
	});
};
