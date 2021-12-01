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
        window.location.replace("/auth/search/" + songTitle);
        console.log("finished");
      }
      catch(error) {
        console.log("I'M A FAILURE");
        console.log(error);
        //resultLabel.innerHTML = "No result found...";
      }
  }

    return (
        <>
            <div id="top"></div>
            <h1><center>Song Search</center></h1>
            <p><center>Type in the title of the song you want to listen to</center></p>

            { (token === '') ? <Login/> : <WebPlayback token={token} /> }
            { (token === '') ? <div/> : <SearchBar handleSubmit={searchByTitle}/>  }

            <center><Link to={"/Playlists"}><button>Playlists</button></Link></center>
        </>
    );
}
export default HomePage;