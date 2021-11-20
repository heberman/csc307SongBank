const express = require('express');
const cors = require('cors');
var querystring = require('querystring');
const dotenv = require("dotenv");
dotenv.config();

const songServices = require('./song-services');
const songServices = require('./so');
const request = require('superagent');
const { refreshAccessToken } = require('../spotify-api/spotify-web-api-node/src/server-methods');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`);
// });

var generateRandomString = function (length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * 
        charactersLength));
   }
   return result;
}

app.listen(process.env.PORT || port, () => {
    console.log("REST API is listening.");
  });

var redirect_uri = 'http://localhost:5000/callback';
  
app.get('/login', function(req, res) {

    var state = generateRandomString(16);
    var scope = "streaming user-read-email user-read-private";

    var auth_query_parameters = new URLSearchParams({
        response_type: 'code',
        client_id: process.env.CLIENT_ID,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
    })
    console.log('https://accounts.spotify.com/authorize?' +  auth_query_parameters.toString())
    res.redirect('https://accounts.spotify.com/authorize?' +  auth_query_parameters.toString());
});

app.get('/callback', function(req, res) {

    var code = req.query.code || null;
    var state = req.query.state || null;
    console/log('callback');
    if (state === null) {
      res.redirect('/#' +
        querystring.stringify({
          error: 'state_mismatch'
        }));
    } else {
      var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: 'authorization_code'
        },
        headers: {
          'Authorization': 'Basic ' + (Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
        },
        json: true
      };
      
      request.post(authOptions, function (error, response, body){
          if (!error && response.statusCode === 200) {
            acess_token = body.access_token;
            res.redirect("/?token=" + acess_token)
          }
      });
    }
  });

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
    const result = await songServices.findSongByTitle(title);
    if (result === undefined || result === null)
        res.status(404).send('Resource not found.');
    else {
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

app.post('/playlists', (req, res) => {
    const playlistToAdd = req.body;
    songServices.addPlaylist(playlistToAdd);
    addPlaylistLocally(playlistToAdd);
    res.status(201).send(playlistToAdd).end();
});

function addPlaylistLocally(playlist){
    playlists['playlist_list'].push(playlist);
}

// const findSongByTitle = (title) => {
//     return songs['song_list'].filter( (song) => song['title'] === title);
// }