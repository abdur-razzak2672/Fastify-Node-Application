
const userRoleController = require('../controllers/userRoleControllers');
const roleMiddleware = require('../middlewares/roleMiddleware');


async function roleRoutes(fastify,option){
  fastify.get('/roles', { preHandler: roleMiddleware(['superAdmin', 'admin', 'user']) }, userRoleController.getAllRoles);
  fastify.post('/roles', { preHandler: roleMiddleware(['superAdmin', 'admin']) }, userRoleController.createUserRole);
  fastify.delete('/roles/:id', { preHandler: roleMiddleware(['superAdmin']) }, userRoleController.deleteRole);
}

module.exports = roleRoutes;