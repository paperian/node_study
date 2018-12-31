const passportJwt = require('passport-jwt');

const { User } = require('../models');

const jwtOptions = {
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    issuer: 'test.com', 
    audience: 'test.com', 
};

module.exports = (passport) => {
	passport.use(new passportJwt.Strategy(
		jwtOptions, 
		async (payload, done) => {
			const user = await User.find({ where: { id: parseInt(payload.sub) } });
			if (user) {
				return done(null, user, payload);
			}
			return done();
		}),
	);
};
