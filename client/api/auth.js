import axios from 'axios';

export const login = data => {
	return new Promise((resolve, reject) => {
		axios({
			method: 'POST',
			url: '/api/login',
			data,
		})
			.then(({ data }) => {
				localStorage.setItem('DDT', JSON.stringify(data));
				resolve(data);
			})
			.catch(e => {
				reject(e.response.data);
			});
	});
};

export const logout = () => {
	localStorage.removeItem('DDT');
};
