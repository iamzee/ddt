var User = require('../models/user');

var create = async (req, res) => {
	const user = new User(req.body);

	try {
		await user.save();
		res.send(user);
	} catch (e) {
		if (e.code === 11000) {
			return res.status(400).send({ message: 'Email already in use.' });
		}

		res.status(400).send(e);
	}
};

var readMe = async (req, res) => {
	res.send(req.user);
};

module.exports = {
	create,
	readMe,
};
