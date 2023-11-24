const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeaders = req.headers["authorization"];

  if (!authHeaders) {
    return res.status(401).send({ error: "You're not logged in!" });
  }

  const token = authHeaders.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decode) => {
    if (err) {
      return res.status(403).send({ error: "Forbidden!" });
    }

    req.user = { userId: decode.userId };
    next();
  });
};

module.exports = { verifyJWT };
