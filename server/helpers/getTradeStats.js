var moment = require('moment');
var _ = require('lodash');

module.exports = trade => {
	var stats = {};
	var buys = [];
	var sells = [];

	trade.timeline.forEach(t => {
		if (t.action === 'BUY') {
			buys.push(t);
		} else if (t.action === 'SELL') {
			sells.push(t);
		}
	});

	var buyTime = buys[0].time;
	var sellTime = sells[sells.length - 1].time;

	if (trade['type'] === 'LONG') {
		stats['entryTime'] = buyTime;
		stats['exitTime'] = sellTime;
	} else if (trade['type'] === 'SHORT') {
		stats['entryTime'] = sellTime;
		stats['exitTime'] = buyTime;
	}

	stats['tradeDuration'] = Math.abs(
		moment(stats['entryTime'], 'HH:mm:ss').diff(
			moment(stats['exitTime'], 'HH:mm:ss'),
			'minutes'
		)
	);

	var buyQty = 0;
	var sellQty = 0;
	var averageBuyPrice = 0;
	var averageSellPrice = 0;

	buys.forEach(buy => {
		buyQty += buy.quantity;
		averageBuyPrice += buy.price * buy.quantity;
	});
	averageBuyPrice = averageBuyPrice / buyQty;

	sells.forEach(sell => {
		sellQty += sell.quantity;
		averageSellPrice += sell.price * sell.quantity;
	});
	averageSellPrice = averageSellPrice / sellQty;

	stats['averageBuyPrice'] = _.round(averageBuyPrice, 2);
	stats['averageSellPrice'] = _.round(averageSellPrice, 2);
	stats['quantity'] = buyQty;

	stats['returnPerShare'] = _.round(
		stats['averageSellPrice'] - stats['averageBuyPrice'],
		2
	);

	stats['return'] = _.round(stats['returnPerShare'] * stats['quantity'], 2);

	stats['returnPercent'] =
		trade['type'] === 'LONG'
			? _.round(
					(stats['returnPerShare'] / stats['averageBuyPrice']) * 100,
					2
			  )
			: _.round(
					(stats['returnPerShare'] / stats['averageSellPrice']) * 100,
					2
			  );

	stats['result'] = stats['return'] >= 0 ? 'WIN' : 'LOSE';

	stats['netReturn'] = _.round(stats['return'] - trade['commission'], 2);

	return stats;
};
