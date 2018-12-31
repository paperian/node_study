const express = require('express');
const { Post, User } = require('../models');

const router = express.Router();

router.get('/profile', (req, res) => {
	res.render('profile', { title: 'my info - nodebird', user: req.user});
});

router.get('/join', (req, res) => {
	res.render('join', {
		title: 'join - nodebird',
		user: req.user,
		//joinError: req.flash('joinError'),
	});
});

router.get('/', (req, res, next) => {
	Post.findAll({
		include: {
			model: User,
			attributes: ['id', 'nick'],
		},
		order: [['createdAt', 'DESC']],
	}).then((posts) => {
		res.render('main', {
			title: 'NodeBird',
			twits: posts,
			user: req.user,
			//loginError: req.flash('loginError'),
		});
	}).catch((error) => {
		console.error(error);
		next(error);
	});
});

module.exports = router;
