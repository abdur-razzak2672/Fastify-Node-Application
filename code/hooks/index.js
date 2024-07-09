
  
 async function preHandler(request, reply) {
  console.log(`PreHandler request for ${request.url}`);
  
  // Skip authorization for specific endpoints
  // if (request.url !== '/api/v1/register' && 
  //     request.url !== '/api/v1/login' && 
  //     request.url !== '/api/v1/users' &&
  //     request.url !== '/api/v1/blogs') {
    
  //   try {
  //     await request.jwtVerify();
  //   } catch (err) {
  //     reply.code(401).send({ error: 'Unauthorized' });
  //     return;
  //   }
  // }
  
  console.log(`Request body: ${JSON.stringify(request.body)}`);
}
 
  module.exports = {
     preHandler,
  };
  