let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  // getting the id of the button clicked
  let userChosenColour = $(this).attr("id");
  // adding userChosenColour to userClickedPattern, this creates an array
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);

});

function checkAnswer(currentLevel) {
  // checking if the user pattern is the same as the game pattern
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    // checking if the user has finished their sequence
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {

    let audioGameOver = new Audio("sounds/wrong.mp3");
    audioGameOver.play();
    $("#level-title").text("Game Over. Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function nextSequence() {
  // once the function is triggered, reset the userClickedPattern
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  // generating a new random number
  let randomNumber = Math.floor(Math.random() * 3) + 1;
  // selecting a random colour
  let randomChosenColour = buttonColours[randomNumber];
  // adding the random colour to gamePattern
  gamePattern.push(randomChosenColour);

  // animating the button (flash)
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

function startOver () {
  gamePattern = [];
  started = false;
  level = 0;
}

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
