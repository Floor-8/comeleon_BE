const express = require('express');

const { verifyToken } = require('../middlewares/auth');
const openaiController = require('../controllers/openaiController');

const router = express.Router();

router.post('/', verifyToken, openaiController.getPrompts);
router.post('/save', verifyToken, openaiController.savePrompts);

module.exports = router;
