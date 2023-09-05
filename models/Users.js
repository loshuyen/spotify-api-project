const mongoose = require('mongoose');
const keys = require('../config/dev');

mongoose.connect(keys.mongoURI);

const userSchema = new mongoose.Schema({
    googleId: String,
    playlist: [String]
});

mongoose.model('users', userSchema);
