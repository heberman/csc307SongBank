import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

// We will create these two pages in a moment

import HomePage from './pages/HomePage';

import SongPage from './pages/SongPage';

import PlaylistPage from './pages/PlaylistPage';

function MyApp() {

    return (
        <>
        <BrowserRouter>
        <switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/Playlists' component={PlaylistPage}/> 
            <Route path='/songs?title=:id' component={SongPage} />
        </switch>
        </BrowserRouter>
        {/* <div>
            <SearchBar handleSubmit={searchByTitle} />
        </div> */}
        </>

    );
}

export default MyApp;

<Route path='/Playlists' component={PlaylistPage} />