const userSchema = require('../schemas/user');

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

module.exports = { login, getUserInfo };
