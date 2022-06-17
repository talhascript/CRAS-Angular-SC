const jwt = require("jsonwebtoken");

// example req.user:
// {
//   userID: 1,
//   username: 'admin',
//   userType: 'admin',
//   studentID: null
// }

module.exports.UserAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    try {
      const jwtToken = authHeader.split(" ")[1];
      const result = jwt.verify(jwtToken, process.env.JWT_SECRET);
      req.user = result.user;
      next();
    } catch (error) {
      //403 forbidden (got token but now valid) / no permission
      return res.sendStatus(403);
    }
  } else {
    //401 unauthorized
    return res.sendStatus(401);
  }
};

module.exports.AdminAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    try {
      const jwtToken = authHeader.split(" ")[1];
      const result = jwt.verify(jwtToken, process.env.JWT_SECRET);
      if (result.user.userType != "admin") return res.sendStatus(403);
      req.user = result.user;
      next();
    } catch (error) {
      //403 forbidden (got token but now valid) / no permission
      return res.sendStatus(403);
    }
  } else {
    //401 unauthorized
    return res.sendStatus(401);
  }
};
