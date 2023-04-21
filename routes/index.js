const express = require('express');

const userRouter = require('./userRouter');
const openaiRouter = require('./openaiRouter');

const router = express.Router();

routes.use('/openai', openaiRouter);
router.use('/users', userRouter);

module.exports = router;
