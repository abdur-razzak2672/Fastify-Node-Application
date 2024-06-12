const User = require('./userModel');
const UserRole = require('./userRoleModel');

User.belongsTo(UserRole, { foreignKey: 'roleId', as: 'role' });
UserRole.hasMany(User, { foreignKey: 'roleId' });

module.exports = { User, UserRole };


 