const { OAuth2Client } = require('google-auth-library');

const userDao = require('../models/userDao');
const { createAccessToken } = require('../utils/createToken');

const login = async (clientId, credential) => {
  const client = new OAuth2Client(clientId);
  // Call the verifyIdToken to
  // varify and decode it
  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: clientId,
  });
  // Get the JSON with all the user info
  const payload = ticket.getPayload();
  // This is a JSON object that contains
  // all the user info

  const id = payload.sub;
  const email = payload.email;
  const name = payload.name;

  const [userInfo] = await userDao.getUserInfo(id);

  if (userInfo) {
    const userMongoId = userInfo._id.toString();
    return await createAccessToken(userMongoId);
  } else {
    await userDao.login(id, email, name);
    const [userInfo] = await userDao.getUserInfo(id);
    const userMongoId = userInfo._id.toString();
    return await createAccessToken(userMongoId);
  }
};

const getUserChats = async (userId) => {
  return await userDao.getUserChats(userId);
};

module.exports = { login, getUserChats };
