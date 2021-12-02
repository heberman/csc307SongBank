import React from 'react';
import "./Subpage.css"

function TableHeader() {
    return (
        <thead>
        <tr id="borders">
            <th id="borders"><b>Playlist Title</b></th>
            <th id="borders"><b>Artist</b></th>
            <th id="borders"><b>Album</b></th>
            <th id="borders"><b>Remove Song</b></th>
        </tr>
        </thead>
    );
}

function TableBody (props) {
    const rows = props.characterData["songs"].map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.name}</td>
                <td>{row.artists[0].name}</td>
                <td>{row.album.name}</td>
                <td class="button_alignment">
                    <button type="button"
                    class="button_playlist" onClick={() => props.removeCharacter(index)}>Remove</button>
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

function SongTable(props) {
    return (
        <table>
            <TableHeader />
            <TableBody characterData={props.characterData} removeCharacter={props.removeCharacter}/>
        </table>
    );
}

export default SongTable;