require("dotenv").config();
const keys = require('./javascript/keys.js');
const Spotify = require('node-spotify-api');
const consoleTable = require('console.table');
const request = require('request');
const moment = require('moment');


const spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});


if (process.argv[2] === 'concert-this') {

    const artist = process.argv.slice(3).join(" ")
    console.log(artist);

    const queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    request(queryURL, function (error, response, body) {
        if (error) console.log(error);
        const result = JSON.parse(body)[0];
        console.log("Venue name " + result.venue.name);
        console.log("Venue location " + result.venue.city);
        console.log("Date of Event " + moment(result.datetime).format("MM/DD/YYYY"));

    });



} else if (process.argv[2] == 'spotify-this-song') {

    const songName = process.argv.slice(3).join(" ");

    if (songName == undefined) {
        songName = "The sign by Ace of Base";
    }


    spotify.search({ type: 'track', query: songName, limit: 10 }, function (error, data) {
        if (error) {
            return console.log('Error occurred: ' + error);
        }

        const tableArray = [];

        for (const i = 0; i < data.tracks.items.length; i++) {
            const result = {
                artist: data.tracks.items[i].album.artists[0].name,
                album_name: data.tracks.items[i].album.name,
                song_name: data.tracks.items[i].name,
                preview_url: data.tracks.items[i].preview_url
            }
            tableArray.push(result);
        }


        const table = consoleTable.getTable(tableArray);

        console.log(table);


    });



} else if (process.argv[2] == 'movie-this') {
    const movieName = process.argv.slice(3).join(" ");

    if (movieName == undefined) {
        movieName = "Mr. Nobody";
    }

    request('http://www.omdbapi.com/?i=tt3896198&apikey=33352494' + process.argv[3], function (error, response, body) {

        const result = JSON.parse(body);
        console.log("Title :" + result.Title);
        console.log("Year :" + result.Released);
        console.log("IMDB Rating :" + result.imdbRating);
        console.log("Rotten Tomatoes :" + result.Ratings[1].Value);
        console.log("Country :" + result.Country);
        console.log("Language :" + result.Language);
        console.log("Movie Plot :" + result.Plot);
        console.log("Actors :" + result.Actors);

    });

} else if (process.argv[2] == 'do-what-it-says') {
    console.log('do what it says')
}


