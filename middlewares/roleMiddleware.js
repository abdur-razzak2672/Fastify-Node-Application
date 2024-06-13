const roleMiddleware = (allowedRoles) => {
    return async (request, reply, done) => {
      const token = request.headers['authorization'].split(' ')[1];
      try {
        const decoded = request.server.jwt.verify(token);
        request.user = decoded;
        if (!allowedRoles.includes(request.user.role)) {
          reply.status(403).send({
            status: 'error',
            statusCode: 403,
            message: 'Forbidden: You do not have access to this resource'
          });
          return;
        }
        done();
      } catch (error) {
        reply.status(401).send({
          status: 'error',
          statusCode: 401,
          message: 'Unauthorized: Invalid or expired token'
        });
      }
    };
  };
  
  module.exports = roleMiddleware;
  