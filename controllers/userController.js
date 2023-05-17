const userService = require('../services/userService');
const { catchAsync } = require('../utils/error');

const login = catchAsync(async (req, res) => {
  const { clientId, credential } = req.body;

  const result = await userService.login(clientId, credential);

  res
    .status(200)
    .json({ accessToken: result[0], nickName: result[1], picture: result[2] });
});

const getUserChats = catchAsync(async (req, res) => {
  const userId = req.user;
  const result = await userService.getUserChats(userId);

  res.status(200).json({ data: result });
});

module.exports = { login, getUserChats };
