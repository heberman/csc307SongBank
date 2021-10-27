const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

const songs = {
    song_list:
    [
        {
            title: 'Easy On Me',
            Artist: 'Adele',
            featured: '',
            runtime: '3.45',
        },
        {
            title: 'Shivers',
            Artist: 'Ed Sheeran',
            featured: '',
            runtime: '3.28',
        },
        {
            title: 'MONEY',
            Artist: 'LISA',
            featured: '',
            runtime: '2:48',
        },
        {
            title: 'STAY',
            Artist: 'The Kid LAROI',
            featured: 'Justin Bieber',
            runtime: '2.22',
        },
        {
            title: 'INDUSTRY BABY',
            Artist: 'Lil Nas X',
            featured: 'Jack Harlow',
            runtime: '3.32',
        },
        {
            title: 'Heat Waves',
            Artist: 'Glass Animals',
            runtime: '3.59',
        },
        {
            title: 'My Universe',
            Artist: 'Coldplay',
            featured: 'BTS',
            runtime: '3.48',
        },
        {
            title: 'love nwantiti (ah ah ah)',
            Artist: 'CKay',
            featured: '',
            runtime: '2.26',
        },
        {
            title: 'Woman',
            Artist: 'Doja Cat',
            featured: '',
            runtime: '2.53',
        },
        {
            title: 'Cold Heart - PNAU Remix',
            Artist: 'Elton John',
            featured: 'Dua Lipa',
            runtime: '3.23',
        },
        {
            title: 'THATS WHAT I WANT',
            Artist: 'Lil Nas X',
            featured: '',
            runtime: '2.24',
        },
        {
            title: 'Bad Habits',
            Artist: 'Ed Sheeran',
            featured: '',
            runtime: '3.51',
        },
        {
            title: 'Moth To A Flame',
            Artist: 'Swedish House Mafia',
            featured: 'The Weeknd',
            runtime: '3.54',
        },
        {
            title: 'Ghost',
            Artist: 'Justin Bieber',
            featured: '',
            runtime: '2.33',
        },
        {
            title: 'Happier Than Ever',
            Artist: 'Billie Eilish',
            featured: '',
            runtime: '2.31',
        },
        {
            title: 'good 4 u',
            Artist: 'Olivia Rodrigo',
            featured: '',
            runtime: '2.58',
        },
        {
            title: 'Need to Know',
            Artist: 'Doja Cat',
            featured: '',
            runtime: '3.31',
        },
        {
            title: 'MONTERO(Call Me By Your Name',
            Artist: 'Lil Nas X',
            featured: '',
            runtime: '2.18',
        },
        {
            title: 'Life Goes On',
            Artist: 'Oliver Tree',
            featured: '',
            runtime: '2.42',
        },
        {
            title: 'Pepas',
            Artist: 'Farruko',
            featured: '',
            runtime: '4.47',
        },
        {
            title: "Don't Be Shy",
            Artist: 'Tiesto',
            featured: 'KAROL G',
            runtime: '2.21',
        },
        {
            title: 'Let Somebody Go',
            Artist: 'Coldplay',
            featured: 'Selena Gomez',
            runtime: '4.02',
        },
        {
            title: 'Take My Breath',
            Artist: 'The Weeknd',
            featured: '',
            runtime: '3.40',
        },
        {
            title: 'Kiss Me More',
            Artist: 'Doja Cat',
            featured: 'SZA',
            runtime: '3.29',
        },
        {
            title: 'Levitating',
            Artist: 'Dua Lipa',
            featured: 'DaBaby',
            runtime: '3.23',
        },
        {
            title: 'OUT OUT',
            Artist: 'Joel Corry',
            featured: 'Jax Jones',
            runtime: '2.43',
        },
        {
            title: 'Meet Me At Our Spot',
            Artist: 'THE ANXIETY',
            featured: 'Willow',
            runtime: '2.43',
        },
        {
            title: 'Livin It Up',
            Artist: 'Young Thug',
            featured: 'Post Malone',
            runtime: '3.31',
        },
        {
            title: 'traitor',
            Artist: 'Olivia Rodrigo',
            featured: '',
            runtime: '3.49',
        },
        {
            title: 'Where Are You Now',
            Artist: 'Lost Frequencies',
            featured: 'Calum Scott',
            runtime: '2.28',
        },
    ]
}

app.get('/songs', (req, res) => {
    const title = req.query.title;
    if (title !== undefined){
        let result = findSongByTitle(title);
        if (result === undefined || result.length == 0)
            res.status(404).send('Resource not found.');
        else {
            result = {song_list: result};
            res.send(result);
        }
    }
    else{
        throw Error;
    }
});

const findSongByTitle = (title) => {
    return songs['song_list'].filter( (song) => song['title'] === title);
}