var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var userSchema = mongoose.Schema({
	name: {
		type: String,
		require: true,
		trim: true,
	},
	email: {
		type: String,
		required: [true, 'Email is required.'],
		trim: true,
		unique: true,
	},
	password: {
		type: String,
		minlength: 6,
		trim: true,
	},
});

userSchema.methods.generateToken = function () {
	const user = this;
	const token = jwt.sign({ _id: user._id.toString() }, 'JWT_SECRET');
	return token;
};

userSchema.statics.findByCredential = async function (email, password) {
	var user = await User.findOne({ email });

	if (!user) {
		throw new Error('Unable to login.');
	}

	var isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		throw new Error('Unable to login.');
	}

	return user;
};

userSchema.methods.toJSON = function () {
	var user = this;
	var userObject = user.toObject();
	delete userObject.password;
	return userObject;
};

userSchema.pre('save', async function (next) {
	var user = this;

	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8);
	}

	next();
});

var User = mongoose.model('User', userSchema);

module.exports = User;
