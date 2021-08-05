const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/loginUsers', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('Database connected')
})

module.exports = mongoose;