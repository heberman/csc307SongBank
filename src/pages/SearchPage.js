import React, {useState, useEffect} from 'react';
import axios from 'axios';
import SmallPlaylistTable from './SmallPlaylistTable'
import AddSongForm from './AddSongForm'

function SearchPage () {
    const [playlists, setPlaylists] = useState([]);

    const [results, setResults] = useState(true);

    const [song, setSong] = useState({});

    async function fetchAll(){
        try {
            const response = await axios.get('http://localhost:5000/playlists');
            return response.data;
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
                setPlaylists(result);
        });
    }, [] );

    function switchToPlaylistTable(song) {
        setSong(song);
        setResults(false);
    }

    async function addSongToPlaylist(song, playlist) {
        try {
            let newPlaylist = playlist;
            newPlaylist["songs"] = [...newPlaylist["songs"], song];
            const response = await axios.put(
                'http://localhost:5000/playlists/' + newPlaylist['_id'].toString(), newPlaylist
            );
            setResults(true);
            return response;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }

    return (
        <div className="container">
            <div className="image_pos">
                <img src="logo.png" alt="logo" height="70" align="top"/>
            </div>
            <br></br>
            <br></br>
            <h1>Search</h1>
            { (results === true) ? (
                <AddSongForm handleAdd={switchToPlaylistTable}/>
                ) : (<SmallPlaylistTable characterData={playlists} song={song} addSong={addSongToPlaylist}/>
            )}
        </div>
    );
}

export default SearchPage;