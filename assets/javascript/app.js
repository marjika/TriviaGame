$(document).ready(function() {

    var seconds = 25;
    var intervalId;
    var clicked = false;
    var userAnswer = "";

function QuestConst (question, choices, correct, reveal) {
    this.question = question;
    this.choices = choices;
    this.correct = correct;
    this.reveal = reveal;
}

function runQuiz() {
    if(quiz.isEnded()) {
        console.log("done!");
        showResult();
        restart();
    }
    else {
        $("#qholder").text(quiz.questionsArray[quiz.questionIndex].question);
        for (var i = 0; i < quiz.questionsArray[quiz.questionIndex].choices.length; i++) {

            $("#radioButton").append('<div class="radio"><input type="radio" name="optradio">' + quiz.questionsArray[quiz.questionIndex].choices[i] + '</input></div>');
            // console.log(i);

        }
        questionTime();
    }
    
}

function questionTime() {
    intervalId = setInterval(decrement, 1000);
}

function response() {
    // clearInterval(intervalId);
    quiz.questionIndex++;
    seconds = 25;
    $("#radioButton").empty();
    $("#qholder").empty();
    runQuiz();
  }

function decrement() {
    seconds--;
    $("#show-number").html("<h5>Time remaining: " + seconds + "</h5>");
    if (seconds <= 0) {
        clearInterval(intervalId);
        quiz.unAnswered++;
        console.log(quiz.unAnswered);
        $("#radioButton").empty();
        $("#qholder").empty();
        $("#qholder").text("Out of time, ");
        displayReveal();
        setTimeout(function() {
            response();
        }, 3000);
    }
    // console.log(quiz.questionIndex);
    // console.log(quiz.questionsArray[quiz.questionIndex].question);
  }

  function checkAnswer(userAnswer) {
      if (quiz.questionsArray[quiz.questionIndex].correct === userAnswer) {
        console.log("right");
        quiz.right++;
        $("#radioButton").empty();
        $("#qholder").empty();
        $("#qholder").text("Yes, ");
        displayReveal();
        // timeFunction();
        //   $("#gif").empty();
        }
      else {
        console.log("wrong");
        quiz.wrong++;
        $("#radioButton").empty();
        $("#qholder").empty();
        $("#qholder").text("Sorry, ");
        displayReveal();
        
        }
        setTimeout(function() {
            response();
        }, 5000);
        // response();
}

function displayReveal() {
    $("#qholder").append("the correct answer is " + quiz.questionsArray[quiz.questionIndex].correct + ".");
    var gifDiv = $("<img>");
    gifDiv.addClass("gifReveal");
    gifDiv.attr("src", quiz.questionsArray[quiz.questionIndex].reveal);
    $("#qholder").append(gifDiv);
}
// function timeFunction() {
//     setTimeout(response(), 3000);
// }


function Quiz(questionsArray) {
    this.right = 0;
    this.wrong = 0;
    this.unAnswered = 0;
    this.questionsArray = questionsArray;
    this.questionIndex = 0;
}


Quiz.prototype.isEnded = function() {
    return this.questionsArray.length === this.questionIndex;
}
       

function showResult() {
    $("#qholder").empty();
    $("#show-number").empty();
    var statsRightDiv = $("<div>");
    var statsWrongDiv = $("<div>");
    var statsUnansweredDiv = $("<div>");
    statsRightDiv.addClass("stats");
    statsRightDiv.text(quiz.right + " Correct");
    statsWrongDiv.addClass("stats");
    statsWrongDiv.text(quiz.wrong + " Incorrect");
    statsUnansweredDiv.text(quiz.unAnswered + " Not Answered");
    statsUnansweredDiv.addClass("stats");
    $("#qholder").append(statsRightDiv, statsWrongDiv, statsUnansweredDiv);
    // $("#start").show();
    // $("#buttons").text("Would you like to play again?");
}

function restart() {
    var newStart = $("<button>");
    newStart.attr('id', "newStart");
    newStart.html("Start");
    // $("#start").show();
    $("#buttons").append("<h3>Would you like to play again? </h3>");
    $("#buttons").append(newStart);
    
}


var questionArray = [

     new QuestConst ("Piano music is written in which two clefs?",
 ["treble and baritone clefs", "alto and soprano clefs", "treble and bass clefs", 
"tenor and soprano clefs"], "treble and bass clefs", "assets/images/aristocats.gif"),

     new QuestConst ("How many octaves are on a typical piano keyboard?",
 ["4", "5", "6", "7"], "7", "assets/images/pianooctave.gif"),

    new QuestConst ("What is the name of the right pedal on the piano?", 
    ["sustaining pedal (or damper pedal)", "soft pedal (or una corda)", 
    "sostenuto pedal", "platform pedal (or shoe pedal)"], "sustaining pedal (or damper pedal)",
    "assets/images/BugsPiano.gif"),

    new QuestConst ("What do you call a short musical composition that is designed to provide practice for perfecting a particular musical skill?", 
    ["nocturne", "appassionato", "etude", "prelude"], "etude", "assets/images/peanuts.gif")

];

var quiz = new Quiz(questionArray);

$(document).on ("click", "div.radio", function () {
    clearInterval(intervalId);
    clicked = true;
    userAnswer = (this.innerHTML).slice(36);
    checkAnswer(userAnswer);
});

$(document).on("click", "#newStart", function() {
    quiz.right = 0;
    quiz.wrong = 0;
    quiz.unAnswered = 0;
    quiz.questionIndex = -1;
    $("#show-number").text("Time remaining: 25");
    $("#buttons").empty();
    response();
    console.log("end of newstart");
});


$("#start").on("click", function() {
    runQuiz();
    $("#start").hide();
  
});


});