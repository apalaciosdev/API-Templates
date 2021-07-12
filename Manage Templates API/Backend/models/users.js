'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    nombre: String,
    apellidos: String,
    date: { type: Date, default: Date.now },
    image: String
});

module.exports = mongoose.model('UserSchema', UserSchema);