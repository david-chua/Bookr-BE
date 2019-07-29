const jwt = require('jsonwebtoken');
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/usersModel");
const jwtKey = process.env.JWT_SECRET;
const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);
module.exports = {
  authenticate,
  authAndFindUser
};

async function authenticate(token){
   // verify the auth token
  const decoded = jwt.verify(token, jwtKey);
   //check if user exists in database
  const [user] = await checkIfUserExists(decoded.email);

  return user;
}

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
