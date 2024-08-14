// middlewares/authMiddleware.js
const { expressjwt: jwt } = require("express-jwt");
const jwksRsa = require("jwks-rsa");

// Middleware для проверки JWT
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://dev-awo008t8vaosjt2m.us.auth0.com/.well-known/jwks.json`,
  }),
  audience: "https://dev-awo008t8vaosjt2m.us.auth0.com/api/v2/",
  issuer: `https://dev-awo008t8vaosjt2m.us.auth0.com/`,
  algorithms: ["RS256"],
});

function logJwtError(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    console.error("JWT Error:", err);
    res.status(401).send("Invalid token");
  } else {
    next(err);
  }
}

module.exports = { checkJwt, logJwtError };
