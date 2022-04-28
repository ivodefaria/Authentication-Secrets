//jshint esversion:8

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const User = require(__dirname + "/User.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect('mongodb://localhost:27017/userDB');

app.get("/", function(req, res){
  res.render("home");
});

app.get("/login", function(req, res){
  res.render("login");
});

app.get("/register", function(req, res){
  res.render("register");
});

app.post("/register", async(req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const newUser = new User({
      email: req.body.username,
      password: hashedPassword
    });

    await newUser.save();
    res.render("secrets");
  } catch (e) {
    console.error(e);
  }
});

app.post("/login", async(req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const foundUser = await User.findOne({email: username});
    if(foundUser){
      const passwordValid = await bcrypt.compare(password, foundUser.password);
      if(passwordValid){
        res.render("secrets");
      }
    }
  } catch (e) {
    console.error(e);
  }
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
