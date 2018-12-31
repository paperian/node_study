const jwt = require('jsonwebtoken');

// Generate an Access Token for the given User ID
const generateAccessToken = (userId) => {
	const expiresIn = '1 hour';
	const audience = 'test.com'; 
	const issuer = 'test.com';
	const secret = process.env.JWT_SECRET;

	const token = jwt.sign({
		id: userId,
	}, secret, {
		expiresIn,
		audience,
		issuer,
		subject: userId.toString(), // 'sub'
	});

	return token;
}

// Generate the Token for the user authenticated in the request
exports.generateUserToken = (req, res)/* middleware */ => {
	const accessToken = generateAccessToken(req.user.id); 
	res.json({ 
		code: 200,
		message: 'token has been generated',
		accessToken,
	});
}
