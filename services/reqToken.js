const axios = require('axios');
const keys = require('../config/dev');

const reqToken = async () => {
    const response = await axios.post('https://accounts.spotify.com/api/token', {
      grant_type: 'client_credentials',
      client_id: keys.SPOTIFY_CLIENT_ID,
      client_secret: keys.SPOTIFY_CLIENT_SECRET,
    },{headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});
    return response.data.access_token;
  };

  module.exports = reqToken;