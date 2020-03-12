var http = require('http');
const express = require('express');
const app = express();
const internalIp = require('internal-ip');
const figlet = require('figlet');
const axios = require('axios');
// must be listed before other Firebase SDKs

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

/*
get fim details
https://api.themoviedb.org/3/movie/{id_film}?api_key=b776dda5347f7b2bdc52252573f4e78c&language=en-US
*/

var selectFilmsID = [
    "90",
    "12",
    "91",
    "80"
]

const API_KEY_TMDB = "b776dda5347f7b2bdc52252573f4e78c"


app.get('/', (req, res) => {
    let randomNumber = Math.floor(Math.floor(Math.random() * selectFilmsID.length))
    let selectRandomFilm = selectFilmsID[randomNumber]

    axios.get(`https://api.themoviedb.org/3/movie/${selectRandomFilm}?api_key=${API_KEY_TMDB}&language=en - US`)
        .then(response => {
            let film = response.data
            res.render("accueil", { film: film });
        })
});

app.get('/index', (req, res, next) => {
    res.render("index");
});


app.listen(8080);   
