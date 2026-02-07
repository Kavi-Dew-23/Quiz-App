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

let questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choice1: "<script>",
        choice2: "<javaScript>",
        choice3: "<js>",
        choice4: "<scripting>",
        answer: 1
    },
    {
        question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4
    }
]

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

startGame();