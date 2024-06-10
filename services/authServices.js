const bcrypt = require('bcrypt');
 const User = require('../models/userModel');
const userService = {
  registerUser: async ({ firstName, lastName, email, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ firstName, lastName, email, password: hashedPassword });
    return user;
  },

  authenticateUser: async ({ email, password }) => {

    const user = await User.findOne({ where: { email } });
     if (!user) {
      throw new Error('Invalid Email!');
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error('Invalid Password');
    }
    return user;
  }
};

module.exports = userService;
