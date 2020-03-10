/* const express = require('express');
const app = express();
const internalIp = require('internal-ip');
const figlet = require('figlet');
const axios = require('axios');

const URL_API = "https://api.themoviedb.org/3/movie/76341?api_key=d81f509ee99573f10007ecc04<7db542c";

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    axios.get(URL_API)
        .then(response => {
            let tabernacle = response.data
            res.render('index', { tabernacle: tabernacle });
        })
        .catch(error => {
            console.log(error);
        });
})

http.listen(port, function () {
    figlet('Tabernacle', function (err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log("\x1b[36m", data)
        console.log("\x1b[36m", `> http://localhost:${port}`)
        console.log("\x1b[32m", `> http://${internalIp.v4.sync()}:${port}`)
    });
});
  */

var http = require('http');
const express = require('express');
const app = express();
const internalIp = require('internal-ip');
const figlet = require('figlet');
const axios = require('axios');

const URL_API = "https://api.themoviedb.org/3/movie/76341?api_key=d81f509ee99573f10007ecc04<7db542c";

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render("index" , {prenom: "thomas"})
})

app.listen(8080);