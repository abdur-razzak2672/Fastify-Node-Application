const authController = require('../controllers/authControllers');
const userRoleController = require('../controllers/userRoleControllers'); 

async function authRoutes(fastify, options) {
  fastify.post('/register', authController.register);
  fastify.post('/login', authController.login);
  // fastify.get('/roles',userRoleController.getAllRoles);

 

}

module.exports = authRoutes;
