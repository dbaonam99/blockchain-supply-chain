const mongoose = require('mongoose');

var userSchema = new mongoose.Schema(
  {
    create_at: Date,
    privateKey: String,
    address: String,
    name: String,
    user: String,
    role: String,
    password: String,
    refreshToken: String,
  },
  {
    versionKey: false,
  }
);

var User = mongoose.model('User', userSchema, 'user');

module.exports = User;
