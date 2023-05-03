const mongoose = require('mongoose');

const { Schema } = mongoose;

const {
  Types: { ObjectId },
} = Schema;

const converterSchema = new Schema({
  converter: {
    type: ObjectId,
    required: true,
    ref: 'User',
  },

  title: {
    type: String,
    default: true,
  },

  originalCode: {
    type: String,
    required: true,
  },

  convertedCode: {
    type: String,
    required: true,
  },

  originalLanguage: {
    type: String,
    required: true,
  },

  convertedLanguage: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Converter = mongoose.model('Converter', converterSchema);

module.exports = Converter;
