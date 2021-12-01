const mongoose = require('mongoose');
const SongSchema = require("./song");
const PlaylistSchema = require("./playlist");
const process = require("process");
const dotenv = require("dotenv");
dotenv.config();

let conn;

function setConnection(newConn) {
    // don't need to test!
    return (conn = newConn);
}

function getConnection() {
    // don't need to test!
    if (!conn) {
        if (process.argv.includes("--prod")) {
            conn = mongoose.createConnection(
                "mongodb+srv://" +
                process.env.MONGO_USER +
                ":" +
                process.env.MONGO_PWD +
                "@songs.pax5y.mongodb.net/" +
                process.env.MONGO_DB +
                "?retryWrites=true&w=majority",
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                }
            );
        } else {
            conn = mongoose.createConnection("mongodb://localhost:27017/songs", {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        }
    }
    return conn;
}

// async function getUsers(name, job){
//     let result;
//     if (name === undefined && job === undefined){
//         result = await userModel.find();
//     }
//     else if (name && (job === undefined)) {
//         result = await findUserByName(name);
//     }
//     else if (job && (name === undefined)){
//         result = await findUserByJob(job);
//     }
//     else {
//         result = await findUserByNameAndJob(name, job);
//     }
//     return result;
// }
//
// async function findUserById(id){
//     try{
//         return await userModel.findById(id);
//     }catch(error) {
//         console.log(error);
//         return undefined;
//     }
// }

async function addPlaylist(playlist){
    try{
        const playlistModel = getConnection().model("Playlist", PlaylistSchema);
        const playlistToAdd = new playlistModel(playlist);
        return await playlistToAdd.save();
    }catch(error) {
        console.log(error);
        return false;
    }
}

async function deletePlaylist(id){
    try{
        const playlistModel = getConnection().model("Playlist", PlaylistSchema);
        return await playlistModel.findByIdAndDelete(id);
    }catch(error) {
        console.log(error);
        return false;
    }
}

async function editPlaylist(id, newPlaylist){
    try{
        const playlistModel = getConnection().model("Playlist", PlaylistSchema);
        return await playlistModel.findByIdAndUpdate(id, newPlaylist);
    }catch(error) {
        console.log(error);
        return false;
    }
}

async function getPlaylists() {
    const playlistModel = getConnection().model("Playlist", PlaylistSchema);
    return await playlistModel.find();
}

async function getSongs() {
    const songModel = getConnection().model("Song", SongSchema);
    return await songModel.find();
}

async function findSongByTitle(title){
    const songModel = getConnection().model("Song", SongSchema);
    return await songModel.find({'title':title});
}

async function findPlaylistByTitle(title){
    const playlistModel = getConnection().model("Playlist", PlaylistSchema);
    return await playlistModel.find({'title':title});
}

async function findPlaylistById(id){
    const playlistModel = getConnection().model("Playlist", PlaylistSchema);
    return await playlistModel.findById(id);
}

// async function findUserByJob(job){
//     return await userModel.find({'job':job});
// }

// exports.getUsers = getUsers;
exports.findSongByTitle = findSongByTitle;
exports.findPlaylistByTitle = findPlaylistByTitle;
exports.findPlaylistById = findPlaylistById;
exports.getPlaylists = getPlaylists;
exports.getSongs = getSongs;
exports.setConnection = setConnection;
exports.addPlaylist = addPlaylist;
exports.deletePlaylist = deletePlaylist;
exports.editPlaylist = editPlaylist;