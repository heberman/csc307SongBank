import React, { useState, useEffect } from 'react';
//import axios from 'axios';
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
        console.log("waiting... for " + song.val);
        window.location.replace("/auth/search/" + songTitle);
        const result = await fetch("/auth/track");
        const json = await result.json();
  
        console.log(json['tracks']['items'][0]['external_urls']['spotify']);
        window.open(json['tracks']['items'][0]['external_urls']['spotify']);
        
        console.log("finished");
      }
      catch {
        console.log("I'M A FAILURE");
        //resultLabel.innerHTML = "No result found...";
      }
  }

    // async function searchByTitle(song) {
    //     const songTitle = song.val;
    //     var resultLabel = document.getElementById("searchResult");
    //     var playButton = document.getElementById("play-button");
    //     try {
    //         const response = await axios.get('http://localhost:5000/songs?title=' + songTitle);
    //         resultLabel.innerHTML = response.data[0].title;
    //         playButton.style.display = "block";
    //     }
    //     catch {
    //         resultLabel.innerHTML = "No result found...";
    //         playButton.style.display = "None";
    //     }
    //     return songTitle;
    // }

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