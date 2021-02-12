var express = require('express');
var { create, readMe } = require('../controllers/user');
var auth = require('../middlewares/auth');

var router = express.Router();

router.route('/api/users').post(create);

router.route('/api/me').get(auth, readMe);

module.exports = router;
