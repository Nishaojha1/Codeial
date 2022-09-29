const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home _controller');

console.log('Router Loaded ')

router.get('/', homeController.home);
// middleware
router.use('/users', require('./users'));

// for any futher routes, access from here
// router.use('/routername', require('./routerfile))

module.exports = router;