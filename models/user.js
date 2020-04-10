const mongoose = require('mongoose');
const validator = require('validator');

const hashPassword = require('../middlewares/hashPassword');
const isPasswordCorrect = require('../utils/isPasswordCorrect');
const words = require('../configuration/words');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, words.USER_EMAIL_IS_EMAIL],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

userSchema.pre('save', hashPassword);

userSchema.method('isPasswordCorrect', isPasswordCorrect);

userSchema.set('versionKey', false);

module.exports = mongoose.model('user', userSchema);
