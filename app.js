const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

const routes = require('./routes');
const { globalErrorHandler } = require('./utils/error');

const app = express();

mongoose
  .connect('mongodb://localhost:27017/codeChameleon', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB에 연결되었습니다.'))
  .catch((err) => console.error(err));

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(routes);

app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'pong' });
});

app.all('*', (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.statusCode = 404;
  next(err);
});

app.use(globalErrorHandler);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`서버가 ${port}번 포트에서 작동 중입니다.`);
});
