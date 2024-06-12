const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const UserRole = sequelize.define('UserRole', {
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = UserRole;
