let speech = new SpeechSynthesisUtterance();
speech.lang = "en";

var word;
var score;
var attemp=0 ;
var Name = window.prompt("Enter your name");
var tempscore=0 ;

fetch('http://localhost:5400/getword')
    .then((response) => response.json())
    .then((data) => {
        word = data["word"]

    });

document.querySelector("#start").addEventListener("click", () => {
    speech.text = word;
    answer = document.getElementsByName("speech.text");
    window.speechSynthesis.speak(speech);
});

document.querySelector("#submit").addEventListener("click", () => {
    var answerInput = document.getElementById("answerText").value;
    console.log("answer : " + answerInput);
    console.log("word : " + word);
    // var wordAvailable = ['rock', 'paper', 'scissors', 'lamp', 'curtain', 'pillow'];

    if (word == answerInput) {
        tempscore++ ;
        window.alert("Correct🎉🎉")
        fetch('http://localhost:5400/getword')
        .then((response) => response.json())
        .then((data) => {
            word = data["word"]
    
        });
    


    }
    else {
        var check = true;
        attemp++ ;
        console.log(attemp) ;

            if(attemp>=3) {
                check=false ;
            }
            else {
                window.alert(`Wrong Ans! Please try again. ${3-attemp} lives remaining`);
            }

        if (!check) {
console.log(tempscore) ;
            fetch('http://localhost:5400/rightAns', {

                // Adding method type
                method: "POST",
    
                // Adding body or contents to send
                body: JSON.stringify({
                    userna: Name,
                    userscore: tempscore
                }),
    
                // Adding headers to the request
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
    
            })
            .then(response => response.json())

            // Displaying results to console
            .then(json => {
                console.log(json);
                window.alert(`Total score is : ${json["score"]}`)
                window.alert(`Total attempts are : ${json["attempts"]}`)
            });
            
            window.openForm();
        }
    }
});

function openForm() {
    console.log("opening form") ;
    document.getElementById("GameOver").style.display = "block";
    document.getElementsByClassName("formPopup")[0].style.display = "block";
}
function closeForm() {
    document.getElementById("GameOver").style.display = "none";
    document.getElementsByClassName("formPopup")[0].style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    let modal = document.getElementById('GameOver');
    if (event.target == modal) {
        closeForm();
    }
}


