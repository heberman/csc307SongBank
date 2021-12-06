import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Login from '../Login';
import './Subpage.css';
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

            { (token === '') ? <Login/> : <div/>}
            { (token === '') ? <div/> : <Link to={"/Search"}><button type="button" 
                className="home">Search</button></Link>  }

            <br></br>
            <br></br>
            { (token === '') ? <div/> : <center><Link to={"/Playlists"}><input
                type="button"
                value="Playlists"
                className="home"></input></Link></center>  }

        </center></>
    );
}

export default HomePage;