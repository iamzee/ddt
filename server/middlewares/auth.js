var jwt = require('jsonwebtoken');
var User = require('../models/user');

module.exports = async (req, res, next) => {
	try {
		var token = req.header('Authorization').replace('Bearer ', '');
		var decoded = jwt.verify(token, 'JWT_SECRET');
		var user = await User.findById(decoded._id);

		if (!user) {
			throw new Error();
		}

		req.token = token;
		req.user = user;
		next();
	} catch (e) {
		return res.status(400).send({ message: 'Unable to authenticate!' });
	}
};
