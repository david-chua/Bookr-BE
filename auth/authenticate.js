const jwt = require('jsonwebtoken');
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/usersModel");
const jwtKey = process.env.JWT_SECRET;
const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);
module.exports = {
  generateToken,
  authenticate,
  authAndFindUser
};

function generateToken(user){
  const payload = {
    subject: user.id,
    username: user.username
  };

  const options = {
    expiresIn: '1d'
  };

  return jwt.sign(payload, jwtKey, options)
};

function authenticate(req, res, next) {
  const jwttoken = req.get('Authorization');

  if(jwttoken){
    jwt.verify(jwttoken, jwtKey, (err, decoded) => {
      if (err) return res.status(401).json(err);

      req.decodedJwt = decoded;

      next();
    });
  } else {
    return res.status(401).json({
      error: 'No token provided, must be set on the Authorization Header'
    });
  };
};

async function authAndFindUser(token){
 // verify the auth token
 const googleUser = await verifyAuthToken(token);
 //check if user exists in database
 const [user] = await checkIfUserExists(googleUser.email);

 return user;
};

const verifyAuthToken = async token => {
 try {
   const ticket = await client.verifyIdToken({
     idToken: token,
     audience: process.env.OAUTH_CLIENT_ID
   });
   return ticket.getPayload();
 } catch (err) {
   console.error("Error verifying auth token", err);
 }
};

const checkIfUserExists = async email => await User.findBy({ email: email });
