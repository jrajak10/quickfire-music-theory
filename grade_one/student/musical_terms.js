function generateRandomArrayElement(imageArray) {
    let imageArrayLength = imageArray.length;
    let randomIndex = Math.floor(Math.random() * imageArrayLength)
    return imageArray[randomIndex]
}

//removes chosen image from the array to avoid repeated images students may not know!
function createImage(imageArray) {
    let newImage = document.createElement("IMG");
    let selectedElement = generateRandomArrayElement(imageArray)
    newImage.setAttribute("src", selectedElement);
    newImage.setAttribute("id", "note-image");
    newImage.setAttribute("alt", selectedElement);
    document.getElementById("image").appendChild(newImage);
    let elementIndex = imageArray.indexOf(selectedElement);
    imageArray.splice(elementIndex, 1);
}

//changes the image once tick/cross buttons are clicked
function changeImage(imageArray) {
        let note = document.getElementById("note-image")
        note.parentNode.removeChild(note);
        createImage(imageArray);
}

function hideStartButton(id) {
    let startButton = document.getElementById(id)
    startButton.parentNode.removeChild(startButton);

}

function styleTimer(id) {
    let timerStyle = document.getElementById(id).style;
    timerStyle.border = "solid 5px #0D0628";
    timerStyle.borderRadius = "50%";
    timerStyle.padding = "5px";
    timerStyle.display = "flex";
}

function returnScore(scorePanel) {
    let score = scorePanel.replace("<p id=\"score\">Score: ", "").replace("</p>", "");
    document.getElementById('result-page').style.display = "block";
    document.getElementById('result-page').innerHTML = "<p id=\"end-message\">TIME\'S UP!!!</p>" +
        "<p id=\"score-message\">You scored " + score + "!</p>";
    document.getElementById('hidden-features').style.display = "none";
    let correctionsDiv = "<h2>Incorrect Answers</h2><table></table>"
    showCorrections(correctionsDiv)
}

function showCorrections(correctionsDiv) {
    if (document.getElementById('corrections').innerHTML === correctionsDiv) {
        document.getElementById('corrections').style.display = "none";
    }
    else document.getElementById('corrections').style.display = "block";
}

function createTryAgainButton(tryAgainButton) {
    tryAgainButton.innerHTML = "Try Again";
    tryAgainButton.setAttribute("id", "try-again-button");
    tryAgainButton.setAttribute("height", "80");
    tryAgainButton.setAttribute("width", "100");
    tryAgainButton.onclick = function () {
        location.reload()
    }
    document.getElementById('result-page').appendChild(tryAgainButton);
}

function endTimerWarningColour(sec, imageArray) {
    if (sec <= 10 || imageArray < 1) {
        document.getElementById("timer").style.color = "#c2002d";
        document.getElementById("timer").style.borderColor = "#c2002d";
    }
}

function styleEndTimer(id) {
    document.getElementById(id).style.marginLeft = "auto";
    document.getElementById(id).style.marginRight = "auto";
}

function updateScorePanel(id) {
    let scorePanel = document.getElementById(id);
    scorePanel.innerHTML = "<p id=\"score\">Score: 0</p>";
    scorePanel.style.border = "solid 3px #0D0628";
    scorePanel.style.display = "flex";
    scorePanel.style.padding = "10px 10px";
}

function addInputAndImage(imageArray) {
    if (document.getElementById("image").childNodes.length <= 1) {
        createImage(imageArray);
    }
    document.getElementById("input").style.display = "block";
    document.getElementById("answer").focus();
}

function ignoreCase(answer) {
    let letter = answer.split(' ')[0];
    let ignoreCase = answer.split(' ')[1].toLowerCase();
    answer = letter + ' ' + ignoreCase;
    return answer;
}

function correctAnswerCounter(correctAnswers, totalScore, answer) {
    let imageFile = document.getElementById("note-image").alt
    if (typeof (correctAnswers[imageFile]) === "object" && correctAnswers[imageFile].indexOf(answer) !== -1 ||
        correctAnswers[imageFile] === answer) {
        totalScore++
        document.getElementById("score-panel").innerHTML = `<p id="score">Score: ${totalScore}</p>`
    }
    return totalScore
}

function isValidAnswer(answer){
    let validAnswer;
    if (answer === "") {
        validAnswer = false;
    }
    else {
        validAnswer = true;
    }
    return validAnswer
}

function checkValidAnswer(imageArray) {
    let textAlert = document.getElementById("enter-text-alert")
    
    if (!isValidAnswer(this.answer.value)) {
        textAlert.style.display = "block";
    }
    else {
        textAlert.style.display = "none";
        this.answer.value = "";
        changeImage(imageArray);
    }
}

