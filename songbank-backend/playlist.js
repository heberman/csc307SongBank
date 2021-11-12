const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    songs: {
        type: Array,
        required: true
    }

}, {collection : 'playlist_list'});

module.exports = PlaylistSchema;