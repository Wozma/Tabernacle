var http = require('http');
const express = require('express');
const app = express();
const internalIp = require('internal-ip');
const figlet = require('figlet');
const axios = require('axios');


const URL_API = "https://api.themoviedb.org/3/movie/76341?api_key=d81f509ee99573f10007ecc04<7db542c";
console.log(URL_API)

app.set('view engine', 'ejs');



app.get('/', (req, res) => {
    res.render("accueil"), [URL_API];
});

app.get('/', function (req, res) {
    axios.get(URL_API)
        .then(response => {
            res.render('index', { pokemon: pokemon });
        })
        .catch(error => {
            console.log(error);
        });
})

app.listen(8080);   
