var http = require('http');
const express = require('express');
const app = express();
const internalIp = require('internal-ip');
const figlet = require('figlet');
const axios = require('axios');
// must be listed before other Firebase SDKs
const firebase = require("firebase/app");
const MovieDB = require('moviedb')('d81f509ee99573f10007ecc04<7db542c');

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");


app.set('view engine', 'ejs');

MovieDB.searchMovie({ query: 'Alien' }, (err, res) => {
    console.log(res);
  });


app.get('/', (req, res) => {
    res.render("accueil");
});

app.get('/index', (req, res, next) => {
    res.render("index");
});

app.get('/', function (req, res) {
    axios.get(URL_API)
        .then(response => {
            res.render('index', { movie : movie });
        })
        .catch(error => {
            console.log(error);
        });
})

app.listen(8080);   
