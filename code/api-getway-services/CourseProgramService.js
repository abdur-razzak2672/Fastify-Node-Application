const fp = require('fastify-plugin');
const fastifyHttpProxy = require('fastify-http-proxy');

async function courseProgramServicePlugin(fastify, options) {
  fastify.register(fastifyHttpProxy, {
    upstream: 'http://localhost:4001',
    prefix: '/api/v1', 
    rewritePrefix: '/api/v1',
  });
}
module.exports = fp(courseProgramServicePlugin);
