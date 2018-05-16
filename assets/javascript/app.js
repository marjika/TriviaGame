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
    }
    else {
        $("#qholder").text(quiz.questionsArray[quiz.questionIndex].question);
        for (var i = 0; i < quiz.questionsArray[quiz.questionIndex].choices.length; i++) {

            $("#radioButton").append('<div class="radio"><input type="radio" name="optradio">' + quiz.questionsArray[quiz.questionIndex].choices[i] + '</input></div>');
            console.log(i);

        }
        questionTime();
    }
    
}

function questionTime() {
    intervalId = setInterval(decrement, 1000);
}

function response() {
    clearInterval(intervalId);
    quiz.questionIndex++;
    seconds = 25;
    $("#radioButton").empty();
    runQuiz();
  }

function decrement() {
    seconds--;
    $("#show-number").html("<h5>Time remaining: " + seconds + "</h5>");
    if (seconds <= 0) {
        quiz.unAnswered++;
        console.log(quiz.unAnswered);
        response();
    }
    // console.log(quiz.questionIndex);
    // console.log(quiz.questionsArray[quiz.questionIndex].question);
  }

  function checkAnswer(userAnswer) {
      if (quiz.questionsArray[quiz.questionIndex].correct === userAnswer) {
          console.log("right");
          quiz.right++;
        //   console.log(quiz.right);
        }
      else {
        console.log("wrong");
        quiz.wrong++;
        // console.log(quiz.wrong);
        }
        response();
}

// // QuestConst.prototype.correctAnswer = function(choice) {
// //     return choice === this.correct;
// // }

function Quiz(questionsArray) {
    this.right = 0;
    this.wrong = 0;
    this.unAnswered = 0;
    this.questionsArray = questionsArray;
    this.questionIndex = 0;
}

// Quiz.prototype.getQuestionIndex = function() {
//     return this.questionArray[this.questionIndex];
// }

Quiz.prototype.isEnded = function() {
    return this.questionsArray.length === this.questionIndex;
}

// Quiz.prototype.guess = function(answer) {
//     this.questionIndex++;
//     if(this.getQuestionIndex().correctAnswer(answer)) {
//         this.score++;
//     }
// }

// function runQuiz() {
    // if(quiz.isEnded()) {
    //     showResult();
    // }
//     // else {
        // $("#qholder").text(quiz.getQuestionIndex().question);
//         quiz.getQuestionIndex().decrement();
//         for (var i = 0; i < quiz.getQuestionIndex().choices.length; i++) {
//             // var text = quiz.getQuestionIndex().choices[i];
//             var radioBtn = $('<label class="radio" id="option"><input type="radio" name="answers" /> </label>');

//             // var labelText = $('#radioBtnId').attr('name');
//             // $('' + labelText + '').insertBefore('#radioBtnId');
//             // radioBtn.text(quiz.getQuestionIndex().choices[i]);
//             // var aChoice = (quiz.getQuestionIndex().choices[i]);
//             // radioBtn.append(aChoice);
//             radioBtn.appendTo('#radio');
        
//         // $("#qholder").text(quiz.getQuestionIndex().question);
//         // $("#option1").text(quiz.getQuestionIndex().choices[0]);
//         // $("#option1").val(quiz.getQuestionIndex().choices[0]);
        
//         // $("#option2").text(quiz.getQuestionIndex().choices[1]);
//         // $("#option2").val(quiz.getQuestionIndex().choices[1]);
        
//         // $("#option3").text(quiz.getQuestionIndex().choices[2]);
//         // $("#option3").val(quiz.getQuestionIndex().choices[2]);

//         // $("#option4").text(quiz.getQuestionIndex().choices[3]);
//         // $("#option4").val(quiz.getQuestionIndex().choices[3]);
        
//         // guessMatch();
//         // quiz.questionIndex++;
//        }   // runQuiz();
    
// }


function showResult() {
    $("#qholder").empty();
    var statsRightDiv = $("<div>");
    var statsWrongDiv = $("<div>");
    var statsUnansweredDiv = $("<div>");
//     var statsRight = $(text(quiz.right));
//     var statsWrong = $(text(quiz.wrong));
//     var statsUnanswered = $(text(quiz.unAnswered));
    statsRightDiv.text(quiz.right + " Correct");
    statsWrongDiv.text(quiz.wrong + " Incorrect");
    statsUnansweredDiv.text(quiz.unAnswered + " Not Answered");
    $("#image-holder").append(statsRightDiv, statsWrongDiv, statsUnansweredDiv);
}



var questionArray = [

     new QuestConst ("Piano music is written in which two clefs?",
 ["treble and baritone clefs", "alto and soprano clefs", "treble and bass clefs", 
"tenor and soprano clefs"], "treble and bass clefs", "grand_staff.jpeg"),

     new QuestConst ("How many octaves are on a typical piano keyboard?",
 ["4", "5", "6", "7"], "7", "keyboard.jpeg")

];

var quiz = new Quiz(questionArray);

$(document).on ("click", "div.radio", function () {
    clearInterval(intervalId);
    clicked = true;
    userAnswer = (this.innerHTML).slice(36);
    // userAnswer = myString.slice((-myString.length), -8);
    // console.log(myString);
    checkAnswer(userAnswer);
});
// // function runQuiz() {
// //     for (var i = 0; i < questionArray.length; i++) {
// //         $("#qholder").text(questionArray[i].question);
// //         $("#option1").text(questionArray[i].choices[0]);
// //         $("#option2").text(questionArray[i].choices[1]);
// //         $("#option3").text(questionArray[i].choices[2]);
// //         $("#option4").text(questionArray[i].choices[3]);
// //     }
// // }


// $("#start").click(runQuiz);
$("#start").on("click", function() {
    runQuiz();
    $(this).hide();

});

// // // Variable showImage will hold the setInterval when we start the slideshow
// // var showImage;

// // // Count will keep track of the index of the currently displaying picture.
// // var count = 0;


// // // This function will replace display whatever image it's given
// // // in the 'src' attribute of the img tag.
// // function displayImage() {
// //   $("#image-holder").html("<img src=" + images[count] + " width='400px'>");
// // }

// // function nextImage() {
// //   //  TODO: Increment the count by 1.
// //   count++;

// //   // TODO: Show the loading gif in the "image-holder" div.
// //   $("#image-holder").html("<img src='images/loading.gif' width='200px'/>");

// //   // TODO: Use a setTimeout to run displayImage after 1 second.
// //   setTimeout(displayImage, 1000);

// //   // TODO: If the count is the same as the length of the image array, reset the count to 0.
// //   if (count === images.length) {
// //     count = 0;
// //   }
// // }

// // function startSlideshow() {

// //   // TODO: Use showImage to hold the setInterval to run nextImage.
// //   showImage = setInterval(nextImage, 3000);

// // }

// // function stopSlideshow() {

// //   // TODO: Put our clearInterval here:
// //   clearInterval(showImage);

// // }

// // // This will run the display image function as soon as the page loads.
// // displayImage();

});