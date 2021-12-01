import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function SongPage() {

    let { id } = useParams();


    return (
    <>
    <h1>{id}</h1>
    <p>Press play to play selected song</p>
    <p>Information about song goes here...</p>
    </>
    );
}

export default SongPage;