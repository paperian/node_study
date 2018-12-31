```
npm init
```

## 필요 라이브러리 설치
```
npm i -g sequelize-cli
npm i sequelize mysql2
sequelize init

npm i express cookie-parser express-session morgan connect-flash pug
npm i -g nodemon
npm i -D nodemon (서버 코드에 수정사항 생길 때 자동 재시작 해주는 모듈, 개발용) 

npm i multer

npm i uuid
npm i jsonwebtoken

npm i passport-jwt

npm i axios
```

## 환경 변수 설정
```
npm i dotenv
touch .env
```

## sequelize 추가 참고자료
- [공식 문서](http://docs.sequelizejs.com/manual/tutorial/migrations.html)
- [블로그](http://webframeworks.kr/tutorials/expressjs/expressjs_orm_two/)

## 로그인 구현
- sudo apt-get install g++ make 필요했음
```
npm i passport passport-local passport-kakao bcrypt
```
- passport/index.js
	```js
	passport.serializeUser((user, done) => {
		done(null, user.id);	
	});

	passport.deserializeUser((id, done) => {
		User.find({ where: { id } })
			.then(user => done(null, user)) // req.user에 저장 
			.catch(err => done(err));
	});
	```
	- serializeUser: 사용자 정보(id)를 session에 저장
	- deserializeUser: 세션에 저장된 아이디를 통해 사용자 정보 객체를 불러오는 것
	- -> 세션에 정보 저장을 최소화 하기 위해서
- 로그인 과정
	1. 로그인 요청
	2. passport.authenticate 메서드 호출
	3. 로그인 strategy 수행 (local, kakao, facebook, ... Strategies)
	4. 로그인 성공 시 사용자 정보 객체와 함께 req.login 호출
	5. req.login 메서드가 passport.serializeUser 호출
	6. req.session에 사용자 아이디만 저장
	7. 로그인 완료	
- 로그인 이후
	1. 모든 요청에 대해 passport.session() 미들웨어가 passport.deserializeUser 메서드 호출
	2. req.session 에 저장된 아이디로 db에서 사용자 조회
	3. 조회된 사용자 정보 req.user에 저장
	4. 라우터에서 req.user 객체 사용 가능
- req.isAuthenticated
	- passport가 req객체에 isAuthenticated 메섣드를 추가해준다.
	- routes/middlewares.js 에서 활용


## JWT 참고자료
- [passport와 jwt를 같이](https://medium.com/front-end-weekly/learn-using-jwt-with-passport-authentication-9761539c4314)
- [passport + jwt](https://www.sitepoint.com/spa-social-login-google-facebook/)
- [vue + express](http://blog.jeonghwan.net/2018/03/26/vue-authentication.html)
- [passport + jwt](http://webframeworks.kr/tutorials/expressjs/auth_log_in_out/)
- [jwt 로그아웃에 대하여](https://medium.com/devgorilla/how-to-log-out-when-using-jwt-a8c7823e8a6)
- [velopert blog](https://velopert.com/2448)
- [oauth passport with jwt](https://stackoverflow.com/questions/40828955/passport-jwt-google-strategy-disable-session-res-send-after-google-cal)
