import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function SongPage(songInfo) {

    let { songName } = useParams();

    return (
    <>
    <h1>{songName}</h1>
    <p>Press play to play selected song</p>
    <p>{songInfo.songInfo}</p>
    
    </>
    );
}

export default SongPage;