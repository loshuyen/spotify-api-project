const mongoose = require('mongoose');
const keys = require('../config/dev');

mongoose.connect(keys.mongoURI);

const winnerSchema = new mongoose.Schema({
  年度: Number,
  屆別: Number,
  獎項類別: String,
  獎項名稱: String,
  得獎作品: String,
  得獎者: String,
  uri: String
});

mongoose.model('winners', winnerSchema);
