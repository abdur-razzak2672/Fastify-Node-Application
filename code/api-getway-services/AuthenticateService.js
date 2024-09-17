const fp = require('fastify-plugin');
const fastifyHttpProxy = require('fastify-http-proxy');

async function authenticateServicePlugin(fastify, options) {
  fastify.register(fastifyHttpProxy, {
    upstream: 'http://localhost:4000',
    prefix: '/service2', 
    rewritePrefix: '/service2',
  });
}

module.exports = fp(authenticateServicePlugin);
