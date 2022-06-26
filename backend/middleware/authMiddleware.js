const jwt = require("jsonwebtoken");



module.exports.UserAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    try {
      const jwtToken = authHeader.split(" ")[1];
      const result = jwt.verify(jwtToken, process.env.JWT_SECRET);
      req.user = result.user;
      next();
    } catch (error) {
      
      return res.sendStatus(403);
    }
  } else {
    
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
      
      return res.sendStatus(403);
    }
  } else {
    
    return res.sendStatus(401);
  }
};
