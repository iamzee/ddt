var Trade = require('../models/trade');
var moment = require('moment');
var _ = require('lodash');
var getTradeStats = require('../helpers/getTradeStats');
var getTradeListStats = require('../helpers/getTradeListStats');
var mongoose = require('mongoose');
var defaultTradeListStats = require('../helpers/defaultTradeListStats');
var ObjectId = mongoose.Types.ObjectId;

var getWeekdayReport = async (req, res) => {
	try {
		var trades = await Trade.find({ user: req.user._id })
			.select(['date', 'timeline', 'type', 'commission'])
			.lean();

		trades = trades.map(t => ({
			...t,
			...getTradeStats(t),
		}));

		var weekdayTrades = { 1: [], 2: [], 3: [], 4: [], 5: [] };

		trades.forEach(t => {
			weekdayTrades[moment(t.date).day()].push(t);
		});

		var weekdayStats = { 1: {}, 2: {}, 3: {}, 4: {}, 5: {} };

		Object.keys(weekdayTrades).forEach(key => {
			if (weekdayTrades[key].length > 0) {
				weekdayStats[key] = getTradeListStats(weekdayTrades[key]);
			} else {
				weekdayStats[key] = defaultTradeListStats();
			}
		});

		res.send(weekdayStats);
	} catch (e) {
		res.status(400).send({ message: e.message });
	}
};

var getSetupReport = async (req, res) => {
	try {
		var trades = await Trade.find({
			user: req.user._id,
			setup: { $exists: true },
		})
			.select(['setup', 'status', 'netReturn', 'percentChange'])
			.populate('setup', 'title');

		var report = {};

		trades.forEach(trade => {
			var setupTitle = trade.setup.title;

			if (!report[setupTitle]) {
				report[setupTitle] = {
					wins: 0,
					loses: 0,
					breakevens: 0,
					trades: 0,
					netReturn: 0,
					percentChange: 0,
				};
			}

			report[setupTitle]['trades']++;
			report[setupTitle]['netReturn'] += trade['netReturn'];
			report[setupTitle]['percentChange'] += trade['percentChange'];

			if (trade['status'] === 'WIN') {
				report[setupTitle]['wins']++;
			} else if (trade['status'] === 'LOSE') {
				report[setupTitle]['loses']++;
			} else if (trade['status'] === 'BREAKEVEN') {
				report[setupTitle]['breakevens']++;
			}
		});

		Object.keys(report).forEach(setup => {
			report[setup]['winRate'] = _.round(
				(report[setup]['wins'] / report[setup]['trades']) * 100,
				2
			);
			report[setup]['loseRate'] = _.round(
				(report[setup]['loses'] / report[setup]['trades']) * 100,
				2
			);
			report[setup]['breakevenRate'] = _.round(
				(report[setup]['breakevens'] / report[setup]['trades']) * 100,
				2
			);
		});

		res.send(report);
	} catch (e) {
		res.status(400).send({ message: e.message });
	}
};

var getDailyCumulativeNetReturn = async (req, res) => {
	try {
		var trades = await Trade.find({ user: req.user._id })
			.sort('date')
			.select(['date', 'netReturn']);

		var report = {};
		var total = 0;

		trades.forEach(trade => {
			date = moment(trade.date).format('YYYY-MM-DD');

			if (!report[date]) {
				report[date] = 0;
			}

			total += trade.netReturn;
			report[date] = total;
		});

		res.send(report);
	} catch (e) {}
};

var getEntryTimeReport = async (req, res) => {
	try {
		var trades = await Trade.find({ user: req.user._id })
			.select(['timeline', 'type', 'commission'])
			.lean();

		trades = trades
			.map(t => ({
				...t,
				...getTradeStats(t),
			}))
			.sort((a, b) => {
				if (moment(a.entryTime).isBefore(moment(b.entryTime))) {
					return -1;
				} else {
					return +1;
				}
			});

		var tradesByEntryTime = {};

		trades.forEach(t => {
			var entryTime = moment(t.entryTime).format('HH:mm');

			if (!tradesByEntryTime[entryTime]) {
				tradesByEntryTime[entryTime] = [];
			}

			tradesByEntryTime[entryTime].push(t);
		});

		var entryTimeReport = {};

		Object.keys(tradesByEntryTime).forEach(key => {
			entryTimeReport[key] = getTradeListStats(tradesByEntryTime[key]);
		});

		res.send(entryTimeReport);
	} catch (e) {
		res.status(400).send({ message: e.message });
	}
};

var getDailyReport = async (req, res) => {
	var { month } = req.query;

	try {
		var trades = await Trade.aggregate([
			{
				$match: {
					user: ObjectId(req.user._id),
				},
			},
			{
				$project: {
					month: {
						$month: '$date',
					},
					date: 1,
					timeline: 1,
					type: 1,
					commission: 1,
				},
			},
			{
				$match: {
					month: parseInt(month),
				},
			},
		]);

		trades = trades.map(t => ({
			...t,
			...getTradeStats(t),
		}));

		var dailyTrades = {};

		trades.forEach(t => {
			var date = moment(t.date).format('YYYY-MM-DD');

			if (!dailyTrades[date]) {
				dailyTrades[date] = [];
			}

			dailyTrades[date].push(t);
		});

		var dailyStats = {};

		Object.keys(dailyTrades).forEach(key => {
			dailyStats[key] = getTradeListStats(dailyTrades[key]);
		});

		res.send(dailyStats);
	} catch (e) {}
};

