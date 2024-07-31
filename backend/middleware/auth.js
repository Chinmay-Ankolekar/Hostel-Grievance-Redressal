const jwt = require("jsonwebtoken");

const authorizeWarden = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log("here", req.headers,token);
    const decodedToken = jwt.verify(token, process.env.JWTSECRET);
    console.log(decodedToken)
    if (decodedToken.user.type === "warden") {
      return next();
    } else {
     return res.status(403).json({ error: "only warden can access" });
    }

  } catch (err) {
    console.error("here1",err.message);
    return res.status(401).json({ error: "Unauthorized" });
  }
};

const authorizeStudent = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log("here", req.headers,token);
    const decodedToken = jwt.verify(token, process.env.JWTSECRET);
    console.log(decodedToken)
    if (decodedToken.user.type === "student") {
      return next();
    } else {
     return res.status(403).json({ error: "Unauthorized for Student" });
    }

  } catch (err) {
    console.error("here13",err.message);
    return res.status(401).json({ error: "Unauthorized" });
  }
};

const authorizeComplaintRoute = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log("here", req.headers, token);
    const decodedToken = jwt.verify(token, process.env.JWTSECRET);
    console.log(decodedToken);

    return next();
  } catch (err) {
    console.error("here11", err.message);
    return res.status(401).json({ error: "Unauthorized" });
  }
};


module.exports = {
  authorizeWarden,
  authorizeStudent,
  authorizeComplaintRoute
};
