const bcrypt = require('bcryptjs');

module.exports = async function isPasswordCorrect(candidatePassword, userPassword) {
  return bcrypt.compare(candidatePassword, userPassword);
};
