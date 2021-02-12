var express = require('express');
var auth = require('../middlewares/auth');
var {
	getWeekdayStats,
	getMonthStats,
	getAllTimeStats,
} = require('../controllers/stats');

var router = express.Router();

router.route('/api/stats/weekday').get(auth, getWeekdayStats);
router.route('/api/stats/month').get(auth, getMonthStats);
router.route('/api/stats/allTime').get(auth, getAllTimeStats);

module.exports = router;
