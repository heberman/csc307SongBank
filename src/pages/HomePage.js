import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import WebPlayback from '../WebPlayback';
import Login from '../Login';
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

    return (
        <><center>
            <div id="top"/>

            <br></br>
            <h1><center><img src="logo.png" alt="logo" height="200" width="500"/></center></h1>
            <br></br>

            { (token === '') ? <Login/> : <WebPlayback token={token} /> }
            { (token === '') ? <div/> : <Link to={"/Search"}><button type="button" 
                class="button_playlist">Search</button></Link>  }

            <br></br>
            { (token === '') ? <div/> : <center><Link to={"/Playlists"}><input
                type="button"
                value="Playlists"
                class="button_playlist"></input></Link></center>  }

        </center></>
    );
}
export default HomePage;