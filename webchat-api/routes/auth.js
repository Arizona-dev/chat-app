const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const middleware = require('../middlewares/index');

// To put in a config file
const rounds = 12;
const tokenSecret = 'S3c43Ttwj';

router.post('/login', (req, res) => {
  User.findOne({email: req.body.email})
  .then(user => {
    if(!user) res.status(404).json({error: 'Email or Password incorrect.'})
    else {
      bcrypt.compare(req.body.password, user.password, (error, match) => {
        if (error) res.status(500).json(error)
        else if (match) res.status(200).json({token: generateToken(user)})
        else res.status(403).json({error: 'Email or Password incorrect.'})
      });
    }
  })
  .catch(error => {
    res.status(500).json(error);
  })
});

router.post('/register', (req, res) => {
  bcrypt.hash(req.body.password, rounds, (error, hash) => {
    if (error) res.status(500).json(error)
    else {
      const newUser = User({name: req.body.name, firstname: req.body.firstname, email: req.body.email, password: hash});
      newUser.save()
        .then((user) => {
          res.status(200).json({token: generateToken(user)});
        })
        .catch((error) => {
          console.log(error)
          res.status(500).json(error);
        });
    }
  });
});

router.get('/api/auth/jwt-verify', middleware.verify, (req, res) => {
  res.status(200).json(req.user);
});

function generateToken(user) {
  return jwt.sign({data: user}, tokenSecret, {expiresIn: '24h'});
}

module.exports = router;