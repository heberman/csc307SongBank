import React from 'react';

import { BrowserRouter, Route} from 'react-router-dom';

import HomePage from './pages/HomePage';

import SongPage from './pages/SongPage';

import PlaylistPage from './pages/PlaylistPage';

import IndivPlaylistPage from './pages/IndivPlaylistPage';

import SearchPage from "./pages/SearchPage";

import './pages/Subpage.css'

function MyApp() {

    return (
        <>
        <BrowserRouter>
        <switch>

            <Route exact path='/' component={HomePage} />
            <Route exact path='/Search' component={SearchPage} />
            <Route exact path='/Playlists' component={PlaylistPage}/>
            <Route exact path='/Songs/:title/:artist/:album' component={SongPage} />
            <Route path='/Playlists/:playlistName' children={<IndivPlaylistPage />} />
        
        </switch>
        </BrowserRouter>
        </>

    );
}

export default MyApp;