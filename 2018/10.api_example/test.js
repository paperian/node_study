const axios = require('axios');

// join test
const join_test = async () => {
	try {
		const resp = await axios.post('http://localhost:3000/auth/join', {
			email: 'jeinsong200@gmail.com',
			nick: 'jeins',
			password: 'mypassword',
		});
		console.log(resp);
	} catch (error) {
		console.error(error);	
	}
};
//join_test();

// secure test
let accessToken; 
const secure_test = async () => {
	try {
		const resp = await axios.get(
			'http://localhost:3000/auth/secure_test', {
				headers: { Authorization: 'bearer ' + accessToken },	
			});
		console.log(resp);
	} catch (error) {
		console.error(error);	
	}
};
//secure_test();

// login test
const login_test = async () => {
	try {
		const resp = await axios.post('http://localhost:3000/auth/login', {
			email: 'jeinsong200@gmail.com',
			password: 'mypassword',
		});
		console.log(resp);
		accessToken = resp.data.accessToken;
		console.log('token', accessToken);
		secure_test();
	} catch (error) {
		console.error(error);	
	}
};
login_test();

