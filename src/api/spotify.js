const express = require('express');
const router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node');

// Spotify API config with credentials
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_ID,
    clientSecret: process.env.SPOTIFY_SECRET
})

// Get an access token
spotifyApi.clientCredentialsGrant().then(
    function(data) {
        spotifyApi.setAccessToken(data.body['access_token']);
    },
    function(err) {
        console.log('Something went wrong!', err);
    }
);

// The artist ID to get albums from
const artistId = '4otyLOpxTJ6VdY0EEfjIcS';

// Get albums from Spotify
router.get('/', async function(req, res) {
    let response = {};
    await spotifyApi.getArtistAlbums(artistId)
        .then(function(data) {
            response = data.body;
        }, function(err) {
            response = err;
            console.error(err);
        });
    return res.json(response);
})

module.exports = router;