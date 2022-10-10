const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');
const usersPost = require('../controllers/post_controller');

router.get('/profile/:id',passport.checkAuthentication, usersController.profile);
router.get('/post', usersPost.post);
router.get('/sign-up', usersController.signup);
router.get('/sign-in', usersController.signIn);

router.post('/create', usersController.create);
// use passport as a middleware to authenticate
// passport first authenticates it, if the authentication is fine then done returns the user(which is the call back function) and if its not done it redirects to user sign in
router.post('/create-session',passport.authenticate(
    // strategy is local
    'local',
    {failureRedirect: '/users/sign-in'},) , usersController.createSession);

router.get('/sign-out', usersController.destroySession);

module.exports = router; 