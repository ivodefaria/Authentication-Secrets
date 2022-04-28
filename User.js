// jshint esversion: 8

require("dotenv").config();
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

module.exports = mongoose.model("User", userSchema);
