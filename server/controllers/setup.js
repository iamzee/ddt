var Setup = require('../models/setup');
var Trade = require('../models/trade');
var _ = require('lodash');

var create = async (req, res) => {
	try {
		const data = _.pick(req.body, ['title', 'description']);

		const setup = new Setup({ ...data, user: req.user._id });

		await setup.save();

		res.send(setup);
	} catch (e) {
		res.status(400).send({ message: e.message });
	}
};

var list = async (req, res) => {
	try {
		var setups = await Setup.find({ user: req.user._id });

		res.send({ success: true, setups });
	} catch (e) {
		res.status(400).send({ message: e.message });
	}
};

var remove = async (req, res) => {
	var promise1 = Trade.updateMany({ setup: req.params.id }, { setup: null });

	var promise2 = Setup.findOneAndDelete({
		_id: req.params.id,
		user: req.user._id,
	});

	Promise.all([promise1, promise2])
		.then(() => {
			res.send();
		})
		.catch(e => {
			res.status(400).send({ message: e.message });
		});
};

var edit = async (req, res) => {
	try {
		var data = _.pick(req.body, ['title', 'description']);
		var setup = await Setup.findOneAndUpdate(
			{
				_id: req.params.id,
				user: req.user._id,
			},
			data,
			{ new: true }
		);

		if (!setup) {
			return res.status(404).send({ message: 'Setup not found.' });
		}

		res.send({ succes: true, setup });
	} catch (e) {
		res.status(400).send({ success: false, message: e.message });
	}
};

module.exports = { create, list, remove, edit };
