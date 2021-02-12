var _ = require('lodash');
var defaultTradeListStats = require('../helpers/defaultTradeListStats');

module.exports = trades => {
	var stats = defaultTradeListStats();

	trades.forEach(trade => {
		stats['return']['value'] += trade['return'];
		stats['commission']['value'] += trade['commission'];
		stats['netReturn']['value'] += trade['netReturn'];
		stats['returnPercent']['value'] += trade['returnPercent'];
		stats['trades']['value']++;

		if (trade['result'] === 'WIN') {
			stats['wins']['value']++;
		} else if (trade['result'] === 'LOSE') {
			stats['loses']['value']++;
		}
	});

	if (stats['return']['value'] >= 0) {
		stats['result']['value'] = 'WIN';
	} else {
		stats['result']['value'] = 'LOSE';
	}

	stats['winRate']['value'] =
		(stats['wins']['value'] / stats['trades']['value']) * 100;
	stats['loseRate']['value'] =
		(stats['loses']['value'] / stats['trades']['value']) * 100;

	stats['averageReturnPerTrade']['value'] =
		stats['return']['value'] / stats['trades']['value'];
	stats['averageReturnPercentPerTrade']['value'] =
		stats['returnPercent']['value'] / stats['trades']['value'];
	stats['averageNetReturnPerTrade']['value'] =
		stats['netReturn']['value'] / stats['trades']['value'];

	// ROUNDING ===========================================================
	Object.keys(stats).forEach(key => {
		stats[key]['value'] = _.round(stats[key]['value'], 2);
	});

	return stats;
};
