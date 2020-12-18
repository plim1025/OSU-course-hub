export const Auth = () => {
	const PUBLIC_KEY = 0;
	const endpoint = 'https://courses.ecampus.oregonstate.edu/services/auth/public/v1/token';
	const originalQuery = '';
	const params = {
		public_key: PUBLIC_KEY,
		query: originalQuery,
		redirect: window.location.href,
	} as any;
	const query = Object.keys(params)
		.map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
		.join('&');
	window.location.assign(endpoint + '?' + query);
};
