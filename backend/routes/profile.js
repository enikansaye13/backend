const express = require("express");
const router = require("express").Router();
const auth = require("../middlewares/auth");
const multer = require("multer");

// item model
const Profile = require("../models/profile.model");

router.route("/").get((req, res) => {
  Profile.find()
    .then(Profile => res.json(Profile))
    .catch(err => res.status(400).json("Error:" + err));
});

// linking userprofile to the user
router.get("/myinfo", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate("user");

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error....");
  }
});

// router.route("/add").post( auth, (req, res) => {
router.post("/add", (req, res) => {
  const username = req.body.username;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const phonenumber = Number(req.body.phonenumber);
  const email = req.body.email;
  const picture = req.body.picture;

  const newProfile = new Profile({
    username,
    firstname,
    lastname,
    phonenumber,
    email,
    picture
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
    .then(Profile => res.json("Profile deleted."))
    .catch(err => res.status(400).json("Error:" + err));
});

// router.route("/update/:id").post(auth, (req, res) => {
router.post("/update/:id", (req, res) => {
  Profile.findById(req.params.id)
    .then(profile => {
      profile.username = req.body.username;
      profile.lasttname = req.body.lastname;
      profile.phonenumber = req.body.phonenumber;
      profile.email = req.body.email,
      profile.picture = req.body.picture
    
        .save()
        .then(() => res.json("Profile updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error:" + err));
});
// uploading image with multer
const upload = multer();
router.post("/uploadphoto", upload.single("avatar"), (req, res) => {
  var img = fs.readFileSync(req.file.path);
  var encode_image = img.toString("base64");
  // Define a JSONobject for the image attributes for saving to database

  var finalImg = {
    contentType: req.file.mimetype,
    image: new Buffer(encode_image, "base64")
  };
  db.collection("quotes").insertOne(finalImg, (err, result) => {
    console.log(result);

    if (err) return console.log(err);

    console.log("saved to database");
    res.redirect("/");
  });
});
// retrieving the image to the front end
router.get("/photos", (req, res) => {
  db.collection("mycollection")
    .find()
    .toArray((err, result) => {
      const imgArray = result.map(element => element._id);
      console.log(imgArray);

      if (err) return console.log(err);
      res.send(imgArray);
    });
});
// passing id
router.get("/photo/:id", (req, res) => {
  var filename = req.params.id;

  db.collection("mycollection").findOne(
    { _id: ObjectId(filename) },
    (err, result) => {
      if (err) return console.log(err);

      res.contentType("image");
      res.send(result.image.buffer);
    }
  );
});
module.exports = router;
