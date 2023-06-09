const { Configuration, OpenAIApi } = require('openai');

const openaiDao = require('../models/openaiDao');

const getPrompts = async (userMongoId, inputText, isComment, ol, cl) => {
  const configuration = new Configuration({
    organization: process.env.OPENAI_ORGANIZATION_KEY,
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const runPrompt = async (inputText, isComment, ol, cl) => {
    const language = Object.freeze({
      js: 'javascript',
      py: 'python',
      java: 'java',
    });

    let prompt = '';
    if (isComment == true) {
      prompt = `please convert this ${language}.${ol} code block to ${language}.${cl} code block.
      
      And please add explanation or comments to the following code block.

      This is the original code block: """
      ${inputText}
      """

      # please add comment here.
      `;
    } else {
      prompt = `please convert this ${language}.${ol} code block to ${language}.${cl} code blocks without adding any comment. 
      This is the code block: 
      ${inputText}
      `;
    }

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 1000,
      n: 1,
      temperature: 0.2,
      top_p: 0.8,
    });

    console.log('- completion:\n' + response.data.choices[0].text);
    console.log('\n- total tokens: ' + response.data.usage.total_tokens);
    console.log('*- completion ended...');

    return response;
  };

  const response = await runPrompt(inputText, isComment, ol, cl);

  return response.data.choices[0].text;
};

const savePrompts = async (
  userMongoId,
  title,
  inputText,
  outputText,
  ol,
  cl
) => {
  return await openaiDao.createConverter(
    userMongoId,
    title,
    inputText,
    outputText,
    ol,
    cl
  );
};

module.exports = { getPrompts, savePrompts };
