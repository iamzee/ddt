var Trade = require('../models/trade');
var getTradeStats = require('../helpers/getTradeStats');
var getTradeListStats = require('../helpers/getTradeListStats');
var moment = require('moment');

var getDashboardData = async (req, res) => {
	try {
		var trades = await Trade.find({ user: req.user._id })
			.select(['timeline', 'date', 'type', 'commission'])
			.lean();

		// ADD STATS TO EVERY TRADE AND SORT BY DATE
		trades = trades
			.map(t => ({
				...t,
				...getTradeStats(t),
			}))
			.sort((a, b) => {
				if (moment(a.date).isBefore(moment(b.date))) {
					return -1;
				} else {
					return +1;
				}
			});

		// GROUP BY DATE
		var tradesByDate = {};
		trades.forEach(t => {
			var date = moment(t.date).format('YYYY-MM-DD');
			if (!tradesByDate[date]) {
				tradesByDate[date] = [];
			}

			tradesByDate[date].push(t);
		});

		// GET STATS BY DATE
		var statsByDate = {};
		Object.keys(tradesByDate).forEach(key => {
			statsByDate[key] = getTradeListStats(tradesByDate[key]);
		});

		// CALCULATE CUMULATIVE RETURN AND NET RETURN
		var totalReturn = 0;
		var totalNetReturn = 0;
		Object.keys(statsByDate).forEach(key => {
			totalReturn += statsByDate[key]['return']['value'];
			totalNetReturn += statsByDate[key]['netReturn']['value'];

			statsByDate[key] = {
				return: totalReturn,
				netReturn: totalNetReturn,
			};
		});

		res.send({
			return: totalReturn,
			netReturn: totalNetReturn,
			stats: statsByDate,
		});
	} catch (e) {
		res.status(400).send({ success: false, message: e.message });
	}
};

module.exports = {
	getDashboardData,
};
