const express = require("express");
const router = require("express").Router();
const auth = require("../middlewares/auth");

// item model
const Exercise = require("../models/exercise.model");

router.route("/").get((req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json("Error:" + err));
});

// router.route("/add").post( auth, (req, res) => {
router.post("/add", auth, (req, res) => {
  const username = req.body.username;
  const clientid = req.body.clientid;
  const incident = req.body.incident;
  const date = Date.parse(req.body.date);
  const time = req.body.time;
  const status = req.body.status;
  const description = req.body.description;
  const location = req.body.description
  const duration = Number(req.body.duration);

  const newExercise = new Exercise({
    username,
    clientid,
    incident,
    date,
    time,
    status,
    description,
    location,
    duration
  });

  newExercise
    .save()
    .then(() => res.json("Exercise added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json("Error:" + err));
});

// router.route("/:id").delete( auth, (req, res) => {
router.post("/:id", auth, (req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(exercise => res.json("Exercise deleted."))
    .catch(err => res.status(400).json("Error:" + err));
});

// router.route("/update/:id").post(auth, (req, res) => {
router.post("/update/:id", auth, (req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      exercise.username = req.body.username;
      exercise.clientid = req.body.clientid;
      exercise.incident = req.body.incident;
      exercise.date = Date.parse(req.body.date);
      exercise.time = req.body.time;
      exercise.status = req.body.status;
      exercise.description = req.body.description;
      exercise.location = req.body.location;
      exercise.duration = Number(req.body.duration);

      exercise
        .save()
        .then(() => res.json("Exercise updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error:" + err));
});

module.exports = router;
