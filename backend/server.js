const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
// const crypto = require('crypto');
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const multer = require("multer");
// const GridFsStorage = require('multer-gridfs-storage');
const Grid = require("gridfs-stream");
const cors = require("cors");
const config = require("config");

const User = require("./models/user.model");
const Profile = require("./models/profile.model");
const Subscriber = require("./models/subscriber.model");
const Message = require("./models/message.model");
// const  schema= require('./models/photo.model')

require("dotenv").config();

const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");
const profileRouter = require("./routes/profile");
const authRouter = require("./routes/auth");
const subscribersRouter = require("./routes/subscribers");
const messageRouter = require("./routes/message");
// const photoRouter = require("./routes/photo");

const app = express();

const fileupload = require("express-fileupload");

app.use(fileupload({ useTempFiles: true }));

// the routes i.e app.get
const port = process.env.PORT || 5000;

const cloudinary = require("cloudinary").v2;

// cloudinary.config({
//   cloud_name: "dzrz3wnon",
//   api_key: "314943731275991",
//  api_secret: "rVaU3IOoZ59oe2R0qECeSno-3io"
// })
cloudinary.config({
  cloud_name:config.name,
  api_key: config.key,
  api_secret: config.secret
});

// Middlewares
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(cors());
app.use(express.json());

//connection with mongodb
const uri = config.get("mongoURI");
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully.........");
});

app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);
app.use("/profile", profileRouter);
app.use("/auth", authRouter);
app.use("/message", messageRouter);
app.use("/subscribers", subscribersRouter);
// app.use("/photo", photoRouter)

app.post("/upload", function(req, res, next) {
  const file = req.files.photo;
  // console.log(file)
  cloudinary.uploader.upload(file.tempFilePath, function(err, result) {
    res.send({
      success: true,
      result
    });
  });
});

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
