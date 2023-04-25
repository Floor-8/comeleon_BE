const userSchema = require('../schemas/user');
const converterSchema = require('../schemas/converter');

const login = async (id, email, name) => {
  await userSchema.create({
    googleId: id,
    email: email,
    name: name,
  });
};

const getUserInfo = async (id) => {
  return await userSchema.find({ googleId: id });
};

const getUserChats = async (userId) => {
  return await converterSchema.find({ converter: userId });
};

module.exports = { login, getUserInfo, getUserChats };
