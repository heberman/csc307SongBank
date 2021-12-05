import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import logo from "./logo.png"
import SmallPlaylistTable from "./SmallPlaylistTable";


function SongPage() {

    let { title } = useParams();
    let { artist } = useParams();
    let { album } = useParams();
    const [image, setImage] = useState('');
    const [player, setPlayer] = useState('');
    const [song, setSong] = useState({});
    const [playlists, setPlaylists] = useState([]);


    async function getResults() {
        const songTitle = title;
        try {
            const result = await axios.get("/auth/search/" + songTitle);
            setSong(result.data['tracks']['items'][0]);
            if (result !== undefined) {
                const searchImage = (result.data)['tracks']['items'][0]['album']['images'][0]['url'];
                const searchPlayer = (result.data)['tracks']['items'][0]['preview_url'];
                //console.log('results'+searchResults);
                setImage(searchImage);
                setPlayer(searchPlayer);
            }
            else {
                console.log("Not found.");
            }
        }
        catch (error) {
            console.log(error);
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
                setPlaylists(result);
        });
    }, [] );

    function LoadImg(){
        getResults();
        console.log("hey there: "+player);
        return (
            <>
                <img src={image} height="275"></img>
                <br></br>
                <br></br>
                <audio controls>
                    <source src={player} />
                </audio>
            </>
        );
    }

    async function addSongToPlaylist(song, playlist) {
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

    return (
        <div className="container">
            <div className="image_pos">
                <a href="/"><img src={logo} alt="logo" height="70" align="top"/></a>
            </div>
            <br></br>
            <br></br>
            <h1>{title}</h1>
            <h3>Artist: { artist }</h3>
            <p><b>Album: { album }</b></p>
            <LoadImg/>
            <br></br>
            <br></br>
            <p><b>Add this song to a playlist:</b></p>
            <SmallPlaylistTable characterData={playlists} song={song} addSong={addSongToPlaylist}/>
        </div>

    );
}

export default SongPage;