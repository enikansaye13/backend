const passport = require('passport');

module.exports = app  =>{
app.get('/auth/google', 
passport.authenticate('google', {
    scope: ['profile', 'email']
})
)
app.get('/auth/google/callback', passport.authenticate('google'))

app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
})

app.get('/api/current_user', (req, res) =>{
    res.send(req.user);
});
};






// const express = require("express");
// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy

// const app = express();


// app.get(
//     "/auth/google",
//     passport.authenticate("google", {
//       scope: ["profile", "email"]
//     })
//   );
//   app.get("/auth/google/callback", passport.authenticate("google"));
  
//   app.get("/", (req, res) => {
//     res.send({
//       hi: "there"
//     });
//   });
  