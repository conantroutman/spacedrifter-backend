const express = require('express');
const router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node');

// The artist ID to get albums from
const artistId = '4otyLOpxTJ6VdY0EEfjIcS';
let refreshTimer = Date.now();

// Spotify API config with credentials
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_ID,
    clientSecret: process.env.SPOTIFY_SECRET
})

// Get an access token
const getAccesToken = async () => {
    spotifyApi.clientCredentialsGrant().then(
        function(data) {
            spotifyApi.setAccessToken(data.body['access_token']);
            spotifyApi.setRefreshToken(data.body['refresh_token']);
        },
        function(err) {
            console.log('Something went wrong!', err);
        }
    );
}

// Access token expires after 1 hour, so request new token if 1 hour has passed since the last token was requested
const refreshAccessToken = async () => {
    if (refreshTimer && refreshTimer + 3600 * 1000 < Date.now()) {
        console.log('Refreshing the token')
        await getAccesToken();
        refreshTimer = Date.now();
    } else {
        console.log('Access token still valid');
    }
}

getAccesToken();

// Get albums from Spotify
router.get('/', async function(req, res) {

    await refreshAccessToken();

    // Get the Spotify album data
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