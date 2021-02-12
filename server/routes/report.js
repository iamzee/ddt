var express = require('express');
const {
	getWeekdayReport,
	getSetupReport,
	getDailyCumulativeNetReturn,
	getEntryTimeReport,
	getDailyReport,
	getMonthlyReport,
	getPercentReturnReport,
	getTradeDurationReport,
} = require('../controllers/report');
var auth = require('../middlewares/auth');

var router = express.Router();

router.route('/api/reports/weekday').get(auth, getWeekdayReport);
router.route('/api/reports/setup').get(auth, getSetupReport);
router
	.route('/api/reports/dailyCumulativeNetReturn')
	.get(auth, getDailyCumulativeNetReturn);
router.route('/api/reports/entryTime').get(auth, getEntryTimeReport);
router.route('/api/reports/daily').get(auth, getDailyReport);
router.route('/api/reports/monthly').get(auth, getMonthlyReport);
router.route('/api/reports/percentReturn').get(auth, getPercentReturnReport);
router.route('/api/reports/setup').get(auth, getSetupReport);
router.route('/api/reports/tradeDuration').get(auth, getTradeDurationReport);

module.exports = router;
