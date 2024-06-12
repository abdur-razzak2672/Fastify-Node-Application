const fastify = require('fastify')({ logger: true });
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const { errorHandler } = require('./utils/errorHandler');
const Hooks = require('./hooks');
fastify.addHook('onRequest', Hooks.onRequest);
fastify.addHook('preHandler', Hooks.preHandler);
fastify.addHook('onResponse', Hooks.onResponse);
fastify.addHook('preSerialization', Hooks.preSerialization);
fastify.addHook('preParsing', Hooks.preParsing);
fastify.addHook('onError', Hooks.onError);
fastify.addHook('onSend', Hooks.onSend);


 fastify.register(userRoutes,authRoutes);
 fastify.register(require('fastify-jwt'), {
  secret: 'supersecretkey' 
});

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
