const express = require('express');

const { verifyToken } = require('../middlewares//auth');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/login', userController.login);
router.get('/chats', verifyToken, userController.getUserChats);

module.exports = router;
