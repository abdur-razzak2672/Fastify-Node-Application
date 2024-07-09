 const User = require('../models/userModel');
 const UserRole = require('../models/userRoleModel');

 exports.getAllUsers = async () => {
  try {
    console.log('Fetching all users...');
    const users = await User.findAll({
      include: [{
        model: UserRole,
        attributes: ['id','role'] 
      }],
      attributes: { exclude: ['password', 'createdAt', 'updatedAt','roleId'
      ] }  
    });
    console.log('Users fetched successfully:', users);
    return users;
  } catch (error) {
    console.error('Error fetching users:', error.message);
    console.error('Stack trace:', error.stack);
    throw error;  
  }
}

exports.getUserById = async (id) => {
    // const foundUser = await User.findByPk(id); 
    // return foundUser;

    const foundUser = await User.findByPk(id, {
      include: [{
        model: UserRole,
        attributes: ['id', 'role']
      }],
      attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'roleId'] }
    });


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
