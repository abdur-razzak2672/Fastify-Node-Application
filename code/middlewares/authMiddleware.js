module.exports = (req, reply, done) => {
    const token = req.headers['authorization'];
    if (!token || token !== 'Bearer mysecrettoken') {
      reply.status(401).send({ error: 'Unauthorized' });
    } else {
      done();
    }
  };
  