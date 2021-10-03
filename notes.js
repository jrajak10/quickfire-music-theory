

function randomNote(notesArray) {
    let notesArrayLength = notesArray.length;
    let randomIndex = Math.floor(Math.random() * notesArrayLength)
    return notesArray[randomIndex]
}


function createImage(notesArray) {
    let newImage = document.createElement("IMG");
    newImage.setAttribute("src", randomNote(notesArray));
    newImage.setAttribute("id", "note-image");
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

function clickNewButton(newButton, id, totalScore, notesArray) {
    newButton.onclick = function () {
        if (id === 'tick-button') {
            totalScore++
            document.getElementById("score-panel").innerHTML = `<p id="score">Score: ${totalScore}</p>`
        }
        changeImage(notesArray);
    }
}

function createButton(id, text, notesArray) {
    let newButton = document.createElement("BUTTON");
    newButton.innerHTML = text;
    newButton.setAttribute("id", id);

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
    timerStyle.border = "solid 5px #0D0628";
    timerStyle.borderRadius = "50%";
    timerStyle.padding = "5px";
}

function returnScore(scorePanel) {
    let score = scorePanel.replace("<p id=\"score\">Score: ", "").replace("</p>", "");
    document.getElementById('result-page').style.display = "block";
    document.getElementById('result-page').innerHTML = "<p id=\"end-message\">TIME\'S UP!!!</p>" +
        "<p id=\"score-message\">You scored " + score + "!</p>";
    document.getElementById('hidden-endtimer-features').style.display = "none";
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
} 0

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


function updateScorePanel(id) {
    let scorePanel = document.getElementById(id);
    scorePanel.innerHTML = "<p id=\"score\">Score: 0</p>";
    scorePanel.style.border = "solid 3px #0D0628";
    scorePanel.style.height = "50px";
    scorePanel.style.width = "80px";
    scorePanel.style.padding = "10px 10px";
}

function addButtonsAndImage(notesArray) {
    if (document.getElementById("image").childNodes.length <= 1) {
        createImage(notesArray);
        createButton('tick-button', "&#10003", notesArray);
        createButton('cross-button', "&#10060", notesArray);
    }
}

function clickStartButton() {
    let notesArray = ["Notes/Treble C4.png", "Notes/Treble D4.png", "Notes/Treble E4.png", "Notes/Treble F4.png",
        "Notes/Treble G4.png", "Notes/Treble A4.png", "Notes/Treble B4.png", "Notes/Treble C5.png",
        "Notes/Treble D5.png", "Notes/Treble E5.png", "Notes/Treble F5.png", "Notes/Treble G5.png", "Notes/Treble A5.png",
        "Notes/Bass E2.png", "Notes/Bass F2.png", "Notes/Bass G2.png", "Notes/Bass A2.png", "Notes/Bass B2.png",
        "Notes/Bass C3.png", "Notes/Bass D3.png", "Notes/Bass E3.png", "Notes/Bass F3.png", "Notes/Bass G3.png",
        "Notes/Bass A3.png", "Notes/Bass B3.png", "Notes/Bass C4.png"];

    document.getElementById('timer').innerHTML = 30
    styleTimer('timer');
    startTimer();

    updateScorePanel('score-panel');
    randomNote(notesArray);
    hideStartButton("start-button");
    addButtonsAndImage(notesArray);
    document.getElementById('hidden-endtimer-features').style.display = "block";

}