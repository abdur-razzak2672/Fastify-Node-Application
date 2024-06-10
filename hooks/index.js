
async function onRequest(request, reply) {
    console.log(`Received request for ${request.url}`);
    console.log(`Request method: ${request.method}`);
    console.log(`Request headers: ${JSON.stringify(request.headers)}`);
  }
  
  async function preHandler(request, reply) {
    console.log(`preHandler request for ${request.url}`);
    if (request.url !== '/register' && request.url !== '/login' && request.url !== '/users') {
      try {
        await request.jwtVerify();
      } catch (err) {
        reply.code(401).send({ error: 'Unauthorized ----' });
        return;
      }
    }
    console.log(`Request body: ${JSON.stringify(request.body)}`);
  }
  
  async function onResponse(request, reply) {
    console.log(`response request for ${request.url}`);
    console.log(`Request method: ${request.method}`);
    console.log(`Request headers: ${request.headers['authorization']}`);
  }
  
  async function preSerialization(request, reply, payload) {
    console.log('preSerialization hook', payload);
    payload.timestamp = Date.now();
    return payload;
  }
  
  async function preParsing(request, reply, payload) {
    console.log('preParsing hook', request.body);
    return payload;
  }
  
  async function onError(request, reply) {
    console.log('onError hook');
    console.log('Request body:', request.body);
  }
  
  function onSend(request, reply, payload, done) {
    const err = null;
    console.log('onSend hook');
    const newPayload = payload.replace('md', 'md111111');
    console.log('Request body:', done);
    done(err, newPayload);
  }
  
  module.exports = {
    onRequest,
    preHandler,
    onResponse,
    preSerialization,
    preParsing,
    onError,
    onSend,
  };
  