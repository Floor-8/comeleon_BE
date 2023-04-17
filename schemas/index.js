const mongoose = require('mongoose');

const { MONGO_ID, MONGO_PASSWORD, NODE_ENV } = process.env;

const MONGO_URL = `mongodb://${MONGO_ID}:${MONGO_PASSWORD}@localhost:27017/admin`;

const createConnection = async () => {
  if (NODE_ENV !== 'production') {
    mongoose.set('debug', true);
  }
  try {
    const connection = mongoose.createConnection(MONGO_URL, {
      dbName: 'codeconverter',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('몽고디비 연결 성공');
    return connection;
  } catch (error) {
    console.log('몽고디비 연결 에러', error);
  }
};

mongoose.connection.on('error', (error) => {
  console.error('몽고디비 연결 에러', error);
});

mongoose.connection.on('disconnected', () => {
  console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
  createConnection();
});

module.exports = createConnection;
