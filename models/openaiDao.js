const converterSchema = require('../schemas/converter');

const createConverter = async (id, title, inputText, outputText, ol, cl) => {
  await converterSchema.create({
    converter: id,
    title: title,
    originalCode: inputText,
    convertedCode: outputText,
    originalLanguage: ol,
    convertedLanguage: cl,
  });
};

module.exports = { createConverter };
