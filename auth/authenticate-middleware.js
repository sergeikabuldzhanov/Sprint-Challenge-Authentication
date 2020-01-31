/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).end();
      } else {
        req.decodedToken = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({ you: "Missing authorization headers" });
  }
};
