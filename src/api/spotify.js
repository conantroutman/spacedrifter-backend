const express = require('express');
const router = express.Router();

const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_ID,
    clientSecret: process.env.SPOTIFY_SECRET,
    redirectUri: 'http://localhost:4545'
})

spotifyApi.setAccessToken(process.env.SPOTIFY_TOKEN);

router.get('/', async function(req, res) {
    let test = {};
    await spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE')
        .then(function(data) {
            test = data.body;
        }, function(err) {
            console.error(err);
        });
    return res.json(test);
})

module.exports = router;