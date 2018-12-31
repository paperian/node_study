const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const jwt = require('./jwtStrategy');

module.exports = (passport) => {
	local(passport);
	kakao(passport);
	jwt(passport);
};
