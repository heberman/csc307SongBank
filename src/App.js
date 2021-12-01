import React from 'react';

import { BrowserRouter, Route} from 'react-router-dom';

// We will create these two pages in a moment

import HomePage from './pages/HomePage';

import SongPage from './pages/SongPage';

import PlaylistPage from './pages/PlaylistPage';

import IndivPlaylistPage from './pages/IndivPlaylistPage';

function MyApp() {

    return (
        <>
        <BrowserRouter>
        <switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/Playlists' component={PlaylistPage}/>
            <Route exact path='/Songs' component={SongPage} />
            <Route path='/Playlists/:playlistName' children={<IndivPlaylistPage />} />
        </switch>
        </BrowserRouter>
        {/* <div>
            <SearchBar handleSubmit={searchByTitle} />
        </div> */}
        </>

    );
}

export default MyApp;