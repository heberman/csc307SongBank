import React from 'react';
import { Link } from 'react-router-dom';
import "./Subpage.css"

function TableHeader() {
    return (
        <thead>
        <tr id="borders">
            <th id="borders"><b>Playlist Title</b></th>
        </tr>
        </thead>
    );
}

function TableBody (props) {
    const rows = props.characterData.map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.title}</td>
                <td id="button_alignment">
                    <button type="button" class="button_playlist" onClick={() => props.removeCharacter(index)}>Delete</button>
                </td>
                <td id="button_alignment">
                    <Link to={'/Playlists/' + row.title}><button type="button" class="button_playlist">Edit</button></Link>
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

function PlaylistTable(props) {
    return (
        <table>
            <TableHeader />
            <TableBody characterData={props.characterData} removeCharacter={props.removeCharacter}/>
        </table>
    );
}

export default PlaylistTable;