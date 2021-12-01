import React, {useState, useEffect} from 'react';
import axios from 'axios';
import PlaylistTable from './PlaylistTable';
import NewPlaylistForm from './NewPlaylistForm';

function PlaylistPage() {
    const [characters, setCharacters] = useState([]);

    async function removeOneCharacter (index) {
        try {
            const entry_id = characters[index]['_id'];
            const response = await axios.delete('http://localhost:5000/playlists/' + entry_id.toString());
            if (response && response.status === 204) {
                const updated = characters.filter((character, i) => {
                    return i !== index
                });

                setCharacters(updated);
            }
        }
        catch (error){
            //We're not handling errors. Just logging into the console.
            console.log(error);
            return false;
        }
    }

    function updateList(playlist) {
        makePostCall(playlist).then( result => {
            if (result && result.status === 201) {
                setCharacters([...characters, playlist]);
            }
        });
    }

    async function makePostCall(playlist){
        try {
            const response = await axios.post('http://localhost:5000/playlists', playlist);
            playlist['_id'] = response.data['_id'];
            return response;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }

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
                setCharacters(result);
        });
    }, [] );

    return (
        <div className="container">
            <div className="image_pos">
                <a href="/"><img src="logo.png" alt="logo" height="70" align="top"/></a>
            </div>
            <br></br>
            <br></br>
            <h1>Playlist Page</h1>
            <PlaylistTable characterData={characters} removeCharacter={removeOneCharacter}/>
            <NewPlaylistForm handleSubmit={updateList}/>
        </div>
    );
}

export default PlaylistPage;