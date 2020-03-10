const express = require('express');
const app = express();
const http = require('http').Server(app);
const port = process.env.PORT || 3000;
const internalIp = require('internal-ip');
const figlet = require('figlet');
const axios = require('axios');

const URL_API = "https://api.themoviedb.org/3/movie/76341?api_key=d81f509ee99573f10007ecc04<7db542c";



const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});