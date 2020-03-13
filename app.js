
var http = require('http');
const express = require('express');
const app = express();
const internalIp = require('internal-ip');
const figlet = require('figlet');
const axios = require('axios');
const API_KEY_TMDB = "d81f509ee99573f10007ecc047db542c"

require("firebase/auth");
require("firebase/firestore");

// séléctionner tous les éléments
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

/* axios.get('https://api.themoviedb.org/3/movie/${selectRandomFilm}?api_key=${API_KEY_TMDB}&language=fr')
.then(response => {
  console.log(response.data.url);
})

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

let film =""

app.get('/', (req, res) => {
    res.render("accueil", { film: film });
});

app.get('/index', (req, res) => {
let randomNumber = Math.floor(Math.floor(Math.random() * selectFilmsID.length))
let selectRandomFilm = selectFilmsID[randomNumber]
let randomNumber2 = Math.floor(Math.floor(Math.random() * questions.length))
let question = questions[randomnumber2]

console.log(question)

axios.get(`https://api.themoviedb.org/3/movie/${selectRandomFilm}?api_key=${API_KEY_TMDB}&language=fr`)
.then(response => {
    film = response.data
    res.render("index", { film: film, question : question });
})
});


// créer les questions
let questions = [
    {
        question : "",
        imgSrc : "",
        choiceA : "",
        choiceB : "",
        choiceC : "",  
        correct : ""
    },{
        question : "",
        imgSrc : "",
        choiceA : "",
        choiceB : "",
        choiceC : "",
        correct : ""
    },{
        question : "",
        imgSrc : "",
        choiceA : "",
        choiceB : "",
        choiceC : "",
        correct : ""
    }
];

// définir le temps du chrono, le score et le nombre de questions
const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}
// démarrer le quiz
start.addEventListener("click",startQuiz);

function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// la progression
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// le rendu du chrono

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // changer la progression en rouge
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // termine le quiz et montre le score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// vérifier la réponse

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // réponse est correcte
        score++;
        // change la progression en vert
        answerIsCorrect();
    }else{
        // réponse est fausse
        // montre la progression en rouge
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // fin du quiz et montre le score
        clearInterval(TIMER);
        scoreRender();
    }
}

// quand la réponse est correcte
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// quand la réponse est fausse
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// le rendu du score
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calcule le score du joueur
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choisir un résultat à montrer au joueur en fonction de son score
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}


app.listen(8080);   