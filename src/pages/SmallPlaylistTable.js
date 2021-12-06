import React from 'react';
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
                <td class="button_alignment">
                    <input type="button" value="Add Song" className = "button_playlist" onClick={() => props.addSong(props.song, row)}/>
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

function SmallPlaylistTable(props) {
    return (
        <table>
            <TableHeader />
            <TableBody characterData={props.characterData} song={props.song} addSong={props.addSong}/>
        </table>
    );
}

export default SmallPlaylistTable;