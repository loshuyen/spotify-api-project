const express = require('express');
const passport = require('passport');
const app = express();
const cookieSession = require('cookie-session');
require('./models/Users');
require('./models/Winners');
const keys = require('./config/dev');

app.use(
  cookieSession({
    keys: [keys.cookieKey],
    maxAge: 24 * 60 * 60 * 1000 * 30,
  })
);

app.use(passport.session());

const authRouter = require('./routes/authRouter');
const apiRouter = require('./routes/apiRouter');
const playlistRouter = require('./routes/playlistRouter');
app.use('/auth', authRouter);
app.use('/api', apiRouter);
app.use('/playlist', playlistRouter);

app.listen(4000);
