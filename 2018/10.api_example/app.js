const express = require('express');
const morgan = require('morgan');
const path = require('path');
const passport = require('passport');
require('dotenv').config(); // .env의 키들을 process.env에 넣어줌

const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
//const postRouter = require('./routes/post');
//const userRouter = require('./routes/user');
const { sequelize } = require('./models');
const passportConfig = require('./passport'); // == ./passport/index.js

const app = express();
sequelize.sync();
passportConfig(passport);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: false } ));
app.use(passport.initialize()); // req에 passport 설정 삽입

app.use('/', pageRouter);
app.use('/auth', authRouter);
//app.use('/post', postRouter);
//app.use('/user', userRouter);

// router 이후에는 에러 핸들링
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use((err, req, res) => {
	//res.locals.error = req.app.get('env') === 'development' ? err: {}; 
	res.status(err.status || 500).json({
		code: err.status || 500,
		message: err.message,
	});
});

app.listen(app.get('port'), () => {
	console.log(app.get('port'), '번 포트에서 대기중');
});

