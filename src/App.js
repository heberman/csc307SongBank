import React from 'react';
import axios from 'axios';
//import SearchBar from './SearchBar'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// We will create these two pages in a moment

import HomePage from './pages/HomePage';

import SongPage from './pages/SongPage';


function MyApp() {

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
        <BrowserRouter>
        <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/:id' component={SongPage} />
        </Switch>
        </BrowserRouter>
        {/* <div>
            <SearchBar handleSubmit={searchByTitle} />
        </div> */}
        </>

    );
}

export default MyApp;