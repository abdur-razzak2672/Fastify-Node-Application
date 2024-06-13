 const UserRole = require('../models/userRoleModel');

exports.getAllUserRoles = async () => {
  const userRoles = await UserRole.findAll();
  return userRoles;
}

exports.createUserRole = async (roleData) => {
    const newRole = await UserRole.create(roleData);
    return newRole;
    }

exports.deleteRole = async (id) => {
    const role = await UserRole.findByPk(id);
    if (!role) return false;
    await role.destroy();
    return true;
}

exports.exsistingRole = async (role) => {
    const existingRole = await UserRole.findOne({ where: { role } });
    return existingRole;
}