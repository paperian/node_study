const express = require('express');
const passport = reqruie('passport');

const { isLoggedIn } = require('./middlewares');
const { User } = require('../models');

const router = express.Router();

router.post('/:id/follow', 
	passport.authenticate('jwt', { session: false }),
	async (req, res, next) => {
	try {
		const user = await User.find({ where: { id: req.user.id } });	
		await user.addFollowing(parseInt(req.params.id, 10));

		res.status(200).json({
			code: 200,
			message: 'follow success'
		});
	} catch (error) {
		console.error(error);
		next(error);
	}
});


module.exports = router;
