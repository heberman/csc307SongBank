import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import SongTable from './SongTable'
import AddSongForm from './AddSongForm'

function IndivPlaylistPage () {
    let { playlistName } = useParams();

    const [playlist, setPlaylist] = useState({
        "title": playlistName,
        "songs": [],
        "_id": ''
    });

    async function removeOneCharacter (index) {
        try {
            const updated = playlist["songs"].filter((song, i) => {
                return i !== index
            });
            let newPlaylist = playlist;
            newPlaylist["songs"] = updated;
            const response = await axios.put(
                'http://localhost:5000/playlists/' + newPlaylist['_id'].toString(), newPlaylist
            );
            if (response && response.status === 204) {
                setPlaylist({
                    "title": playlistName,
                    "songs": playlist["songs"],
                    "_id": playlist['_id']
                });
            }
        }
        catch (error){
            //We're not handling errors. Just logging into the console.
            console.log(error);
            return false;
        }
    }

    // async function findAndAddSong(song) {
    //     const songTitle = song.val;
    //     try {
    //         const result = await axios.get("/auth/search/" + songTitle);
    //         if (result !== undefined) {
    //             const songToAdd = result.data["tracks"]["items"][0];
    //             updateList(songToAdd);
    //         }
    //         else {
    //             console.log("Not found.");
    //         }
    //     }
    //     catch(error) {
    //         console.log("I'M A FAILURE");
    //         console.log(error);
    //     }
    // }

    function updateList(song) {
        makePostCall(song).then( result => {
            if (result && result.status === 204) {
                setPlaylist({
                    "title": playlistName,
                    "songs": playlist["songs"],
                    "_id": playlist['_id']
                });
            }
        });
    }

    async function makePostCall(song){
        try {
            let newPlaylist = playlist;
            newPlaylist["songs"] = [...newPlaylist["songs"], song];
            const response = await axios.put(
                'http://localhost:5000/playlists/' + newPlaylist['_id'].toString(), newPlaylist
            );
            return response;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }

    async function fetchAll(){
        try {
            const response = await axios.get('http://localhost:5000/playlists?title=' + playlistName);
            return response.data[0];
        }
        catch (error){
            //We're not handling errors. Just logging into the console.
            console.log(error);
            return false;
        }
    }

    useEffect(() => {
        fetchAll().then( result => {
            if (result)
                setPlaylist(result);
        });
    }, [] );


    const PlaylistHeader = () => {
        return <h1>{playlistName}</h1>;
    }

    return (
        <div className="container">
            <div className="image_pos">
                <img src="logo.png" alt="logo" height="70" align="top"/>
            </div>
            <br></br>
            <br></br>
            <PlaylistHeader />
            <SongTable characterData={playlist} removeCharacter={removeOneCharacter}/>
            <AddSongForm handleAdd={updateList}/>
            {/*<SearchBar handleSubmit={findAndAddSong}/>*/}
        </div>
    );
}

export default IndivPlaylistPage;