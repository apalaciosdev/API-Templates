const db = require('../database');

const userScheema = new db.Schema({
  email: {type: String, require: true},
  password: {type: String, require: true}
}, {timestamps: true})

const User = db.model('User', userScheema);

module.exports = User;