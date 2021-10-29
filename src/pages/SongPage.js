import React from 'react';
import { useParams } from 'react-router-dom';

function SongPage() {

    let { id } = useParams();

    return (
    <>
    <h1>{id}</h1>
    <p>Press play to play selected song</p>
    </>
    );
}

export default SongPage;