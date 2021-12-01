const songServiceFunctions = require('../songbank-backend/song-services.js');

var testPlayListTitle = 'Playlist 1'

var testSongTitle = 'Easy On Me'

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


test('Testing getPlaylists()', () => {
    const result = songServiceFunctions.getPlaylists()
    expect(result).toBeTruthy();
});


test('Testing getSongs()', () => {
    const result = songServiceFunctions.getSongs()
    expect(result).toBeTruthy();
});


test('Testing findSongByTitle()', () => {
    const result = songServiceFunctions.findSongByTitle(testSongTitle)
    expect(result).toBeTruthy();
});


// test('Testing findPlaylistById()', () => {
//     const result = null
    
//     expect(result).toBeTruthy();
// });

// test('Testing deletePlaylist()', () => {
//     const result = null
    
//     expect(result).toBeTruthy();
// });

// test('Testing editPlaylist()', () => {
//     const result = null
    
//     expect(result).toBeTruthy();
// });
