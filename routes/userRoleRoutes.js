
const userRoleController = require('../controllers/userRoleControllers');

async function roleRoutes(fastify,option){
    fastify.get('/roles',userRoleController.getAllRoles);
    // fastify.get('/roles/:id',userRoleController.getRoleById);
      fastify.post('/roles',userRoleController.createUserRole);
    // fastify.put('/roles/:id',userRoleController.updateRole);
     fastify.delete('/roles/:id',userRoleController.deleteRole);
}

module.exports = roleRoutes;