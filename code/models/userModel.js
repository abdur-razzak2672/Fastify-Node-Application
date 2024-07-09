const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const UserRole = require('./userRoleModel');

const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  roleId: {
    type: DataTypes.INTEGER,
    references: {
      model: UserRole,
      key: 'id',
    },
  },
});

User.belongsTo(UserRole, { foreignKey: 'roleId' });
 UserRole.hasMany(User, { foreignKey: 'roleId' });

module.exports = User;
