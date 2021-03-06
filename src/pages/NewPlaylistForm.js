import React, {useState} from 'react';

function NewPlaylistForm(props) {
    const [playlist, setPlaylist] = useState(
        {
            title: '',
            songs: []
        }
    );

    function handleChange(event) {
        const {value} = event.target;
        setPlaylist(
            {title: value, songs: []}
        );
    }

    function submitForm() {
        props.handleSubmit(playlist);
        setPlaylist({title: '', songs: []});
    }

    return (
        <form>
            <label>New Playlist</label>
            <label htmlFor="title">Title:</label>
            <input
                type="text"
                name="title"
                id="title"
                class="search_bar"
                value={playlist.title}
                onChange={handleChange} />
            <input type="button" value="Add Playlist" className="button_playlist" onClick={submitForm} />
        </form>
    );

}
export default NewPlaylistForm;