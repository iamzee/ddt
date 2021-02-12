var User = require('../models/user');

var login = async (req, res) => {
	try {
		var user = await User.findByCredential(
			req.body.email,
			req.body.password
		);
		var token = await user.generateToken();
		res.send({ user, token });
	} catch (e) {
		res.status(400).send({ message: e.message });
	}
};

module.exports = {
	login,
};
