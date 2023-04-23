const notFound = (req, res, next) => {
  const err = new Error(`Not Found -> ${req.originalUrl}`);
  res.status(404);
  next(err);
};

const errHandler = (err, req, res, next) => {
  res.status(res.statusCode);
  res.json({
    message: err.message,
  });
};

module.exports = { notFound, errHandler };
