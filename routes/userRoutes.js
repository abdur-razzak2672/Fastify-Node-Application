const userController = require('../controllers/userControllers');
const Hooks = require('../hooks');


async function routes(fastify, options) {
  fastify.get('/users', userController.getUsers);
  fastify.get('/users/:id', userController.getUserById);
  fastify.post('/users', userController.createUser);
  fastify.put('/users/:id', userController.updateUser);
  fastify.delete('/users/:id', userController.deleteUser);
}

module.exports = routes;
