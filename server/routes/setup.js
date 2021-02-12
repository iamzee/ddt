var express = require('express');
var { create, list, remove, edit } = require('../controllers/setup');
var auth = require('../middlewares/auth');

var router = express.Router();

router.route('/api/setups').post(auth, create).get(auth, list);

router.route('/api/setups/:id').delete(auth, remove).patch(auth, edit);

module.exports = router;
