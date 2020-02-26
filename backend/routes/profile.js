const express = require("express");
const router = require("express").Router();
const auth = require("../middlewares/auth");

// item model
const Profile = require("../models/profile.model");

router.route("/").get((req, res) => {
    Profile.find()
        .then(Profile => res.json(Profile))
        .catch(err => res.status(400).json("Error:" + err));
});

// router.route("/add").post( auth, (req, res) => {
router.post("/add", (req, res) => {
    const username = req.body.username;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const phonenumber = Number(req.body.phonenumber);
    const email = req.body.email;

    const newProfile = new Profile({
        username,
        firstname,
        lastname,
        phonenumber,
        email
    });

    newProfile
        .save()
        .then(() => res.json("Profile added!"))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
    Profile.findById(req.params.id)
        .then(profile => res.json(profile))
        .catch(err => res.status(400).json("Error:" + err));
});

// router.route("/:id").delete( auth, (req, res) => {
router.post("/:id", (req, res) => {
    Profile.findByIdAndDelete(req.params.id)
        .then(profile => res.json("Profile deleted."))
        .catch(err => res.status(400).json("Error:" + err));
});

// router.route("/update/:id").post(auth, (req, res) => {
router.post("/update/:id", (req, res) => {
    Profile.findById(req.params.id)
        .then(profile => {
            profile.username = req.body.username;
            profile.lasttname = req.body.lastname;
            profile.phonenumber = req.body.phonenumber;
            profile.email = req.body.email;
            profile
                .save()
                .then(() => res.json("Profile updated!"))
                .catch(err => res.status(400).json("Error: " + err));
        })
        .catch(err => res.status(400).json("Error:" + err));
});

module.exports = router;
