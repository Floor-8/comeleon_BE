const jwt = require('jsonwebtoken');
const { catchAsync } = require('../utils/error');

const verifyToken = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    const error = new Error('YOU NEEDS TOKEN!!');
    error.statusCode = 400;
    throw error;
  }
  const SECRET_KEY = process.env.SECRET_KEY;
  const decode = jwt.verify(token, SECRET_KEY);

  req.user = decode.id;
  console.log(req.user);

  return next();
});

module.exports = { verifyToken };
