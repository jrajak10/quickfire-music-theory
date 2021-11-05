function showTopics(list, topics){
    document.getElementById(list).style.display = "none";
    document.getElementById(topics).style.display = "flex";
}

function showTeacherStudentQuestion(button, topics, question){
    document.getElementById(topics).style.display = "none";
    document.getElementById(question).style.display = "flex";
    let topicID = button.id;
    document.getElementById('store-topic-list').innerHTML = topics
    document.getElementById('store-topic').innerHTML = topicID
    return button.id
}

function goBack(list, topics){
    document.getElementById(list).style.display = "flex";
    document.getElementById(topics).style.display = "none";
}

function backToTopics(){
    document.getElementById("teacher-student-question").style.display = "none";
    let topic = document.getElementById('store-topic-list').innerHTML
    document.getElementById(topic).style.display = "flex";
}

async function fetchData(data) {
    let fetchedData = await fetch(data);
    let json = await fetchedData.json();
    let features = json.features;
    return features
}


async function directLink(button){
        
    let linksData = await fetchData("topic_links.json")
    let topic = document.getElementById('store-topic').innerHTML
    let option = button.id
    let link = linksData[topic][option]
    window.location = link
 }

