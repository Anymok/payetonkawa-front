const jwt = require("jsonwebtoken");
const { getSecret } = require('./secrets');
const dotenv = require('dotenv');

dotenv.config();
const isAppEngine = process.env.GAE_ENV === 'standard';

module.exports = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.split(" ")[1];

    let publicKey;
    if (!isAppEngine) {
      publicKey = `-----BEGIN PUBLIC KEY-----\n${process.env.KEYCLOAK_PUBLIC_KEY}\n-----END PUBLIC KEY-----`;
    } else {
      const secretJson = await getSecret();
      const secretConfig = JSON.parse(secretJson);
      publicKey = `-----BEGIN PUBLIC KEY-----\n${secretConfig.KEYCLOAK_PUBLIC_KEY}\n-----END PUBLIC KEY-----`;
    }

    const decodedToken = await jwt.verify(token, publicKey, {
      algorithms: ["RS256"],
    });
    req.tokenData = decodedToken;

    next();
  } catch (error) {
    next(error);
  }
};
