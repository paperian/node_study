const express = require('express');
const passport = require('passport');

const { Post, User } = require('../models');

const router = express.Router();

router.get('/profile', 
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { id, email, nick, provider } = req.user; 
		res.status(200).json({
			code: 200,
			message: 'user profile',
			user: { id, email, nick, provider },
		});
	});

router.get('/', (req, res, next) => {
	Post.findAll({
		//include: {
		//	model: User,
		//	attributes: ['id', 'nick'],
		//},
		order: [['createdAt', 'DESC']],
	}).then((posts) => {
		res.json({
			posts: JSON.stringify(posts),
		});
	}).catch((error) => {
		console.error(error);
		next(error);
	});
});

module.exports = router;