var getMonthlyReport = async (req, res) => {
	var { year } = req.query;

	try {
		var trades = await Trade.aggregate([
			{
				$project: {
					year: {
						$year: '$date',
					},
					date: 1,
					timeline: 1,
					type: 1,
					commission: 1,
				},
			},
			{
				$match: {
					year: parseInt(year),
				},
			},
		]);

		trades = trades.map(t => ({
			...t,
			...getTradeStats(t),
		}));

		var monthlyTrades = {};

		trades.forEach(t => {
			var month = moment(t.date).month();

			if (!monthlyTrades[month]) {
				monthlyTrades[month] = [];
			}

			monthlyTrades[month].push(t);
		});

		var monthlyStats = {};

		Object.keys(monthlyTrades).forEach(key => {
			monthlyStats[key] = getTradeListStats(monthlyTrades[key]);
		});

		res.send(monthlyStats);
	} catch (e) {}
};

var getPercentReturnReport = async (req, res) => {
	try {
		var trades = await Trade.find({ user: req.user._id }).lean();

		trades = trades.map(t => ({
			...t,
			...getTradeStats(t),
		}));

		var returnPercents = [];

		trades.forEach(t => returnPercents.push(t.returnPercent));

		var interval = parseFloat(req.query.interval);

		returnPercents.sort((a, b) => a - b);

		var start = _.floor(returnPercents[0]);
		var end = start + interval;

		var wins = 0;
		var loses = 0;
		var intervals = {};

		for (var i = 0; i < returnPercents.length; i++) {
			if (returnPercents[i] >= 0) {
				wins++;
			} else {
				loses++;
			}
		}

		for (var i = 0; i < returnPercents.length; i++) {
			var key = `${start}% to ${end}%`;
			if (!intervals[key]) {
				intervals[key] = {
					result: returnPercents[i] >= 0 ? 'WIN' : 'LOSE',
					trades: 0,
				};
			}

			if (returnPercents[i] >= start && returnPercents[i] < end) {
				intervals[key]['trades']++;
			} else if (returnPercents[i] >= end) {
				start += interval;
				end += interval;
				i--;
			}
		}

		res.send({ wins, loses, intervals });
	} catch (e) {
		res.status(400).send({ message: e.message });
	}
};

var getSetupReport = async (req, res) => {
	try {
		var trades = await Trade.find({
			user: req.user._id,
			setup: { $exists: true },
		})
			.select(['date', 'timeline', 'type', 'commission', 'setup'])
			.populate('setup', 'title')
			.lean();

		trades = trades.map(t => ({
			...t,
			...getTradeStats(t),
		}));

		var setupWiseTrades = {};

		trades.forEach(t => {
			if (!setupWiseTrades[t.setup.title]) {
				setupWiseTrades[t.setup.title] = [];
			}

			setupWiseTrades[t.setup.title].push(t);
		});

		var setupReport = {};

		Object.keys(setupWiseTrades).forEach(key => {
			if (setupWiseTrades[key].length > 0) {
				setupReport[key] = getTradeListStats(setupWiseTrades[key]);
			} else {
				setupReport[key] = defaultTradeListStats();
			}
		});

		res.send(setupReport);
	} catch (e) {
		res.status(400).send({ message: e.message });
	}
};

var getTradeDurationReport = async (req, res) => {
	try {
		var trades = await Trade.find({ user: req.user._id }).lean();
		trades = trades
			.map(t => ({
				...t,
				...getTradeStats(t),
			}))
			.sort((a, b) => {
				if (a.tradeDuration > b.tradeDuration) {
					return -1;
				} else {
					return +1;
				}
			});

		var tradesByTradeDuration = {};

		trades.forEach(t => {
			if (!tradesByTradeDuration[t.tradeDuration]) {
				tradesByTradeDuration[t.tradeDuration] = [];
			}

			tradesByTradeDuration[t.tradeDuration].push(t);
		});

		var tradeDurationReport = {};

		Object.keys(tradesByTradeDuration).forEach(key => {
			tradeDurationReport[key] = getTradeListStats(
				tradesByTradeDuration[key]
			);
		});

		res.send(tradeDurationReport);
	} catch (e) {
		res.status(400).send({ message: e.message, success: false });
	}
};

module.exports = {
	getWeekdayReport,
	getSetupReport,
	getDailyCumulativeNetReturn,
	getEntryTimeReport,
	getDailyReport,
	getMonthlyReport,
	getPercentReturnReport,
	getSetupReport,
	getTradeDurationReport,
};
