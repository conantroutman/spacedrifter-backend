const express = require('express');
const router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node');

// Spotify API config
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_ID,
    clientSecret: process.env.SPOTIFY_SECRET
})
spotifyApi.setAccessToken(process.env.SPOTIFY_TOKEN);

const artistId = '4otyLOpxTJ6VdY0EEfjIcS';

// Get albums from Spotify
router.get('/', async function(req, res) {
    let response = {};
    await spotifyApi.getArtistAlbums(artistId)
        .then(function(data) {
            response = data.body;
        }, function(err) {
            console.error(err);
        });
    return res.json(response);
})

module.exports = router;