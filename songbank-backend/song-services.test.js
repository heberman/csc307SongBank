const songServiceFunctions = require('./song-services.js');

var testPlayListTitle = 'Playlist 1'

var testPlaylist = {
    title: "Test Playlist",
    songs: [{
        title: 'Easy On Me',
        Artist: 'Adele',
        runtime: 3.45,
    }]
}

var testPlaylistJson = JSON.stringify(testPlaylist);


test('Testing addPlaylist()', () => {
    const result = songServiceFunctions.addPlaylist(testPlaylistJson);
    expect(result).toBeTruthy();
});

test('Testing findPlaylistByTitle()', () => {
    const result = songServiceFunctions.findPlaylistByTitle(testPlayListTitle)
    expect(result).toBeTruthy();
});

test('Testing deletePlaylist()', () => {
    const pl = songServiceFunctions.findPlaylistByTitle(testPlayListTitle);
    const id = pl['_id'];
    const result = songServiceFunctions.deletePlaylist(id);
    expect(result).toBeTruthy();
});

test('Testing getPlaylists()', () => {
    const result = songServiceFunctions.getPlaylists()
    expect(result).toBeTruthy();
});

test('Testing findPlaylistById()', () => {
    const pl = songServiceFunctions.findPlaylistByTitle(testPlayListTitle);
    const id = pl['_id'];
    const result = songServiceFunctions.findPlaylistById(id);
    expect(result).toBeTruthy();
});

test('Testing editPlaylist()', () => {
    const pl = songServiceFunctions.findPlaylistByTitle(testPlayListTitle);
    const id = pl['_id'];
    const result = songServiceFunctions.editPlaylist(id, testPlaylist);
    expect(result).toBeTruthy();
});