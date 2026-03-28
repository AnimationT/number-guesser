var number = Math.floor(Math.random() * 100);
var gameWon = false;
var limitedGuessMode = false;
var timedGuessMode = false;
var timeLimit = 0;
var timeOut = false;

function setRange(min, max) {
  number = Math.floor(Math.random() * (max - min + 1)) + min;
}

function setCustomRange() {
  let min = parseInt($("#min").val());
  let max = parseInt($("#max").val());
  if (isNaN(min) || isNaN(max) || min >= max) {
    alert("Please enter valid minimum and maximum values. Minimum should be less than maximum.");
    return;
  }
  setRange(min, max);
  $("#custOptions").toggle();
}

function proceed() {
  $("#options").hide();
  $("#guessBox").prop("disabled", false);
}


var guesses = 0;
var timer = 0;
var realTime = 0;

function check(num) {
  if(num < number) {
    return "less"
  } else if (num > number) {
    return "more"
  } else if (num === number) {
    return "equal"
  }
}

function setTimedGuessMode() {
  timedGuessMode = true;
  timeLimit = parseFloat($("#timeLimit").val()) * 1000;
  if (isNaN(timeLimit) || timeLimit <= 0) {
    alert("Please enter a valid time limit.");
    return;
  }
}

function guess() {
  if (gameWon) return;
  if (timedGuessMode && timeOut) {
    return;
  }
  let guess = parseInt($("#guessBox").val());
  let result = check(guess);
  guesses++;
  $("#guessBox").val("");

  if (result == "equal") {
    const finishTime = realTime;
    $("#clues").append("<p>CORRECT! the number is "+number+". You got this in "+guesses+" guesses and "+finishTime+" seconds</p> <button onclick="+ "location.reload();" +">play again</button>");
    gameWon = true;
    return;
  }

  if (limitedGuessMode) {
    let maxGuesses = parseInt($("#maxGuesses").val());
    if (guesses >= maxGuesses) {
      $("#clues").append("<p>Game Over! You've reached the maximum number of guesses. The correct number was " + number + ".</p><button onclick='location.reload();'>Play Again</button>");
      return;
    }
  }

  if (result == "less") {
    $("#clues").append("<p>The number is MORE than "+guess+" </p>");
  } else if (result == "more") {
    $("#clues").append("<p>The number is LESS than "+guess+" </p>");
  } 
  
  

  if (guesses === 1) {
    setTimeout(() => {
      if(timedGuessMode){
      timeOut = true;
      if (!gameWon) {
        $("#clues").append("<p>Time's up! The correct number was " + number + ".</p><button onclick='location.reload();'>Play Again</button>");
      }
    }
    }, timeLimit);
    setInterval(function() {
      timer++;
      realTime = timer / 100;
      if (timedGuessMode) {
      $("#timer").text("Time: " + realTime.toFixed(2) + "/ " + (timeLimit / 1000) + " seconds");
      } else {
        $("#timer").text("Time: " + realTime.toFixed(2) + " seconds");
      }
    }, 10);
  }
}

window.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        guess();
        console.log('Enter pressed');
    }
});

function showCustomOptions() {
  $("#custOptions").toggle();
}

function showLimitedGuessOptions() {
  $("#limGuessOptions").toggle();
}

function showTimedGuessOptions() {
  $("#timedGuessOptions").toggle();
}

function setLimitedGuessMode() {
  limitedGuessMode = true;
  let maxGuesses = parseInt($("#maxGuesses").val());
  if (isNaN(maxGuesses) || maxGuesses <= 0) {
    alert("Please enter a valid number of maximum guesses.");
    return;
  }
}



function turnOffLimGuess() {
  limitedGuessMode = false;
}

function turnOffTimedGuess() {
  timedGuessMode = false;
}