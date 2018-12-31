const KakaoStrategy = require('passport-kakao').Strategy;

const { User } = require('../models');

module.exports = (passport) => {
	passport.use(new KakaoStrategy({
		clientID: process.env.KAKAO_ID,
		callbackURL: '/auth/kakao/callback', // kakao로부터 인증 결과를 받을 라우터 주소
	}, async (accessToken, refreshToken, profile, done) => {
		// kakao에서는 인증 후, callbackURL로 accessToken, refreshToken, profile을 보내준다
		// 아마도, req.body에서 알아서 잘 꺼내어 전달해 줄듯!!
		try {
			const exUser = await User.find({ where: { snsId: profile.id, provider: 'kakao' } });	
			if (exUser) {
				done(null, exUser);	
			} else {
				console.log('profile', profile);
				const newUser = await User.create({
					//email: profile._json && profile._json.kaccount_email,
					nick: profile.displayName,
					snsId: profile.id,
					provider: 'kakao',
				});	
				done(null, newUser);
			}
		} catch (error) {
			console.error(error);	
			done(error);
		}	
	}));
};
