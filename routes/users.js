const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');
const usersPost = require('../controllers/post_controller');

router.get('/profile', usersController.profile);
router.get('/post', usersPost.post);


module.exports = router;