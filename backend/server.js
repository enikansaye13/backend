const express = require("express");
const bodyParser = require('body-parser')
const path = require('path');
const crypto = require('crypto');
const methodOverride = require('method-override')
// const passport = require('./services/passport');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream')
const cors = require("cors");
// require('./models/user.model')
require('./services/login')
// require('./services/passport');

const config = require("config")

const User = require('./models/user.model')
// const User = mongoose.models("user")

require("dotenv").config();

const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");

const app = express();

// require('./routes/authRoute')(app);

// passport.use

// the routes i.e app.get
const port = process.env.PORT || 5000;


// Middlewares
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(cors());
app.use(express.json());

//connection with mongodb
const uri = config.get("mongoURI")
// process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;
// init gfs
connection.once("open", () => {
  // init stream
// const gfs = Grid(connection, mongoose.mongo);
// gfs.collection('uploads');
  console.log("MongoDB database connection established successfully.........");
});




// /Route get /
// description loads  
// app.get('/', (req, res) => {
// res.render('index');
// });



app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
