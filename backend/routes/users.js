const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require('../middlewares/auth')

let User = require("../models/user.model");

// get/api users
// register new  users
router.get('/', (res,req) =>{
// router.route("/").get((req, res) => {
  User.find()
    .then(user => res.json(user))
    .catch(err => res.status(400).json("Error: " + err));
});
router.get('/:_id',(req, res) =>{
// router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error:" + err));
});


// router.route("/add").post((req, res) => {
  router.post('/add', (req, res) => {
  const { username, email, password } = req.body;

  // validation
  if (!username || !email || !password) {
    return res.status(400).json({ msg: "please enter all fields" });
  }

  // check existing user
  User.findOne({ email }).then(user => {
    if (user) {
      return res.status(400).json({ msg: "User already exist" });
    }

      const newUser = new User({
        username,
        email,
        password
      });
    
    // create salt and hash
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save().then(user => {
        jwt.sign(
          { id: user.id },
          config.get("jwtSecret"),
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.json(
              {
             token,
              user: {
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

  });

  
  
  // newUser.save()
  // .then(() => res.json ('User added!'))
  // .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
