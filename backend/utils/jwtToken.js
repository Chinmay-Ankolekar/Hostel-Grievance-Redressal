const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(user_id, type) {
  const payload = {
    user: {
      user_id,
      type
    }
  };
  
  return jwt.sign(payload, process.env.JWTSECRET, { expiresIn: "1h" });
}

function jwtDecoder(token){
    jwt.verify(token, process.env.JWTSECRET, function(err, decoded) {
        console.log(err, decoded)
    });
}

exports.jwtDecoder = jwtDecoder;
exports.jwtGenerator = jwtGenerator;