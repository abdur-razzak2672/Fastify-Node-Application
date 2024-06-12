const roleService = require('../services/userRoleServices');

async function getAllRoles(req, reply){
    try {
        const roles = await roleService.getAllUserRoles();
        reply.status(200).send({
            status: 'success',
            statusCode: 200,
            data: roles
        });
    } catch (error) {
        reply.status(500).send({
            status: 'error',
            statusCode: 500,
            message: 'Internal Server Error'
        });
    }
}

async function createUserRole(req, reply){
    try {
        const { role } = req.body;
        if (!role) {
            reply.status(400).send({
                status: 'error',
                statusCode: 400,
                message: 'All fields are required'
            });
            return;
        }
        const newRole = await roleService.createUserRole({ role });
        reply.status(201).send({
            status: 'success',
            statusCode: 201,
            message: 'Role created successfully',
            data: newRole
        });
    } catch (error) {
        reply.status(500).send({
            status: 'error',
            statusCode: 500,
            message: 'Internal Server Error'
        });
    }
}

async function deleteRole(req, reply){
    try {
        const { id } = req.params;
        const role = await roleService.deleteRole(id);
        reply.status(200).send({
            status: 'success',
            statusCode: 200,
            message: 'Role deleted successfully',
            data: role
        });
    } catch (error) {
        reply.status(500).send({
            status: 'error',
            statusCode: 500,
            message: 'Internal Server Error'
        });
    }
}




module.exports = {
    getAllRoles,
    createUserRole,
    deleteRole
}