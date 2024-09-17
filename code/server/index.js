const fastify = require('fastify')({ logger: true });
const fastifyHttpProxy = require('@fastify/http-proxy');
const path = require('path');
const Hooks = require('../hooks');
// Register plugins
fastify.register(require('@fastify/rate-limit'), {
  max: 100,
  timeWindow: '1 minute',
});
fastify.addHook('preHandler', Hooks.preHandler);

fastify.register(fastifyHttpProxy, {
  upstream: 'http://localhost:4001',
  prefix: '/admin/api/v1',
   rewritePrefix: '/admin/api/v1',

});

fastify.register(fastifyHttpProxy, {
    upstream: 'http://localhost:5000',
    prefix: '/api/v1',
     rewritePrefix: '/api/v1',
     
  });

// Register services
// fastify.register(require('../api-getway-services/CourseProgramService'));
// Uncomment and add other services as needed
// fastify.register(require('../api-getway-services/AuthenticateService'));
// fastify.register(require('../api-getway-services/PaymentService'));

// Start server
fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`API Gateway running at ${address}`);
});
