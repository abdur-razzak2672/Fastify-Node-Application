// services/userServices.js
const User = require('../models/userModel');

 
exports.getAllUsers = async () => {
    const users = await User.findAll();
  return users;
};

exports.getUserById = async (id) => {
    const foundUser = await User.findByPk(id); 
    return foundUser;
  };
exports.createUser = async (userData) => {

  const createdUser = await User.create(userData);
 
  return createdUser;
};
exports.findUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

exports.updateUser = async (id, userData) => {
  // const index = users.findIndex(user => user.id === parseInt(id));
  // if (index === -1) return null;

  // users[index] = {
  //   ...users[index],
  //   ...userData,
  // };
  // return users[index];
  const user = await User.findByPk(id);
  if (!user) return null;

  await user.update(userData);
  return user;

};

exports.deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) return false;

  await user.destroy();
  return true;

 };
