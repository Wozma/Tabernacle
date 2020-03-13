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