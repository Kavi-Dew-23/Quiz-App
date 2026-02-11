//get reference to input text
const username = document.getElementById("username");

//get the save score button disabled or not after the user input
const saveScoreBtn = document.getElementById("saveScoreBtn");

//get the mostrecentscore from the local storage from the game.jsfile
const mostRecentScore = localStorage.getItem("mostRecentScore");

//set the fianlScore equals to the mostRecentScore
const finalScore = document.getElementById("finalScore");

// to store in the local storage it should be a empty string
//localStorage.setItem("highScores", []); //save the highscores as empty string

//converth the above into json string
//localStorage.setItem("highScores", JSON.stringify([]));

//console.log(localStorage.getItem("highScores")); 

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
console.log(highScores);

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    //console.log(username.value); //pop up the username when the user write in the input box
    saveScoreBtn.disabled = !username.value; //enable the save button after user input
});

//function to save the high score
//set the save button to disabled such that after user input the username then only user can save it

saveHighScore = (e) => {
    console.log("Clicked the Save button!");
    e.preventDefault(); // prevent the form taking its default action which is to post to a different page

    const score = {
        score: mostRecentScore,
        name: username.value
    };
    highScores.push(score);
    console.log(highScores);
    //console.log(score);

    highScores.sort( (a,b) => b.score - a.score );
        //if b's score is greater than a score put b's score first than a
        //return b.score - a.score;
    //get only the first 5 highscores
    highScores.splice(5);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign("/");
}