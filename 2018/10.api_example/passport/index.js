const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const jwt = require('./jwtStrategy');
const { User } = require('../models');

module.exports = (passport) => {
	// req.session 에 어떤 데이터를 저장할지 선택 (user.id)
	// serializeUser: 사용자 정보(id)를 session에 저장
	// -> 세션에 정보 저장을 최소화 하기 위해서
	passport.serializeUser((user, done) => {
		done(null, user.id); // 첫 인자: 에러 처리	
	});

	// deserializeUser: 세션에 저장된 아이디를 통해 사용자 정보 객체를 불러오는 것
	// -> 세션에 정보 저장을 최소화 하기 위해서
	// 매 요청시 실행되는 deserializeUser
	passport.deserializeUser((id, done) => {
		User.find({ 
				where: { id },
				include: [{
					model: User,
					attributes: ['id', 'nick'],
					as: 'Followers',
				}, {
					model: User,
					attributes: ['id', 'nick'],
					as: 'Followings',
				}],
			})
			.then(user => done(null, user)) // 여기서 req.user에 정보 저장!!
			.catch(err => done(err));
	});
	
	// 각 전략을 등록
	local(passport);
	kakao(passport);
	jwt(passport);
};
