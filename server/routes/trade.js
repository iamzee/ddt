var express = require('express');
var { create, list, remove, edit, read } = require('../controllers/trade');
var auth = require('../middlewares/auth');

var router = express.Router();

router.route('/api/trades').post(auth, create).get(auth, list);

router
	.route('/api/trades/:id')
	.get(auth, read)
	.delete(auth, remove)
	.patch(auth, edit);

module.exports = router;
