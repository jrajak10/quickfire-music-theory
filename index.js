function hideButton(){
    document.getElementById('grade-list').style.display = "none";
    document.getElementById('grade-one-topics').style.display = "flex";
}

function goBack(list, topics){
    document.getElementById(list).style.display = "flex";
    document.getElementById(topics).style.display = "none";
}
