const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
  googleId: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
