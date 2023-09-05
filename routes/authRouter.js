const express = require('express');
const authRouter = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/dev');
const mongoose = require('mongoose');

const Users = mongoose.model('users');

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  const user = await Users.findById(id);
  cb(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.GOOGLE_CLIENT_ID,
      clientSecret: keys.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:4000/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, cb) => {
      const user = await Users.findOne({ googleId: profile.id });
      if (!user) {
        const newUser = await new Users({ googleId: profile.id }).save();
        return cb(null, newUser);
      }
      return cb(null, user);
    }
  )
);

authRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['profile'] })
);

authRouter.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('http://localhost:3000');
  }
);

authRouter.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
});

authRouter.get('/current_user', (req, res) => {
  res.send(req.user);
});

module.exports = authRouter;
