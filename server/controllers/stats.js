var Trade = require('../models/trade');
var moment = require('moment');
var _ = require('lodash');

var getWeekdayStats = async (req, res) => {
	try {
		var trades = await Trade.find({ user: req.user._id });

		var weekday = {
			1: {
				wins: 0,
				loses: 0,
				breakevens: 0,
				trades: 0,
				netReturn: 0,
				percentChange: 0,
			},
			2: {
				wins: 0,
				loses: 0,
				breakevens: 0,
				trades: 0,
				netReturn: 0,
				percentChange: 0,
			},
			3: {
				wins: 0,
				loses: 0,
				breakevens: 0,
				trades: 0,
				netReturn: 0,
				percentChange: 0,
			},
			4: {
				wins: 0,
				loses: 0,
				breakevens: 0,
				trades: 0,
				netReturn: 0,
				percentChange: 0,
			},
			5: {
				wins: 0,
				loses: 0,
				breakevens: 0,
				trades: 0,
				netReturn: 0,
				percentChange: 0,
			},
		};

		trades.forEach(trade => {
			var day = moment(trade.date, 'YYYY-MM-DD').day();
			weekday[day]['trades']++;
			weekday[day]['netReturn'] = trade['netReturn'];
			weekday[day]['percentChange'] = trade['percentChange'];

			if (trade['status'] === 'WIN') {
				weekday[day]['wins']++;
			} else if (trade['status'] === 'LOSE') {
				weekday[day]['loses']++;
			} else if (trade['status'] === 'BREAKEVEN') {
				weekday[day]['breakevens']++;
			}
		});

		Object.keys(weekday).forEach(day => {
			if (weekday[day]['trades'] > 0) {
				weekday[day]['winRate'] = _.round(
					(weekday[day]['wins'] / weekday[day]['trades']) * 100,
					2
				);
				weekday[day]['loseRate'] = _.round(
					(weekday[day]['loses'] / weekday[day]['trades']) * 100,
					2
				);
				weekday[day]['breakevenRate'] = _.round(
					(weekday[day]['breakevens'] / weekday[day]['trades']) * 100,
					2
				);
			} else {
				weekday[day]['winRate'] = 0;
				weekday[day]['loseRate'] = 0;
				weekday[day]['breakevenRate'] = 0;
			}
		});

		res.send(weekday);
	} catch (e) {
		res.status(400).send({ message: e.message });
	}
};

var getMonthStats = async (req, res) => {
	try {
		var trades = await Trade.find({ user: req.user._id });

		var monthStats = {
			0: {
				wins: 0,
				loses: 0,
				breakevens: 0,
				trades: 0,
				netReturn: 0,
				percentChange: 0,
			},
			1: {
				wins: 0,
				loses: 0,
				breakevens: 0,
				trades: 0,
				netReturn: 0,
				percentChange: 0,
			},
			2: {
				wins: 0,
				loses: 0,
				breakevens: 0,
				trades: 0,
				netReturn: 0,
				percentChange: 0,
			},
			3: {
				wins: 0,
				loses: 0,
				breakevens: 0,
				trades: 0,
				netReturn: 0,
				percentChange: 0,
			},
			4: {
				wins: 0,
				loses: 0,
				breakevens: 0,
				trades: 0,
				netReturn: 0,
				percentChange: 0,
			},
			5: {
				wins: 0,
				loses: 0,
				breakevens: 0,
				trades: 0,
				netReturn: 0,
				percentChange: 0,
			},
			6: {
				wins: 0,
				loses: 0,
				breakevens: 0,
				trades: 0,
				netReturn: 0,
				percentChange: 0,
			},
			7: {
				wins: 0,
				loses: 0,
				breakevens: 0,
				trades: 0,
				netReturn: 0,
				percentChange: 0,
			},
			8: {
				wins: 0,
				loses: 0,
				breakevens: 0,
				trades: 0,
				netReturn: 0,
				percentChange: 0,
			},
			9: {
				wins: 0,
				loses: 0,
				breakevens: 0,
				trades: 0,
				netReturn: 0,
				percentChange: 0,
			},
			10: {
				wins: 0,
				loses: 0,
				breakevens: 0,
				trades: 0,
				netReturn: 0,
				percentChange: 0,
			},
			11: {
				wins: 0,
				loses: 0,
				breakevens: 0,
				trades: 0,
				netReturn: 0,
				percentChange: 0,
			},
		};

		trades.forEach(trade => {
			var month = moment(trade.date, 'YYYY-MM-DD').month();

			monthStats[month]['trades']++;
			monthStats[month]['netReturn'] = trade['netReturn'];
			monthStats[month]['percentChange'] = trade['percentChange'];

			if (trade['status'] === 'WIN') {
				monthStats[month]['wins']++;
			} else if (trade['status'] === 'LOSE') {
				monthStats[month]['loses']++;
			} else if (trade['status'] === 'BREAKEVEN') {
				monthStats[month]['breakevens']++;
			}
		});

		Object.keys(monthStats).forEach(month => {
			if (monthStats[month]['trades'] > 0) {
				monthStats[month]['winRate'] = _.round(
					(monthStats[month]['wins'] / monthStats[month]['trades']) *
						100,
					2
				);
				monthStats[month]['loseRate'] = _.round(
					(monthStats[month]['loses'] / monthStats[month]['trades']) *
						100,
					2
				);
				monthStats[month]['breakevenRate'] = _.round(
					(monthStats[month]['breakevens'] /
						monthStats[month]['trades']) *
						100,
					2
				);
			} else {
				monthStats[month]['winRate'] = 0;
				monthStats[month]['loseRate'] = 0;
				monthStats[month]['breakevenRate'] = 0;
			}
		});

		res.send(monthStats);
	} catch (e) {
		res.status(400).send({ message: e.message });
	}
};

var getAllTimeStats = async (req, res) => {
	try {
		var trades = await Trade.find({ user: req.user._id });

		var allTimeStats = {
			trades: 0,
			wins: 0,
			loses: 0,
			breakevens: 0,
			winRate: 0,
			loseRate: 0,
			breakevenRate: 0,
			netReturn: 0,
			percentChange: 0,
		};

		trades.forEach(trade => {
			allTimeStats['trades']++;
			allTimeStats['netReturn']++;
			allTimeStats['percentChange']++;

			if (trade['status'] === 'WIN') {
				allTimeStats['wins']++;
			} else if (trade['status'] === 'LOSE') {
				allTimeStats['loses']++;
			} else if (trade['status'] === 'BREAKEVEN') {
				allTimeStats['breakevens']++;
			}
		});

		allTimeStats['winRate'] = _.round(
			(allTimeStats['wins'] / allTimeStats['trades']) * 100,
			2
		);
		allTimeStats['loseRate'] = _.round(
			(allTimeStats['loses'] / allTimeStats['trades']) * 100,
			2
		);
		allTimeStats['breakevenRate'] = _.round(
			(allTimeStats['breakevens'] / allTimeStats['trades']) * 100,
			2
		);

		res.send(allTimeStats);
	} catch (e) {
		res.status(400).send({ messagee: e.message });
	}
};

var getDailyCumulativeReturn = async (req, res) => {
	try {
		var trades = await Trade.find({ user: req.user._id });

		// trades.sort((a, b) => {
		//     if (moment(a))
		// })
	} catch (e) {
		res.status(400).send({ message: e.message });
	}
};

module.exports = {
	getWeekdayStats,
	getMonthStats,
	getAllTimeStats,
	getDailyCumulativeReturn,
};
