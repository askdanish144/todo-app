const express = require('express');
const authRouter = express.Router();

const authController = require('../controllers/authController');

authRouter.post('/sign-up', authController.postSignUp);
authRouter.post('/sign-in', authController.postSignin);
authRouter.post('/sign-out', authController.postSignOut);

module.exports = authRouter;
