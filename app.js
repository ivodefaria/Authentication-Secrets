//jshint esversion:8

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const User = require(__dirname + "/User.js");
const md5 = require("md5");

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
  const newUser = new User({
    email: req.body.username,
    password: md5(req.body.password)
  });

  try {
    await newUser.save();
    res.render("secrets");
  } catch (e) {
    console.error(e);
  }
});

app.post("/login", async(req, res) => {
  const username = req.body.username;
  const password = md5(req.body.password);

  try {
    const foundUser = await User.findOne({email: username});
    if(foundUser){
      if(foundUser.password === password){
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
