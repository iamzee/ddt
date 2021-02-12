var express = require('express');
var { login } = require('../controllers/auth');

var router = express.Router();

router.route('/api/login').post(login);

module.exports = router;
