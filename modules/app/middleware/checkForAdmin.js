var HttpError = require('../error').HttpError;

module.exports = function(req, res, next) {
  if (req.session.user && req.session.role === "admin") {
    return next();
  }
  return next(new HttpError(404, " Not Found")); //fixed message for protection
};
