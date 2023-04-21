const converterSchema = require('../schemas/converter');

const createConverter = async (id, inputText, outputText, ol, cl) => {
  await converterSchema.create({
    converter: id,
    originalCode: inputText,
    convertedCode: outputText,
    originalLanguage: ol,
    convertedLanguage: cl,
  });
};

module.exports = { createConverter };
