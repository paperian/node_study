const axios = require('axios');

// join test
const join_test = async () => {
	try {
		const resp = await axios.post('http://localhost:3000/auth/join', {
			email: 'jeinsong200@gmail.com',
			nick: 'jeins',
			password: 'mypassword',
		});
		console.log(resp.data);
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
		console.log(resp.data);
	} catch (error) {
		console.error(error);	
	}
};
//secure_test();

const profile_test = async () => {
	try {
		const resp = await axios.get(
			'http://localhost:3000/profile', {
				headers: { Authorization: 'bearer ' + accessToken },	
			});
		console.log(resp.data);
	} catch (error) {
		console.error(error);	
	}
};

// login test
const login_test = async () => {
	try {
		const resp = await axios.post('http://localhost:3000/auth/login', {
			email: 'jeinsong200@gmail.com',
			password: 'mypassword',
		});
		console.log(resp.data);
		accessToken = resp.data.accessToken;
		secure_test();
		profile_test();
	} catch (error) {
		console.error(error);	
	}
};
login_test();

const index_test = async () => {
	try {
		const resp = await axios.get('http://localhost:3000/');
		console.log(resp.data);
	} catch (error) {
		console.error(error);	
	}
};
index_test();
