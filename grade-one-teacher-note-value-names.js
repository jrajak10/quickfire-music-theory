

function generateRandomArrayElement(imageArray) {
    let imageArrayLength = imageArray.length;
    let randomIndex = Math.floor(Math.random() * imageArrayLength)
    return imageArray[randomIndex]
}


function createImage(imageArray) {
    let newImage = document.createElement("IMG");
    newImage.setAttribute("src", generateRandomArrayElement(imageArray));
    newImage.setAttribute("id", "note-image");
    newImage.setAttribute("alt", "Note");
    document.getElementById("image").appendChild(newImage);
}

//changes the image once tick/cross buttons are clicked
function changeImage(imageArray) {
    if (document.getElementById("image").childNodes.length <= 1) {
        createImage(imageArray);
    }
    else {
        let note = document.getElementById("note-image")
        note.parentNode.removeChild(note);
        createImage(imageArray);
    }
}

//adds to score if it's a tick button
function clickNewButton(newButton, id, totalScore, imageArray) {
    newButton.onclick = function () {
        if (id === 'tick-button') {
            totalScore++
            document.getElementById("score-panel").innerHTML = `<p id="score">Score: ${totalScore}</p>`
        }
        changeImage(imageArray);
    }
}

function createButton(id, text, imageArray) {
    let newButton = document.createElement("BUTTON");
    newButton.innerHTML = text;
    newButton.setAttribute("id", id);

    let totalScore = 0
    clickNewButton(newButton, id, totalScore, imageArray)

    document.getElementById("buttons").appendChild(newButton);
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

function tenSecondsRemaining(sec) {
    if (sec <= 10) {
        document.getElementById("timer").style.color = "#c2002d";
        document.getElementById("timer").style.borderColor = "#c2002d";
    }
}

function styleEndTimer(id) {
    document.getElementById(id).style.marginLeft = "auto";
    document.getElementById(id).style.marginRight = "auto";
}

function endTimer(sec, timer) {
    if (sec <= 0) {
        clearInterval(timer);
        styleEndTimer("timer");
        let scorePanel = document.getElementById("score-panel").innerHTML
        returnScore(scorePanel);
        let tryAgainButton = document.createElement("BUTTON");
        createTryAgainButton(tryAgainButton)
        document.getElementById('back-button').style.display = "none";
    }
}

function startTimer() {
    let sec = 30;
    let timer = setInterval(function () {
        sec--;
        document.getElementById('timer').innerHTML = sec;
        styleTimer('timer');

        tenSecondsRemaining(sec);
        endTimer(sec, timer);

    }, 1000);
}

function startButtonFeatures(){
    document.getElementById('back-button').style.display = "block";
    document.getElementById('buttons').style.display = "block";
    document.getElementById('hidden-features').style.display = "block";
    document.getElementById('round-heading').style.display = "none";
}

function updateScorePanel(id) {
    let scorePanel = document.getElementById(id);
    scorePanel.innerHTML = "<p id=\"score\">Score: 0</p>";
    scorePanel.style.border = "solid 3px #0D0628";
    scorePanel.style.display= "flex";
    scorePanel.style.padding = "10px 10px";
}

function addButtonsAndImage(imageArray) {
    if (document.getElementById("image").childNodes.length <= 1) {
        createImage(imageArray);
        createButton('tick-button', "&#10003", imageArray);
        createButton('cross-button', "&#10060", imageArray);
    }
}

async function fetchData(data) {
    let fetchedData = await fetch(data);
    let json = await fetchedData.json();
    let features = json.features;
    return features
}

async function clickStartButton() {
    let imageArrayData = await fetchData("images.json")
    let imageArray = imageArrayData["grade_1_note_value_names"]

    document.getElementById('timer').innerHTML = 30
    styleTimer('timer');
    startTimer();

    updateScorePanel('score-panel');
    generateRandomArrayElement(imageArray);
    hideStartButton("start-button");
    addButtonsAndImage(imageArray);
    startButtonFeatures()
}