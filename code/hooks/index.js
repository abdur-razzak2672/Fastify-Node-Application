
  
 async function preHandler(request, reply) {  
   if (request.url !== '/api/v1/register' && 
      request.url !== '/api/v1/login' && 
      request.url !== '/api/v1/users' &&
      request.url !== '/api/v1/blogs') {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.code(401).send({ error: 'Unauthoddddddrized' });
      return;
    }
  }
}



// async function onRequest(request, reply) {
//   console.log(`Received request for ${request.url}`);
//   console.log(`Request method: ${request.method}`);
//   console.log(`Request headers: ${JSON.stringify(request.headers)}`);
// }

 

// async function onResponse(request, reply) {
//   console.log(`response request for ${request.url}`);
//   console.log(`Request method: ${request.method}`);
//   console.log(`Request headers: ${request.headers['authorization']}`);
// }

// async function preSerialization(request, reply, payload) {
//   console.log('preSerialization hook', payload);
//   payload.timestamp = Date.now();
//   return payload;
// }

// async function preParsing(request, reply, payload) {
//   console.log('preParsing hook', request.body);
//   return payload;
// }

// async function onError(request, reply) {
//   console.log('onError hook');
//   console.log('Request body:', request.body);
// }

// function onSend(request, reply, payload, done) {
//   const err = null;
//   console.log('onSend hook');
//   const newPayload = payload.replace('md', 'md111111');
//   console.log('Request body:', done);
//   done(err, newPayload);
// }



module.exports = {
  preHandler,
  // onResponse,
  // preSerialization,
  // preParsing,
  // onError,
  // onSend,  
  // onRequest,

};

  