function clickWhenPressEnter(id) {
    let input = document.getElementById(id);
    // Execute a function when the user releases a key on the keyboard
    input.addEventListener("keyup", function (event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            document.getElementById("submit-button").click();
        }
    });
}

//returns corrections at the end of the round
function returnCorrections(statement, correctImageArray, incorrectAnswerArray, correctAnswerArray){
    if(incorrectAnswerArray.length === 0){
        statement += "<p class=\"answer-description\">Congratulations!<br>You had no incorrect answers!!! </p>"
    }
    else {
        for (let i = 0; i < correctImageArray.length; i++) {
            let correctAnswer = correctAnswerArray[i]
            if (typeof (correctAnswer) === "string") {
                statement += "<div class=\"correction\"><img class=\"correct-image\" src=\"" + correctImageArray[i] +
                    "\"><p class=\"answer-description\">You said "
                    + incorrectAnswerArray[i] + ".<br> The correct answer was " +
                    correctAnswer + ".</p></div>"
            }
            else {
                statement += "<div class=\"correction\"><img class=\"correct-image\" src=\"" + correctImageArray[i] +
                    "\"><p class=\"answer-description\">You said "
                    + incorrectAnswerArray[i] + ".<br> The correct answer was " +
                    correctAnswer[0] + ".</p></div>"
            }
        }
    }

    return statement + "</table>"
}

function saveIncorrectAnswer(answer, correctAnswers, imageFile, correctImageArray, incorrectAnswerArray, correctAnswerArray) {
    let correctAnswer = correctAnswers[imageFile];
    if (answer !== correctAnswer && typeof (correctAnswer) === "string" ||
        correctAnswer.indexOf(answer) === -1 && typeof (correctAnswer) === "object") {
        correctImageArray.push(imageFile);
        incorrectAnswerArray.push(answer);
        correctAnswerArray.push(correctAnswers[imageFile])
    }

    let statement = "<h2>Incorrect Answers</h2><table>"
    return returnCorrections(statement, correctImageArray, incorrectAnswerArray, correctAnswerArray)
}

function clickSubmitButton(imageArray, correctAnswers, totalScore, correctImageArray, incorrectAnswerArray, correctAnswerArray){
    
    document.getElementById("submit-button").onclick = function(){
        let answer = document.getElementById("answer").value;
        let imageFile = document.getElementById("note-image").alt;
        totalScore = correctAnswerCounter(correctAnswers, totalScore, answer);
        checkValidAnswer(imageArray);
        let incorrectAnswers = saveIncorrectAnswer(answer, correctAnswers, imageFile, 
            correctImageArray, incorrectAnswerArray, correctAnswerArray);
        document.getElementById('corrections').innerHTML = incorrectAnswers;
        return totalScore;
    }
}

function endTimer(timer) {
        clearInterval(timer);
        styleEndTimer("timer");
        let scorePanel = document.getElementById("score-panel").innerHTML
        returnScore(scorePanel);
        let tryAgainButton = document.createElement("BUTTON");
        createTryAgainButton(tryAgainButton)
        document.getElementById('back-button').style.display = "none";
}

function startTimer(imageArray) {
    let sec = 60;
    let timer = setInterval(function () {
        sec--;
        document.getElementById('timer').innerHTML = sec;
        styleTimer('timer');
        
        endTimerWarningColour(sec, imageArray);
        if (sec <= 0 || imageArray.length < 1) {
        endTimer(timer);
        document.getElementById('timer').innerHTML = 0
        }

    }, 1000);
}

async function fetchData(data) {
    let fetchedData = await fetch(data);
    let json = await fetchedData.json();
    let features = json.features;
    return features
}


function startButtonFeatures() {
    document.getElementById('back-button').style.display = "block";
    document.getElementById('buttons').style.display = "block";
    document.getElementById('hidden-features').style.display = "block";
    document.getElementById('round-heading').style.display = "none";
}

async function clickStartButton() {
    let imageArrayData = await fetchData("../../images.json")
    let imageArray = imageArrayData["grade_1_musical_terms"]

    let correctAnswersData = await fetchData("correct_answers.json")
    let correctAnswers = correctAnswersData["grade_1_musical_terms"]
    document.getElementById('timer').innerHTML = 60
    styleTimer('timer');
    startTimer(imageArray);
    updateScorePanel('score-panel');
    generateRandomArrayElement(imageArray);
    hideStartButton("start-button");
    addInputAndImage(imageArray);
    startButtonFeatures()


    let totalScore = 0
    let correctImageArray = []
    let incorrectAnswerArray = []
    let correctAnswerArray = []
    clickSubmitButton(imageArray, correctAnswers, totalScore,
        correctImageArray, incorrectAnswerArray, correctAnswerArray)
    clickWhenPressEnter("answer")
}