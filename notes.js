

function randomNote(notesArray) {
    let notesArrayLength = notesArray.length;
    let randomIndex = Math.floor(Math.random() * notesArrayLength)
    return notesArray[randomIndex]
}


function createImage(notesArray) {
    let newImage = document.createElement("IMG");
    newImage.setAttribute("src", randomNote(notesArray));
    newImage.setAttribute("id", "note-image");
    newImage.setAttribute("height", "250");
    newImage.setAttribute("width", "250");
    newImage.setAttribute("alt", "Note");
    document.getElementById("image").appendChild(newImage);
}

function changeImage(notesArray) {
    if (document.getElementById("image").childNodes.length <= 1) {
        createImage(notesArray);
    }
    else {
        let note = document.getElementById("note-image")
        note.parentNode.removeChild(note);
        createImage(notesArray);
    }
}

function countScore(totalScore) {


    if (id === 'tick-button') {
        totalScore++
        document.getElementById("score-panel").innerHTML = totalScore
    }
}

function clickNewButton(newButton, id, totalScore, notesArray) {
    newButton.onclick = function () {
        if (id === 'tick-button') {
            totalScore++
            document.getElementById("score-panel").innerHTML = "Score: " + totalScore
        }
        changeImage(notesArray);
    }

}

function createButton(id, text, notesArray) {
    let newButton = document.createElement("BUTTON");
    newButton.innerHTML = text;
    newButton.setAttribute("id", id);
    newButton.setAttribute("height", "80");
    newButton.setAttribute("width", "100");

    let totalScore = 0
    clickNewButton(newButton, id, totalScore, notesArray)

    document.getElementById("buttons").appendChild(newButton);
}

function hideStartButton(id) {
    let startButton = document.getElementById(id)
    startButton.parentNode.removeChild(startButton);

}

function styleTimer(id) {
    let timerStyle = document.getElementById(id).style;
    timerStyle.border = "solid 2px #000";
    timerStyle.borderRadius = "50%";
    timerStyle.maxHeight = "25px";
    timerStyle.maxWidth = "25px";
    timerStyle.padding = "5px";
}

function returnScore(scorePanel) {
    let score = scorePanel.split(' ')[1]
    document.getElementById('page').innerHTML = "TIME\'S UP!!! You scored " + score + "!";
}


function endTimer(sec, timer) {
    if (sec <= 0) {
        clearInterval(timer);
        let scorePanel = document.getElementById("score-panel").innerHTML
        returnScore(scorePanel);
    }
}

function startTimer() {
    let sec = 60;
    let timer = setInterval(function () {
        sec--;
        document.getElementById('timer').innerHTML = sec;
        styleTimer('timer');

        endTimer(sec, timer);

    }, 1000);
}


function updateScorePanel(id) {
    let scorePanel = document.getElementById(id);
    scorePanel.innerHTML = "Score: 0";
    scorePanel.style.border = "solid 3px #000";
    scorePanel.style.height = "50px";
    scorePanel.style.width = "70px";
    scorePanel.style.padding = "10px 10px";
}

function clickStartButton() {
    let notesArray = ["Notes/Treble C4.png", "Notes/Treble D4.png", "Notes/Treble E4.png", "Notes/Treble F4.png",
        "Notes/Treble G4.png", "Notes/Treble A4.png", "Notes/Treble B4.png", "Notes/Treble C5.png",
        "Notes/Treble D5.png", "Notes/Treble E5.png", "Notes/Treble F5.png","Notes/Treble G5.png", "Notes/Treble A5.png", 
        "Notes/Bass E2.png", "Notes/Bass F2.png", "Notes/Bass G2.png", "Notes/Bass A2.png", "Notes/Bass B2.png", 
        "Notes/Bass C3.png", "Notes/Bass D3.png", "Notes/Bass E3.png", "Notes/Bass F3.png", "Notes/Bass G3.png", 
        "Notes/Bass A3.png", "Notes/Bass B3.png", "Notes/Bass C4.png"];

    document.getElementById('timer').innerHTML = 60
    styleTimer('timer');
    startTimer()

    updateScorePanel('score-panel')
    randomNote(notesArray);
    hideStartButton("start-button");

    if (document.getElementById("image").childNodes.length <= 1) {
        createImage(notesArray);
        createButton('tick-button', "&#9989", notesArray);
        createButton('cross-button', "&#10060", notesArray);
    }
    else {
        let note = document.getElementById("note")
        note.parentNode.removeChild(note);
        createImage(notesArray);
    }
}