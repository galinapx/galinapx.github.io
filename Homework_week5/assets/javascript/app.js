$(document).ready(function() {
  // Create a function that creates the start button and initial screen

  function initialScreen() {
    startScreen =
      "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
    $(".mainArea").html(startScreen);
  }

  initialScreen();

  //Create a function, generateHTML(), that is triggered by the start button, and generates the HTML seen on the project video...

  $("body").on("click", ".start-button", function(event) {
    event.preventDefault(); // added line to test issue on GitHub Viewer
    clickSound.play();
    generateHTML();

    timerWrapper();
  }); // Closes start-button click

  $("body").on("click", ".answer", function(event) {
    //answeredQuestion = true;
    clickSound.play();
    selectedAnswer = $(this).text();
    if (selectedAnswer === correctAnswers[questionCounter]) {
      //alert("correct");

      clearInterval(theClock);
      generateWin();
    } else {
      //alert("wrong answer!");
      clearInterval(theClock);
      generateLoss();
    }
  }); // Close .answer click

  $("body").on("click", ".reset-button", function(event) {
    clickSound.play();
    resetGame();
  }); // Closes reset-button click
}); //  Closes jQuery wrapper

function generateLossDueToTimeOut() {
  unansweredTally++;
  gameHTML =
    "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" +
    counter +
    "</span></p>" +
    "<p class='text-center'>You ran out of time!  The correct answer was: " +
    correctAnswers[questionCounter] +
    "</p>" +
    "<img class='center-block img-wrong' src='assets/images/x.png'>";
  $(".mainArea").html(gameHTML);
  setTimeout(wait, 4000); //  change to 4000 or other amount
}

function generateWin() {
  correctTally++;
  gameHTML =
    "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" +
    counter +
    "</span></p>" +
    "<p class='text-center'>Correct! The answer is: " +
    correctAnswers[questionCounter] +
    "</p>" +
    imageArray[questionCounter];
  $(".mainArea").html(gameHTML);
  setTimeout(wait, 3000); //  change to 4000 or other amount
}

function generateLoss() {
  incorrectTally++;
  gameHTML =
    "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" +
    counter +
    "</span></p>" +
    "<p class='text-center'>Wrong! The correct answer is: " +
    correctAnswers[questionCounter] +
    "</p>" +
    "<img class='center-block img-wrong' src='assets/images/x.png'>";
  $(".mainArea").html(gameHTML);
  setTimeout(wait, 4000); //  change to 4000 or other amount
}

function generateHTML() {
  gameHTML =
    "<p class='text-center timer-p'>Time Remaining: <span class='timer'>20</span></p><p class='text-center'>" +
    questionArray[questionCounter] +
    "</p><p class='first-answer answer'>A. " +
    answerArray[questionCounter][0] +
    "</p><p class='answer'>B. " +
    answerArray[questionCounter][1] +
    "</p><p class='answer'>C. " +
    answerArray[questionCounter][2] +
    "</p><p class='answer'>D. " +
    answerArray[questionCounter][3] +
    "</p>";
  $(".mainArea").html(gameHTML);
}

function wait() {
  if (questionCounter < 4) {
    questionCounter++;
    generateHTML();
    counter = 20;
    timerWrapper();
  } else {
    finalScreen();
  }
}

function timerWrapper() {
  theClock = setInterval(clockit, 1000);
  function clockit() {
    if (counter === 0) {
      clearInterval(theClock);
      generateLossDueToTimeOut();
    }
    if (counter > 0) {
      counter--;
    }
    $(".timer").html(counter);
  }
}

function finalScreen() {
  gameHTML =
    "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" +
    counter +
    "</span></p>" +
    "<p class='text-center'>All done, here's how you did!" +
    "</p>" +
    "<p class='summary-correct'>Correct Answers: " +
    correctTally +
    "</p>" +
    "<p>Wrong Answers: " +
    incorrectTally +
    "</p>" +
    "<p>Unanswered: " +
    unansweredTally +
    "</p>" +
    "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
  $(".mainArea").html(gameHTML);
}

function resetGame() {
  questionCounter = 0;
  correctTally = 0;
  incorrectTally = 0;
  unansweredTally = 0;
  counter = 20;
  generateHTML();
  timerWrapper();
}

var startScreen;
var gameHTML;
var counter = 20;
var questionArray = [
  "What was Jonah doing after he boarded a ship traveling to Tarshish when God sent the great wind into the sea ?",
  "What is not a sin?",
  "How should you love a neighbor?",
  "Paul says that God's people, both Jews and Gentiles, should refrain from judging one another concerning the laws of God. Why?",
  "In the book of Romans, to what two groups of people did the apostle Paul say he was a debtor?"
];
var answerArray = [
  ["Sleeping", "Praying", "Eating", "Talking"],
  ["Using God's name in vain", "Committing adultery", "Helping others", "Stealing"],
  ["as family", "as yourself", "as a wife", "as a friend"],
  ["Jews don't know God's law", "Gentiles don't know God's law", "What is right for one may be wrong for another", "Only priests can determine right from wrong"],
  ["Jews and Gentiles", "Greeks and Barbarians", "Men and women", "Americans and Europeans"]
];
var imageArray = [
  "<img class='center-block img-right' src='assets/images/A1.jpg'>",
  "<img class='center-block img-right' src='assets/images/A2.jpg'>",
  "<img class='center-block img-right' src='assets/images/A3.jpg'>",
  "<img class='center-block img-right' src='assets/images/A4.jpg'>",
  "<img class='center-block img-right' src='assets/images/A5.jpg'>"
];
var correctAnswers = [
  "A. Sleeping",
  "C. Helping others",
  "B. as yourself",
  "C. What is right for one may be wrong for another",
  "B. Greeks and Barbarians"
];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var clickSound = new Audio("assets/sounds/button-click.mp3");
