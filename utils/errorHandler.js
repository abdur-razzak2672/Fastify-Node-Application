exports.errorHandler = (error, request, res) => {
    request.log.error(error);
    const status = error.statusCode || 500;
    res.status(status).send({
      error: error.message,
      statusCode: status
    });
  };
  