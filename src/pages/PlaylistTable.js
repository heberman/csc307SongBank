import React from 'react';

function TableHeader() {
    return (
        <thead>
        <tr>
            <th>Playlist Title</th>
        </tr>
        </thead>
    );
}

function TableBody (props) {
    const rows = props.characterData.map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.title}</td>
                <td>
                    <button>Edit</button>
                </td>
                <td>
                    <button onClick={() => props.removeCharacter(index)}>Delete</button>
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