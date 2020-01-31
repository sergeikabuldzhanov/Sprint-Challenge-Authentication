const jwt = require("jsonwebtoken");
module.exports = function(user) {
  //make a payload
  const payload = {
    sub: user.id,
    username: user.username
  };
  //options for jwt
  const options = {
    expiresIn: "8h"
  };
  //create token
  const token = jwt.sign(payload, process.env.JWT_SECRET, options);
  return token;
};
