const express = require('express');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const Users = mongoose.model('users');
const Winners = mongoose.model('winners');


const playlistRouter = express.Router();

playlistRouter.get('/user/:id', requireLogin, async (req, res) => {
    const user = await Users.findById(req.params.id);
    res.send(user.playlist);
});

playlistRouter.put('/user/add/:id/:uri', requireLogin, async (req, res) => {
    const user = await Users.findById(req.params.id);
    const playlistArray = user.playlist;
    playlistArray.push(req.params.uri);
    await Users.findByIdAndUpdate(req.params.id, {playlist: playlistArray});
    res.send(playlistArray);
});

//remove album
playlistRouter.put('/user/del/:id/:uri', requireLogin, async (req, res) => {
    const user = await Users.findById(req.params.id);
    const playlistArray = user.playlist;
    const newArray = playlistArray.filter(e => e !== req.params.uri);
    await Users.findByIdAndUpdate(req.params.id, {playlist: newArray});
    res.send('album deleted!!');
});

module.exports = playlistRouter;