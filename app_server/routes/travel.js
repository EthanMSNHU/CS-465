var express = require('express');
var router = express.Router();
var controller = require('../controllers/travel');
const { route } = require('./users');

/* GET home page. */
router.get('/', controller.travel);

module.exports = router;