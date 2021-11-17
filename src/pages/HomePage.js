import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar';
import './HomePage.css';

function HomePage() {

    async function searchByTitle(song) {
        const songTitle = song.val;
        var resultLabel = document.getElementById("searchResult");
        var playButton = document.getElementById("play-button");
        try {
            const response = await axios.get('http://localhost:5000/songs?title=' + songTitle);
            resultLabel.innerHTML = response.data[0].title;
            playButton.style.display = "block";
        }
        catch {
            resultLabel.innerHTML = "No result found...";
            playButton.style.display = "None";
        }
        return songTitle;
    }

    return (
        <>
        <div id="top"></div>
        <h1><center>Song Search</center></h1>
        <p><center>Type in the title of the song you want to listen to</center></p>

        <div className="container">
        <p>
        </p>
        </div>
        <div align="center">
            <SearchBar handleSubmit={searchByTitle} />
            <Link to={"/songs?title=traitor"}><button style={{display: 'none'}} id="play-button" >Play</button></Link> 
        </div>
        <center><Link to={"/Playlists"}><button>Playlists</button></Link></center>
        </>
    );
}
export default HomePage;