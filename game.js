const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

//add a question counter
//const questionCounterText = document.getElementById("questionCounter");
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById('score');

//adding a progress bar
const progressBarFull = document.getElementById('progressBarFull');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

//use fetch API to go out and fetch the questions
fetch("questions.json").then(res => {
    //console.log(res);
    return res.json();
}).then(loadedQuestions => {
    console.log(loadedQuestions);
    questions = loadedQuestions;
    startGame();
}).catch(err => {
    console.error(err);
});

//Create Constants

const CORRECT_BONUS = 10; // How much the correct answer is worth
const MAX_QUESTIONS = 3; // how many questions user get 

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    //console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        //save the score in the local storage so that end screen can display it
        localStorage.setItem('mostRecentScore', score);
        //after there is no questions in the array
        return window.location.assign("/end.html");
    }

    questionCounter++;

    //which question is in out of all questions
    //questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    
    //update the progress bar
    // console.log((questionCounter / MAX_QUESTIONS) * 100);
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length); // get randon questions from the given array with length of 3 questions
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;     //get the inner text in the question

    // get thw choices
    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    //splice out the questions that have already answered
    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        //console.log(selectedAnswer);

        //print on the console the selected answer is true
        //console.log(selectedAnswer == currentQuestion.answer);

        /*
        let classToApply = 'incorrect';
        if(selectedAnswer == currentQuestion.answer) {
            classToApply = 'correct';
        }
        */

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if(classToApply === 'correct'){
            incrementScore(CORRECT_BONUS);
        }

        //adding the color to the selected answer
        selectedChoice.parentElement.classList.add(classToApply);

        //set time out to shwo the color of the selected answer
        setTimeout(() => {
            //removing the previously added selected answer item
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();

        }, 1000);

        
        console.log(classToApply);

        //getNewQuestion();
    });
});

//if the user answered correctly increment the score
incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

