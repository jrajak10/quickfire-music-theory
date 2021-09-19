

function randomNote(notesArray) {
    let randomNum;
    for (let i = 0; i < notesArray.length; i++) {
        randomNum = Math.floor(Math.random(i) * notesArray.length)
    }
    return notesArray[randomNum]
}


function createImage(notesArray) {
    let newImage = document.createElement("IMG");
    newImage.setAttribute("src", randomNote(notesArray));
    newImage.setAttribute("id", "note");
    newImage.setAttribute("height", "250");
    newImage.setAttribute("width", "250");
    newImage.setAttribute("alt", "Note");
    document.getElementById("image").appendChild(newImage);
}

function changeImage(notesArray){
    if (document.getElementById("image").childNodes.length <= 1) {
        createImage(notesArray);
    }
    else {
        let note = document.getElementById("note")
        note.parentNode.removeChild(note);
        createImage(notesArray);
    }
}

function countScore(id, totalScore){

    if(id === 'tick-button'){
        totalScore++
        return document.getElementById("score-panel").innerHTML = totalScore
    }
}


function createButton(id, text, notesArray) {
    let newButton = document.createElement("BUTTON");
    newButton.innerHTML = text;
    newButton.setAttribute("id", id);
    newButton.setAttribute("height", "80");
    newButton.setAttribute("width", "100");

    let totalScore = 0
    newButton.onclick = function(){
        

        if(id === 'tick-button'){
            totalScore++
            document.getElementById("score-panel").innerHTML = "Score: " + totalScore
        }   

        changeImage(notesArray);

    }
    
    document.getElementById("buttons").appendChild(newButton);
}

function hideStartButton(id){
    let startButton = document.getElementById(id)
    startButton.parentNode.removeChild(startButton);

}

function clickStartButton() {
    let notesArray = ['C.png', 'E.png', 'G.png'];
    
    document.getElementById("score-panel").innerHTML = "Score: 0" 
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