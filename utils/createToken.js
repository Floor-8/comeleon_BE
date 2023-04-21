const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;
const accessTokenInfo = {
  algorithm: process.env.ALGORITHM,
  expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
};

const createAccessToken = async (userMongoId) => {
  const payLoad = {
    id: userMongoId,
  };

  return jwt.sign(payLoad, secretKey, accessTokenInfo);
};

module.exports = { createAccessToken };
