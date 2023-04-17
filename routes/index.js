const express = require('express');

const openaiRouter = require('./openaiRouter');

const routes = express.Router();

routes.use('/openai', openaiRouter);

module.exports = routes;
