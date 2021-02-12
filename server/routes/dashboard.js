var express = require('express');
const { getDashboardData } = require('../controllers/dashboard');
var auth = require('../middlewares/auth');

var router = express.Router();

router.route('/api/dashboard').get(auth, getDashboardData);

module.exports = router;
