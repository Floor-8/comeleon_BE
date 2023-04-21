const openaiService = require('../services/openaiService');
const { catchAsync } = require('../utils/error');

const getPrompts = catchAsync(async (req, res) => {
  const { inputText } = req.body;
  const { isComment, ol, cl } = req.query;
  // ol: original language, cl: converted language

  const response = await openaiService.getPrompts(inputText, isComment, ol, cl);

  return res.status(200).json({ response });
});

module.exports = { getPrompts };
