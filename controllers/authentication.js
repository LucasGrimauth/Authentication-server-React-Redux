const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user){
	const timestamp = new Date().getTime();
	return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
	// User has already had their login authenticated
	// We just need to give them a token
	res.json({ token: tokenForUser(req.user) });
}

exports.signup = function(req, res, next) {
	// Get what is requested
	const email = req.body.email;
	const password = req.body.password;

	if (!email || !password) {
			res.status(422).send({ error: 'you must provide email and password' });
		}

	// See if a user with the given email exists
	User.findOne({ email: email }, function(err, existingUser) {

		if (err) { return next(err); }

		// If a user with this email already exists, return error
		if (existingUser) {
			res.status(422).send({ error: 'Email is in use' });
		}

		// If a user with email does NOT exist, create and save a record
		const user = new User({
			email: email,
			password: password
		});

		user.save(function(err) {
			if (err) { return next(err) }

			// Respond to request indicating the user was created
			res.json({ token: tokenForUser(user)});
		});

		// Respond to request indicating the user was created

	});

}