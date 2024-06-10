const userService = require('../services/userServices');
const authServices = require('../services/authServices');
const fastify = require('fastify')({ logger: true });

async function authRoutes(fastify, options) {
    // fastify.addHook('preHandler', async (request, reply) => {
    //     try {
    //       await request.jwtVerify();
    //     } catch (err) {
    //       reply.send(err);
    //     }
    //   });
      
  fastify.post('/register', async (request, reply) => {
    const { firstName, lastName, email, password } = request.body;
    try {
      const user = await authServices.registerUser({ firstName, lastName, email, password });
      reply.status(201).send(user);
    } catch (error) {
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });

  fastify.post('/login', async (request, reply) => {
    const { email, password } = request.body;
    try {
      const user = await authServices.authenticateUser({ email, password });
      const token = fastify.jwt.sign({ id: user.id, email: user.email });

      console.log('User======================================:', fastify.jwt.decode(token));
      reply.send({ 
        user: { id: user.id, email: user.email }, 
        token
       });
    } catch (error) {
      reply.status(403).send({ error: 'Invalid username or password' });
    }
  });
}

module.exports = authRoutes;
