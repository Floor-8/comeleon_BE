const express = require('express');

const openaiController = require('../controllers/openaiController');

const router = express.Router();

router.post('/', openaiController.getPrompts);

module.exports = router;
