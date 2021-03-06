const express = require('express');
const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { authenticate } = require('./../../auth/authenticate.js');
const Users = require('./../../models/usersModel.js');

const server = express.Router();

const jwtKey = process.env.JWT_SECRET;

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

server.post('/register', (req,res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10)
  user.password = hash;

  Users.add(user)
    .then(saved => {
      const token = generateToken(user);
      res.status(201).json({
        id: saved.id,
        token,
        message: `Welcome ${user.username}`
      });
    })
    .catch(error => {
      console.log(error)
      res.status(500).json(error);
    });
});

server.post('/login', (req,res) => {
  let { username, password } = req.body;
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)){
        const token = generateToken(user);
        return token;
      } else {
        res.status(401).json({message: 'Invalid Credentials'})
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = server;
