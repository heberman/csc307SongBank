import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar';
import './HomePage.css';
//import '../index.css';

function HomePage() {

    async function searchByTitle(song) {
        const songTitle = song.val;
        var resultLabel = document.getElementById("searchResult");
        var playButton = document.getElementById("play-button");
        try {
            const response = await axios.get('http://localhost:5000/songs/' + songTitle);
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
        <h1>Song Search</h1>
        <p>Type in the title of the song you want to listen to</p>

        <div className="container">
        <p>
        </p>
        </div>
        <div>
            <SearchBar handleSubmit={searchByTitle}/>
             <Link to={"/traitor"}><button style={{display: 'none'}} id="play-button" >Play</button></Link> 
        </div>
        <Link to={"/Playlists"}><button>Playlists</button></Link> 
        </>
    );
}
export default HomePage;