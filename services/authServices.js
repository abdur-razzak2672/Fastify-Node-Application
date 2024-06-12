const bcrypt = require('bcrypt');
 const User = require('../models/userModel');
const userService = {
  registerUser: async (userData) => {
    const user = await User.create(userData);
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
