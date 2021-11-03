import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function SongPage() {

    let { id } = useParams();

    async function openSpot() {
        var path = window.location.pathname;
        var page = path.split("/").pop();
        const response = await axios.get('http://localhost:5000/songs/' + page);
        var link = response.data[0].link;
        window.open(link);
    }

    return (
    <>
    <h1>{id}</h1>
    <p>Press play to play selected song</p>
    <p>Information about song goes here...</p>
    <button onClick={openSpot()}>play</button>
    </>
    );
}

export default SongPage;