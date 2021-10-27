import React from 'react';
import axios from 'axios';
import SearchBar from './SearchBar'

function MyApp() {

    async function searchByTitle(songTitle) {
        var resultLabel = document.getElementById("searchResult");
        try {
            const response = await axios.get('http://localhost:5000/songs?title=' + songTitle);
            resultLabel.innerHTML = response.data.title;
        }
        catch {
            resultLabel.innerHTML = "No result found."
        }
    }

    return (
        <div>
            <SearchBar handleSubmit={searchByTitle}/>
        </div>
    );
}

export default MyApp;