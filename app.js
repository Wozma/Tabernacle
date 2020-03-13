var http = require('http');
const express = require('express');
const app = express();
const internalIp = require('internal-ip');
const figlet = require('figlet');
const axios = require('axios');
const API_KEY_TMDB = "d81f509ee99573f10007ecc047db542c"


require("firebase/auth");
require("firebase/firestore");


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

/*
get film details
https://api.themoviedb.org/3/movie/{id_film}?api_key=b776dda5347f7b2bdc52252573f4e78c&language=en-US
*/

var selectFilmsID = [
    "584",
    "9433",
    "73",
    "158015",
    "2105",
    "190859",
    "38700",
    "920",
    "9354",
    "117251",
    "18785",
    "629",
    "627",
    "2034",
    "863",
    "22794",
    "103",
    "1571",
    "8363",
    "297761",
    "27578",
    "12405",
    "2005",
    "8584",
    "9806",
    "4247",
    "24",
    "101",
    "864",
    "607",
    "680",
    "180",
    "20352",
    "97367",
    "12",
    "68726",
    "87827",
    "161",
    "134374",
    "298",
    "298250",
    "3525",
    "150540",
    "3597",
    "274167",
    "10670",
    "1639",
    "819",
    "9624",
    "63492",
    "54054",
    "9820",
    "10535",
    "11812",
    "1588",
    "337170",
    "8012",
    "7443",
    "9487",
    "4232",
    "16869",
    "2118",
    "861",
]

let film = ''

app.get('/', (req, res) => {
    let randomNumber = Math.floor(Math.floor(Math.random() * selectFilmsID.length))
    let selectRandomFilm = selectFilmsID[randomNumber]

    axios.get(`https://api.themoviedb.org/3/movie/${selectRandomFilm}?api_key=${API_KEY_TMDB}&language=fr`)
        .then(response => {
            film = response.data
            res.render("accueil", { film: film });
        })
});

app.get('/index', (req, res) => {
    res.render("index", { film: film });
});


app.listen(8080);   

