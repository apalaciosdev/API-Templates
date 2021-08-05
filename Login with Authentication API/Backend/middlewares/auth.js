const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  try{
    const token = req.headers.authorization
    const decoded = jwt.verify(token, process.env.KEY)
    req.userData = decoded
    next()
  } 
  
  catch(error){
    return res.sendStatus(401)
  }
};