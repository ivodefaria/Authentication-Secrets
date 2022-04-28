// jshint esversion: 8

const mongoose = require('mongoose');
const encrypt = require("mongoose-encryption");

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

const secret = "Thisisourlittlesecret.";

userSchema.plugin(encrypt, {secret: secret, encryptedFields: ["password"]});

module.exports = mongoose.model("User", userSchema);
