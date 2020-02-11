const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy
const keys = require("../config/keys");

const mongoose = require("mongoose");

const User = mongoose.model('User')


passport.use(
    new GoogleStrategy({
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
      //match user
      User.findOne({googleId:profile.id})
      .then((existingUsers) => {
        if(existingUsers){
          return done(null, existingUsers);
        }else{
          new User({
            googleId: profile.id
          }).save();
        }

      })
      .then(user => done(null, user))
     
      // console.log('accesstoken', accessToken);
      // console.log('refreshtoken', refreshToken);
      // console.log('profile', profile);
    })
  )
  