'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var PORT = 2022;


app.listen(PORT, (req,res) => {
  console.log('Server running on port ', PORT)
});