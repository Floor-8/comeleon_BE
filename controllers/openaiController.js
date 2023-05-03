const openaiService = require('../services/openaiService');
const { catchAsync } = require('../utils/error');

const getPrompts = catchAsync(async (req, res) => {
  const { inputText } = req.body;
  const { isComment, ol, cl } = req.query;
  const userMongoId = req.user;

  // ol: original language, cl: converted language

  const response = await openaiService.getPrompts(
    userMongoId,
    inputText,
    isComment,
    ol,
    cl
  );

  return res.status(200).json({ response });
});

const savePrompts = catchAsync(async (req, res) => {
  const { title, inputText, outputText, ol, cl } = req.body;
  const userMongoId = req.user;

  await openaiService.savePrompts(
    userMongoId,
    title,
    inputText,
    outputText,
    ol,
    cl
  );

  return res.status(201).json({ message: 'Save Prompt Successfully' });
});

module.exports = { getPrompts, savePrompts };
