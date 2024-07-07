const fastify = require('fastify')({ logger: true });
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const roleRoutes = require('./routes/userRoleRoutes');
const blogRoutes = require('./routes/blogRoutes');
const { errorHandler } = require('./utils/errorHandler');
const Hooks = require('./hooks');
const path = require('path');

 
fastify.register(require('@fastify/multipart'));
fastify.register(require('@fastify/jwt'), {
  secret: 'supersecret'
});
fastify.register(userRoutes, { prefix: '/api/v1' });
fastify.register(authRoutes, { prefix: '/api/v1' });
fastify.register(roleRoutes, { prefix: '/api/v1' });
fastify.register(blogRoutes, { prefix: '/api/v1' });

// Set error handler
fastify.setErrorHandler(errorHandler);
 fastify.addHook('preHandler', Hooks.preHandler);





 fastify.setErrorHandler(errorHandler);

 const start = async () => {
  try {
    await fastify.listen(3000);
    console.log('Server listening at http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();

// new commit to chk revert
// back with reset
