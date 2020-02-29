const express = require("express");
const router = require("express").Router();
const auth = require("../middlewares/auth");
const multer = require("multer");

// item model
const Message = require("../models/message.model");

// linking userprofile to the user
router.get("/myinfo", auth, async (req, res) => {
  try {
    const message = await Massage.findOne({
      user: req.user.id
    }).populate("user");

    if (!message) {
      return res.status(400).json({ msg: "There is no comment from this user" });
    }

    res.json(message);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error....");
  }
});

// router.route("/add").post( auth, (req, res) => {
router.post("/user", (req, res) => {
  const comment = req.body.comment;
  

  const newMessage = new Message({
    comment
  });

  newMessage
    .save()
    .then(() => res.json("Thanks for your point of view"))
    .catch(err => res.status(400).json("Error: " + err));
});


module.exports = router;
