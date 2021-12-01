import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import WebPlayback from '../WebPlayback';
import Login from '../Login';
import SearchBar from '../SearchBar';
import './HomePage.css';

function HomePage() {

    const [token, setToken] = useState('');

    useEffect(() => {

        async function getToken() {
            const response = await fetch('/auth/token');
            const json = await response.json();
            setToken(json.access_token);
        }

        getToken();

    }, []);


    async function searchByTitle(song) {
        console.log("SEARCH BY TITLE");
        const songTitle = song.val;
        // var resultLabel = document.getElementById("searchResult");
        // var playButton = document.getElementById("play-button");
        try {
            console.log("waiting... for " + songTitle);
            const result = await axios.get("/auth/search/" + songTitle);
            //const result = await fetch("/auth/search/" + songTitle);
            //window.location.replace("/auth/search/" + songTitle);
            //const result = await fetch("/auth/track");
            //const json = await result.json();

            console.log(result.data);
            window.open((result.data)['tracks']['items'][0]['external_urls']['spotify']);

            console.log("finished");
        }
        catch(error) {
            console.log("I'M A FAILURE");
            console.log(error);
            //resultLabel.innerHTML = "No result found...";
        }
    }

    return (
        <><center>
            <div id="top"></div>

            <br></br>
            <h1><center><img src="logo.png" alt="logo" height="200" width="500"/></center></h1>
            <br></br>

            { (token === '') ? <Login/> : <WebPlayback token={token} /> }
            { (token === '') ? <div/> : <SearchBar handleSubmit={searchByTitle}/>  }

            <br></br>
            { (token === '') ? <div/> : <center><Link to={"/Playlists"}><input type="button"
            value="Playlists"
            class="button_playlist"
            ></input></Link></center>  }
            
        </center></>
    );
}
export default HomePage;