const bcrypt = require('bcryptjs');

module.exports = async function hashPassword() {
  this.password = await bcrypt.hash(this.password, 12);
};
