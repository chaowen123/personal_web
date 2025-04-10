// ===== [Tools & Tech Used] =====
// - jQuery: DOM manipulation & event binding (e.g., $(".btn").click())
// - ES6: let/const, arrow functions, template literals
// - Vanilla JavaScript: addEventListener, Audio(), document.getElementById()
// ==============================

const buttonColours = ["red", "blue", "green", "yellow"];  // Available button colors
let gamePattern = [];       // Stores the randomly generated game sequence
let userClickedPattern = []; // Stores the user’s click sequence
let started = false;        // Flag to track whether the game has started
let level = 0;              // Game level tracker

// Starts the game when any part of the document is clicked (initial trigger)
document.addEventListener("click", function () {
  if (!started) {
    document.getElementById("level-title").textContent = "Level " + level;
    nextSequence(); // Generate the first sequence
    started = true;
  }
});

// Event handler for user clicking a button using jQuery
$(".btn").click(function () {
  if (started) {
    const userChosenColour = $(this).attr("id"); // Get the ID of the clicked button
    userClickedPattern.push(userChosenColour);   // Store user's click
    playSound(userChosenColour);                 // Play the corresponding sound
    animatePress(userChosenColour);              // Animate the button click

    // Check if the user's sequence so far is correct
    checkAnswer(userClickedPattern.length - 1);
  }
});

// Generates the next step in the sequence and updates the UI
function nextSequence() {
  userClickedPattern = []; // Reset user input for this level
  level++;
  $("#level-title").text("Level " + level); // Update the level display

  const randomNumber = Math.floor(Math.random() * 4); // Random index between 0-3
  const randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour); // Add new color to the sequence

  // Animate the button and play sound
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// Checks if the most recent user input matches the game's sequence
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // If the user has completed the full sequence correctly
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    // Game Over: incorrect input
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);

    setTimeout(() => {
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver(); // Reset game state
    }, 250);
  }
}

// Plays the corresponding sound based on color or "wrong"
function playSound(name) {
  const audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Visual feedback when a button is pressed
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Resets the game to initial state after game over
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}


