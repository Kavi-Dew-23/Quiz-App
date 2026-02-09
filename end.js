//get reference to input text
const username = document.getElementById("username");

//get the save score button disabled or not after the user input
const saveScoreBtn = document.getElementById("saveScoreBtn");

//get the mostrecentscore from the local storage from the game.jsfile
const mostRecentScore = localStorage.getItem("mostRecentScore");

//set the fianlScore equals to the mostRecentScore
const finalScore = document.getElementById("finalScore");
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

}