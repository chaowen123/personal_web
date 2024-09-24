var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false; // 游戏开始标志
var level = 0;
document.addEventListener("click", function () {
  if (!started) {
    document.getElementById("level-title").textContent = "Level " + level;
    nexSq();
    started = true;  // 游戏正式开始
  }
});

$(".btn").click(function () {
  if (started) {  // 只有在游戏开始后才记录用户点击
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
  }
});

function nexSq() {
  userClickedPattern = [];  // 每次生成新的序列时清空用户点击模式
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  console.log("Game Pattern: ", gamePattern);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function checkAnswer(currentLevel) {
  console.log("Checking answer at level: " + currentLevel);
  console.log("gamePattern: ", gamePattern);
  console.log("userClickedPattern: ", userClickedPattern);

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      console.log("Complete sequence! Proceeding to next step...");
      setTimeout(function() {
        nexSq();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    setTimeout(function() {
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();  // 在这里重置游戏状态
    }, 250);
  }
}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}


