const { OAuth2Client } = require('google-auth-library');

const userDao = require('../models/userDao');

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

  await userDao.login(id, email, name);

  //accessToken
  const [userInfo] = await userDao.getUserInfo(id);

  console.log(userInfo.email);
  console.log(userInfo.googleId);
  console.log('userInfo : ', userInfo);

  return payload;
};

module.exports = { login };