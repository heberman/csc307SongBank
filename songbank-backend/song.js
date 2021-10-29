const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    artist: {
        type: String,
        required: true,
        trim: true,
    },
    featured: {
        type: String,
        required: false,
        trim: true,
    },
    runtime: {
        type: Number,
        required: true,
    }
}, {collection : 'songs_list'});

const Song = mongoose.model("Song", SongSchema);

module.exports = Song;