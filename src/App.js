import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

// We will create these two pages in a moment

import HomePage from './pages/HomePage';

import SongPage from './pages/SongPage';

import PlaylistPage from './pages/PlaylistPage';

function MyApp() {

    var client_id = '5f8ac560aa6a4deca706bde30ad28531'; //'CLIENT_ID'; // Your client id
    var client_secret = 'fa9822db14bb4a6595d4486024a8eec0';//CLIENT_SECRET'; // Your secret
    var redirect_uri = 'http://songbank.com/callback/';//'REDIRECT_URI'; // Your redirect uri

    return (
        <>
        <BrowserRouter>
        <switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/Playlists' component={PlaylistPage}/> 
            <Route path='/:id' component={SongPage} />
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