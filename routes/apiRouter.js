const express = require('express');
const apiRouter = express.Router();
const reqToken = require('../services/reqToken');
const axios = require('axios');

apiRouter.get('/spotify/token', async (req, res) => {
  const token = await reqToken();
  res.send(token);
});

apiRouter.get('/spotify/album/:name', async (req, res) => {
  const token = await reqToken();
  const response = await axios.get('https://api.spotify.com/v1/search', {
    params: {
      q: req.params.name,
      type: 'album',
      locale: 'zh-TW,zh-Hant;q=0.9',
      limit: 1,
      market: 'TW'
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const uri = response.data.albums.items[0].uri;
  res.send(uri);
});

apiRouter.get('/spotify/artist/:name', async (req, res) => {
    const token = await reqToken();
    const response = await axios.get('https://api.spotify.com/v1/search', {
      params: {
        q: req.params.name,
        type: 'artist',
        locale: 'zh-TW,zh-Hant;q=0.9',
        limit: 1,
        market: 'TW'
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const uri = response.data.artists.items[0].uri;
    res.send(uri);
  });

module.exports = apiRouter;
