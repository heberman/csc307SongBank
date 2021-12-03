import React from 'react';
import "./pages/Subpage.css"

function Login() {
    return (
        <div className="App">
            <header className="App-header" class="font_one"><b>
                Login with Spotify 
            </b></header>
            <a className="btn-spotify" href="/auth/login" >
                    <img src="spoootify.png" alt="spotify" height="70"/>
            </a>
        </div>
    );
}

export default Login;