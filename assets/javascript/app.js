$(document).ready(function() {

    var seconds = 25;
    var intervalId;
    var clicked = false;
    var userAnswer = "";

    //Question Object
function QuestConst (question, choices, correct, reveal) {
    this.question = question;
    this.choices = choices;
    this.correct = correct;
    this.reveal = reveal;
}

//Populates the question and radios, identifies end of quiz, starts timer
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
         
        }
        questionTime();
    } 
}

//These functions handle the timing of the questions and the events when user doesn't answer
function questionTime() {
    intervalId = setInterval(decrement, 1000);
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
  }

  //Handles resets for new question, updating index of Questions array and starting next question
  function response() {
    quiz.questionIndex++;
    seconds = 25;
    $("#radioButton").empty();
    $("#qholder").empty();
    runQuiz();
  }

  //Compares user answer to correct answer, clears divs, updates stats, and runs the reveal
  function checkAnswer(userAnswer) {
      if (quiz.questionsArray[quiz.questionIndex].correct === userAnswer) {
        console.log("right");
        quiz.right++;
        $("#radioButton").empty();
        $("#qholder").empty();
        $("#qholder").text("Yes, ");
        displayReveal();
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
}

//Informs the user if he/she is right or wrong and displays a gif
function displayReveal() {
    $("#qholder").append("the correct answer is " + quiz.questionsArray[quiz.questionIndex].correct + ".");
    var gifDiv = $("<img>");
    gifDiv.addClass("gifReveal");
    gifDiv.attr("src", quiz.questionsArray[quiz.questionIndex].reveal);
    $("#qholder").append(gifDiv);
}

//Quiz object
function Quiz(questionsArray) {
    this.right = 0;
    this.wrong = 0;
    this.unAnswered = 0;
    this.questionsArray = questionsArray;
    this.questionIndex = 0;
}

//Quiz prototype returns true if quiz is ended (quiz array = variable index)
Quiz.prototype.isEnded = function() {
    return this.questionsArray.length === this.questionIndex;
}
       
//Displays end-of-game stats
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
}

//Allows player to restart game with resart button
function restart() {
    var newStart = $("<button>");
    newStart.attr('id', "newStart");
    newStart.html("Restart");
    $("#buttons").append("<h3>Would you like to play again? </h3>");
    $("#buttons").append(newStart);
    
}

//Questions, answers,and gifs that will be displayed during the game
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
    ["nocturne", "appassionato", "etude", "prelude"], "etude", "assets/images/peanuts.gif"),

    new QuestConst ("The famous and catchy sonata 'Rondo Alla Turca' was written by whom?",
    ["Claude Debussy", "Maurice Ravel", "Wolfgang Amadeus Mozart", "Joseph Haydn"], "Wolfgang Amadeus Mozart", 
    "assets/images/steinway.gif"),

    new QuestConst ("Piano strings are most often made of what material?", ["wool", "metal", "plastic", "nylon"],
    "metal", "assets/images/MickeyPiano.gif"),

    new QuestConst ("What is the sequence of an A major scale?", ["A, B-flat, C, D, E-flat, F, G, A",
    "A, B, C-sharp, D, E, F-sharp, G-sharp, A", "A, B, C, D, E, F, G, A", "A, B-flat, C, D, E, F, G, A"],
    "A, B, C-sharp, D, E, F-sharp, G-sharp, A", "assets/images/solfeg.gif"),

    new QuestConst ("Which of these instruments is most closely related to the piano?", ["violin", "clarinet", 
    "oboe", "clavichord"], "clavichord", "assets/images/spider.gif"),

    new QuestConst ("Which musical period is the first to use the full tonal range of the piano?", ["Baroque", 
    "Classical", "Romantic", "20th Century"], "Romantic", "assets/images/slowPiano.gif"),

    new QuestConst ("In Billy Joel's song, 'Piano Man', what time is it when 'the regular crowd shuffles in'?",
    ["9 o'clock", "7:30", "8 o'clock", "6 o'clock"], "9 o'clock", "assets/images/muppets.gif")

];

//This quiz using quiz constructor
var quiz = new Quiz(questionArray);

//Radio button clicks enable user to enter answer
$(document).on ("click", "div.radio", function () {
    clearInterval(intervalId);
    clicked = true;
    userAnswer = (this.innerHTML).slice(36);
    checkAnswer(userAnswer);
});

//Allows restart game if desired
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

//Start button for game
$("#start").on("click", function() {
    runQuiz();
    $("#start").hide();
  
});


});