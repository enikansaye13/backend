const express = require("express");
// const passport = require('./services/passport');
const mongoose = require('mongoose')
const cors = require("cors");
// require('./models/user.model')
// require('./services/passport');

// const config = require("config")

// const User = require('../models/user.model')
// const User = mongoose.models("user")

require("dotenv").config();

const app = express();

// require('./routes/authRoute')(app);

// passport.use

// the routes i.e app.get
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//onnection with mongodb
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully.........");
});

const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
