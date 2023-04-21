const express = require('express');

const userRouter = require('./userRouter');
const openaiRouter = require('./openaiRouter');

const router = express.Router();

router.use('/openai', openaiRouter);
router.use('/users', userRouter);

module.exports = router;
