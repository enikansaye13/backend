const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");

let     User = require("../models/user.model");

// post/api users/auth
// register auth user
router.route("/").get((req, res) => {
  User.findById(req.params.id)
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

// router.route("/").post((req, res) => {
    router.post("/", auth, (req, res)=>{
  const { email, password } = req.body;

  // validation
  if (!email || !password) {
    return res.status(400).json({ msg: "please enter all fields" });
  }

  // check existing user
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }

// validate password
bcrypt.compare(password, user.password).then(isMatch => {
  if (!isMatch) return res.status(400).json({ msg: "invalid credentials" });


  jwt.sign(
    { id: user.id },
    config.get("jwtSecret"),
    { expiresIn: 3600 },
    (err, token) => {
      if (err) throw err;
      res.json({
        token,
        user:{
          id: user.id,
          username: user.username,
          email: user.email
          
        }
      }
      );
    }
  );
});

    
  });

  

});
// post/api users/auth
// register auth user
// private
router.get("/user", auth,(req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user));
});
// returning all users
router.get("/users", auth,(req, res) => {
  User.find(req.user.id)
    .select("-password")
    .then(user => res.json(user));
});

module.exports = router;
