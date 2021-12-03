import React, {useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


function SongPage() {

    let { title } = useParams();
    let { artist } = useParams();
    let { album } = useParams();
    const [image, setImage] = useState('');
    const [player, setPlayer] = useState('');


    async function getResults() {
        const songTitle = title;
        try {
            const result = await axios.get("/auth/search/" + songTitle + '/' + artist);
            if (result !== undefined) {
                const searchImage = (result.data)['tracks']['items'][0]['album']['images'][0]['url'];
                const searchPlayer = (result.data)['tracks']['items'][0]['preview_url'];
                //console.log('results'+searchResults);
                setImage(searchImage);
                setPlayer(searchPlayer);
            }
            else {
                console.log("Not found.");
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    function LoadImg(){
        getResults();
        console.log("hey there: "+player);
        return (
            <>
            <img src={image}></img>
            <audio controls>
                <source src={player} />
            </audio>
            </>
        );
    }

    return (
    <div className="container">
        <div className="image_pos">
            <a href="/"><img src="logo.png" alt="logo" height="70" align="top"/></a>
        </div>
        <br></br>
        <br></br>
        <h1>{title}</h1>
        <p>Artist: { artist }</p>
        <p>Album: { album }</p>
        <LoadImg/>
    </div>

     );
}

export default SongPage;