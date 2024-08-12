const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500).json({
      message: err.message || 'Server Error',
      stack: process.env.NODE_ENV === 'development' ? err.stack : null,
    });
  };
  
  module.exports = errorHandler;
  