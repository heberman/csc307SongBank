import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar'

function HomePage() {

    async function searchByTitle(song) {
        const songTitle = song.val;
        var resultLabel = document.getElementById("searchResult");
        try {
            const response = await axios.get('http://localhost:5000/songs/' + songTitle);
            resultLabel.innerHTML = response.data[0].title;
        }
        catch {
            resultLabel.innerHTML = "No result found."
        }
    }
    
    return (
        <>
        <h1>Song Search</h1>
        <p>Type in the title of the song you want to listen to</p>

        <div className="container">
        <p>
        </p>
        </div>
        <div>
            <SearchBar handleSubmit={searchByTitle}/>
            <Link to="/play"><button>Your desired link.</button></Link>
        </div>
        </>
    );

}
export default HomePage;