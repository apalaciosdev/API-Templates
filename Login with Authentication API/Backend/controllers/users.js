const express = require('express');
const router = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middlewares/auth');
require('dotenv').config();



const User = require('../models/user');


var usersController = {

  //registration
  userRegistration: (req, res) => {
    User.find({ email: req.body.email })
      .exec()
      .then(users => {
        if (users.length >= 1) {
          return res.status(409).json({
            message: 'email already taken'
          })
        }
        else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({ error: err })
            }
            else {
              const user = new User({ 
                email: req.body.email,
                password: hash
              })
              user.save()
                .then(result => res.sendStatus(201))
                .catch(err => res.status(500).json({ error: err }))
            }
          })
        }

      })
  },


  //user deletion                   
  userDelete: (req, res) => {
    User.remove({ _id: req.params.userId })
      .exec()
      .then(response => {
        res.status(200).json({ message: 'User deleted' })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({ error: err })
      })
  },


  //loggin in
  userLogin: (req, res) => {
    User.find({ email: req.body.email })
      .exec()
      .then(users => {
        if (users.length < 1) {
          return res.sendStatus(404).json({ message: 'The user doesnt exists' })
        }
        bcrypt.compare(req.body.password, users[0].password, (err, isEqual) => {
          if (err) return res.sendStatus(401)
          if (isEqual) {
            //create a token
            const token = jwt.sign({
              email: users[0].email,
              userId: users[0]._id
            },
              process.env.KEY,
              {
                expiresIn: '1h'
              }
            )

            return res.status(200).json({
              message: 'Authorization successful',
              token: token
            })
          }
          res.sendStatus(401)
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({ error: err })
      })
  }
};

module.exports = usersController;