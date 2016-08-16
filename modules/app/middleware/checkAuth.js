var HttpError = require('../error').HttpError;

module.exports = function(req, res, next) {
  if (req.session.admin === "bruce_wayne") {
    return next();
  }
  return next(new HttpError(401, "You are not admin!"));
};
