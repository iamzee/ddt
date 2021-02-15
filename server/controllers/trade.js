var Trade = require('../models/trade');
var Setup = require('../models/setup');
var moment = require('moment');
var _ = require('lodash');
var getTradeStats = require('../helpers/getTradeStats');

var generateTimeline = (buys, sells, type) => {
	var timeline = [];
	var buyQty = 0;
	var sellQty = 0;

	buys.forEach(buy => {
		timeline.push({
			action: 'BUY',
			...buy,
		});
		buyQty += buy.quantity;
	});

	sells.forEach(sell => {
		timeline.push({
			action: 'SELL',
			...sell,
		});
		sellQty += sell.quantity;
	});

	if (buyQty !== sellQty) {
		throw new Error('Buy and sell quantity must be equal');
	}

	timeline.sort((a, b) => {
		if (moment(a.time).isBefore(moment(b.time))) {
			return -1;
		} else {
			return +1;
		}
	});

	if (type === 'LONG') {
		if (timeline[0].action !== 'BUY') {
			throw new Error('Incorrect buy or sell time.');
		}
	} else if (type === 'SHORT') {
		if (timeline[0].action !== 'SELL') {
			throw new Error('Incorrect buy or sell time.');
		}
	}

	return timeline;
};

var getTradeListStats = trades => {
	var stats = {
		wins: 0,
		loses: 0,
		winRate: 0,
		loseRate: 0,
		return: 0,
		commission: 0,
		netReturn: 0,
		result: 0,
		trades: 0,
	};

	trades.forEach(trade => {
		stats['return'] += trade['return'];
		stats['commission'] += trade['commission'];
		stats['netReturn'] += trade['netReturn'];
		stats['trades']++;

		if (trade['result'] === 'WIN') {
			stats['wins']++;
		} else if (trade['result'] === 'LOSE') {
			stats['loses']++;
		}
	});

	if (stats['return'] >= 0) {
		stats['result'] = 'WIN';
	} else {
		stats['result'] = 'LOSE';
	}

	stats['winRate'] = _.round((stats['wins'] / stats['trades']) * 100, 2);
	stats['loseRate'] = _.round((stats['loses'] / stats['trades']) * 100, 2);

	return stats;
};

var create = async (req, res) => {
	try {
		var payload = _.pick(req.body, [
			'symbol',
			'date',
			'type',
			'buys',
			'sells',
			'stops',
			'targets',
			'reasonToEnter',
			'reasonToExit',
			'notes',
			'commission',
			'setup',
			'screenshots',
		]);

		var timeline = generateTimeline(
			payload['buys'],
			payload['sells'],
			payload['type']
		);

		var trade = new Trade({ ...payload, timeline, user: req.user._id });
		await trade.save();

		res.send(trade);
	} catch (e) {
		res.status(400).send({ success: false, message: e.message });
	}
};

var list = async (req, res) => {
	try {
		var pageSize = 10;
		var { page, startDate, endDate, setup, type } = req.query;

		var query = {};

		if (startDate && endDate) {
			query['date'] = {
				$gte: moment(startDate, 'YYYY-MM-DD')
					.set('hour', 0)
					.set('minute', 0)
					.set('second', 0),
				$lte: moment(endDate, 'YYYY-MM-DD')
					.set('hour', 23)
					.set('minute', 59)
					.set('second', 59),
			};
		}

		if (setup) {
			query['setup'] = setup;
		}

		if (type) {
			query['type'] = type;
		}

		var trades = await Trade.find({ user: req.user._id, ...query })
			.sort('-date')
			.populate('setup', 'title')
			.skip((parseInt(page) - 1) * pageSize)
			.limit(pageSize)
			.lean();

		var tradesCount = await Trade.count({ user: req.user._id });

		trades = trades.map(t => ({
			...t,
			...getTradeStats(t),
		}));

		var stats = getTradeListStats(trades);

		res.send({
			success: true,
			trades,
			stats,
			count: tradesCount,
			currentPage: page,
		});
	} catch (e) {
		res.status(400).send({ success: false, message: e.message });
	}
};

var remove = async (req, res) => {
	try {
		const trade = await Trade.findOneAndDelete({
			_id: req.params.id,
			user: req.user._id,
		});

		if (!trade) {
			return res.status(400).send({ message: 'Trade not found.' });
		}

		res.send({ message: 'Trade deleted successfully.', success: true });
	} catch (e) {}
};

var edit = async (req, res) => {
	try {
		var payload = _.pick(req.body, [
			'symbol',
			'date',
			'type',
			'buys',
			'sells',
			'stops',
			'targets',
			'reasonToEnter',
			'reasonToExit',
			'notes',
			'commission',
			'setup',
			'screenshots',
		]);

		var timeline = generateTimeline(
			payload['buys'],
			payload['sells'],
			payload['type']
		);

		console.log('HI', timeline);

		var trade = await Trade.findOneAndUpdate(
			{ _id: req.params.id, user: req.user._id },
			{ ...payload, timeline },
			{ new: true }
		);

		if (!trade) {
			return res.status(404).send({ message: 'Trade not found.' });
		}

		res.send(trade);
	} catch (e) {
		res.status(400).send({ message: e.message });
	}
};

var read = async (req, res) => {
	try {
		var trade = await Trade.findOne({
			_id: req.params.id,
			user: req.user._id,
		})
			.populate('setup', 'title')
			.lean();

		if (!trade) {
			return res.status(404).send({ message: 'Trade not found.' });
		}

		var stats = getTradeStats(trade);

		res.send({
			success: true,
			trade: {
				...trade,
				...stats,
			},
		});
	} catch (e) {
		res.status(400).send({ message: e.message });
	}
};

module.exports = { create, list, remove, edit, read };
