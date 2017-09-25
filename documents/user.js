const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
  firstName: String,
  lastName: String,
  job: String,
  phone: String,
});

module.exports = mongoose.model('user', User );