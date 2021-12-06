import React, {useState} from 'react';
import './Subpage.css';
import axios from "axios";
import { Link } from 'react-router-dom';

function AddSongForm(props) {
    
    const [results, setResults] = useState([]);

    const [query, setQuery] = useState(
        {
            val: '',
        }
    );

    const [afterSearch, setAfterSearch] = useState(true);

    function handleChange(event) {
        const { value } = event.target;
        setQuery({val: value});
    }

    function submitForm() {
        getResults(query);
        setQuery({val: ''});
    }

    async function getResults(song) {
        setAfterSearch(false);
        const songTitle = song.val;
        try {
            const result = await axios.get("/auth/search/" + songTitle);
            if (result !== undefined) {
                const searchResults = result.data["tracks"]["items"];
                setResults(searchResults);
            }
            else {
                console.log("Not found.");
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    
    function ResultsHeader() {
        return (
            <thead>
            <tr id="borders">
                <th id="borders"><b>Song Title</b></th>
                <th id="borders"><b>Artist</b></th>
                <th id="borders"><b>Album</b></th>
            </tr>
            </thead>
        );
    }

    function ResultsBody (props) {
        const rows = results.map((row, index) => {
            return (
                <tr key={index}>
                    <td>
                    <Link to={"/Songs/"+row.name+"/"+row.artists[0].name+"/"+row.album.name}>
                        <td>{row.name}</td></Link>
                    </td>
                    <td>{row.artists[0].name}</td>
                    <td>{row.album.name}</td>
                    <td class="button_alignment">
                        <input type="button" value="Add Song" className="button_playlist" onClick={() => props.handleAdd(row)}/>
                    </td>
                    <td class="button_alignment">
                        <Link to={"/Songs/"+row.name+"/"+row.artists[0].name+"/"+row.album.name}><button type="button"
                    class="button_playlist">INFO</button></Link>
                </td>
                </tr>
            );
        });
        return (
            <tbody>
            {rows}
            </tbody>
        );
    }

    function ResultsHeader() {
        return (
            <thead>
            <tr id="borders">
                <th id="borders"><b>Song Title</b></th>
                <th id="borders"><b>Artist</b></th>
                <th id="borders"><b>Album</b></th>
            </tr>
            </thead>
        );
    }


    return (
        <form>
            <label htmlFor="Search"><b>Search for songs to add:</b></label>
            <input
                type="text"
                name="search"
                id="search"
                class="search_bar"
                value={query.val}
                onChange={handleChange}/>
            <input type="button" value="Search" className="button_playlist" onClick={submitForm} />
            <br></br><br></br>
            { (afterSearch === false) ? (
                <ResultsHeader id="resultsHeader"/>
                ) : (<div/>
            )}
            <ResultsBody handleAdd={props.handleAdd}/>
            {/* <Link to="/play"><button style={{display: 'none'}} id="play-button">Play</button></Link> */}
        </form>
    );
}

export default AddSongForm;