const express = require('express');
const cors = require('cors');

const songServices = require('./song-services');

var app = express();
const port = 5000;

const request = require('request');
const dotenv = require('dotenv');

global.access_token = '';

global.songTitle = '';

dotenv.config();

app.use(cors());
app.use(express.json());

var spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
var spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;

var spotify_redirect_uri = 'http://localhost:3000/auth/callback';

var generateRandomString = function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

app.get('/auth/login', (req, res) => {

    var scope = "streaming user-read-email user-read-private";
    var state = generateRandomString(16);

    var auth_query_parameters = new URLSearchParams({
        response_type: "code",
        client_id: spotify_client_id,
        scope: scope,
        redirect_uri: spotify_redirect_uri,
        state: state
    })
    res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
})

app.get('/auth/callback', (req, res) => {

    var code = req.query.code;

    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri: spotify_redirect_uri,
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + (Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString('base64')),
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
        json: true
    };

    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            access_token = body.access_token;
            res.redirect('/');
        }
    });

})

app.get('/auth/search/:id', (req, res) => {
    const id = req.params['id']
    var searchOptions = {
        url: `https://api.spotify.com/v1/search?q=${id}&type=track&limit=5`,
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'Authorization' :  `Bearer ${access_token}`
        },
    };
    request.get(searchOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            songTitle = body;
            res.send(songTitle);
        }

    });
})

app.get('/auth/search/:id/:artist/:album', (req, res) => {
    const id = req.params['id'];
    const artist = req.params['artist'];
    const album = req.params['album'];

    var searchOptions = {
        url: `https://api.spotify.com/v1/search?q=${id}+${artist}+${album}&type=track%2Cartist%2Calbum&limit=5`,
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'Authorization' :  `Bearer ${access_token}`
        },
    };
    request.get(searchOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            songTitle = body;
            res.send(songTitle);
        }

    });
})

app.get('/auth/token', (req, res) => {
    res.json({ access_token: access_token})
})

const playlists = {
    playlist_list : []
}

const songs = {
    song_list :
        [
            {
                title: 'Easy On Me',
                Artist: 'Adele',
                runtime: 3.45,
            },
            {
                title: 'Shivers',
                Artist: 'Ed Sheeran',
                runtime: 3.28,
            },
            {
                title: 'MONEY',
                Artist: 'LISA',
                runtime: 2.48,
            },
            {
                title: 'STAY',
                Artist: 'The Kid LAROI',
                featured: 'Justin Bieber',
                runtime: 2.22,
            },
            {
                title: 'INDUSTRY BABY',
                Artist: 'Lil Nas X',
                featured: 'Jack Harlow',
                runtime: 3.32,
            },
            {
                title: 'Heat Waves',
                Artist: 'Glass Animals',
                runtime: 3.59,
            },
            {
                title: 'My Universe',
                Artist: 'Coldplay',
                featured: 'BTS',
                runtime: 3.48,
            },
            {
                title: 'love nwantiti (ah ah ah)',
                Artist: 'CKay',
                runtime: 2.26,
            },
            {
                title: 'Woman',
                Artist: 'Doja Cat',
                runtime: 2.53,
            },
            {
                title: 'Cold Heart - PNAU Remix',
                Artist: 'Elton John',
                featured: 'Dua Lipa',
                runtime: 3.23,
            },
            {
                title: 'THATS WHAT I WANT',
                Artist: 'Lil Nas X',
                runtime: 2.24,
            },
            {
                title: 'Bad Habits',
                Artist: 'Ed Sheeran',
                runtime: 3.51,
            },
            {
                title: 'Moth To A Flame',
                Artist: 'Swedish House Mafia',
                runtime: 3.54,
            },
            {
                title: 'Ghost',
                Artist: 'Justin Bieber',
                runtime: 2.33,
            },
            {
                title: 'Happier Than Ever',
                Artist: 'Billie Eilish',
                runtime: 2.31,
            },
            {
                title: 'good 4 u',
                Artist: 'Olivia Rodrigo',
                runtime: 2.58,
            },
            {
                title: 'Need to Know',
                Artist: 'Doja Cat',
                runtime: 3.31,
            },
            {
                title: 'MONTERO(Call Me By Your Name',
                Artist: 'Lil Nas X',
                runtime: 2.18,
            },
            {
                title: 'Life Goes On',
                Artist: 'Oliver Tree',
                runtime: 2.42,
            },
            {
                title: 'Pepas',
                Artist: 'Farruko',
                runtime: 4.47,
            },
            {
                title: "Don't Be Shy",
                Artist: 'Tiesto',
                featured: 'KAROL G',
                runtime: 2.21,
            },
            {
                title: 'Let Somebody Go',
                Artist: 'Coldplay',
                featured: 'Selena Gomez',
                runtime: 4.02,
            },
            {
                title: 'Take My Breath',
                Artist: 'The Weeknd',
                runtime: 3.40,
            },
            {
                title: 'Kiss Me More',
                Artist: 'Doja Cat',
                featured: 'SZA',
                runtime: 3.29,
            },
            {
                title: 'Levitating',
                Artist: 'Dua Lipa',
                featured: 'DaBaby',
                runtime: 3.23,
            },
            {
                title: 'OUT OUT',
                Artist: 'Joel Corry',
                featured: 'Jax Jones',
                runtime: 2.43,
            },
            {
                title: 'Meet Me At Our Spot',
                Artist: 'THE ANXIETY',
                featured: 'Willow',
                runtime: 2.43,
            },
            {
                title: 'Livin It Up',
                Artist: 'Young Thug',
                featured: 'Post Malone',
                runtime: 3.31,
            },
            {
                title: 'traitor',
                Artist: 'Olivia Rodrigo',
                runtime: 3.49,
            },
            {
                title: 'Where Are You Now',
                Artist: 'Lost Frequencies',
                featured: 'Calum Scott',
                runtime: 2.28,
            },
        ]
}

app.get('/songs', async (req, res) => {
    const title = req.query['title'];
    if (title !== undefined) {
        const result = await songServices.findSongByTitle(title);
        if (result === undefined || result === null)
            res.status(404).send('Resource not found.');
        else {
            res.send(result);
        }
    } else {
        const result = await songServices.getSongs();
        res.send(result);
    }
});

app.get('/playlists', async (req, res) => {
    const title = req.query['title'];
    if (title !== undefined) {
        const result = await songServices.findPlaylistByTitle(title);
        if (result === undefined || result === null)
            res.status(404).send('Resource not found.');
        else {
            res.send(result);
        }
    } else {
        const result = await songServices.getPlaylists();
        res.send(result);
    }
});

function generateID() {
    let id = "";
    for (let i=0; i < 6; i++) {
        id += String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    }
    for (let j=0; j < 6; j++) {
        id += String.fromCharCode(Math.floor(Math.random() * 10) + 48);
    }
    return id;
}

app.post('/playlists', (req, res) => {
    const playlistToAdd = req.body;
    playlistToAdd['_id'] = generateID();
    songServices.addPlaylist(playlistToAdd);
    res.status(201).send(playlistToAdd).end();
});

app.delete('/playlists/:id', (req, res) => {
    const id = req.params['id'];
    let result = songServices.findPlaylistById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        songServices.deletePlaylist(id)
        res.status(204).end();
    }
});

app.put('/playlists/:id', (req, res) => {
    const id = req.params['id'];
    let result = songServices.findPlaylistById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        const newPlaylist = req.body;
        songServices.editPlaylist(id, newPlaylist);
        res.status(204).end();
    }
});

app.listen(process.env.PORT || port, () => {
    console.log("REST API is listening.");
});