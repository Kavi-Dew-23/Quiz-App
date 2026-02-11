const highScoresList = document.getElementById('highScoresList');
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

//console.log(highScores);

//highScores.map(score => {
    //console.log(`${score.name}-${score.score}`); //eg: jess-85
    //create an ally that has all
    //console.log(`<li class="high-score">${score.name}-${score.score}</li>`);
//})

//get a string with all of content in it
/*
console.log(
    highScores.map(score => {
        return `<li class="high-score">${score.name}-${score.score}</li>`;
    }).join("")
);
*/

//show the high scores in tha page as ordered list
highScoresList.innerHTML = highScores
    .map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
}).join("");
