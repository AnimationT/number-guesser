var number = Math.floor(Math.random() * 100);
var gameWon = false;
var limitedGuessMode = false;
var timedGuessMode = false;
var maxGuesses = 0;
var timeLimit = 0;
var timeOut = false;
var type = "1-100";

function setRange(min, max) {
  number = Math.floor(Math.random() * (max - min + 1)) + min;
  type = min + "-" + max;
  if (min === 1 && max === 10) {
    $("#oneToTen").css("background-color", "lightblue");
    $("#oneToHundred, #oneToThousand, #custom").css("background-color", "");
  } else if (min === 1 && max === 100) {
    $("#oneToHundred").css("background-color", "lightblue");
    $("#oneToTen, #oneToThousand, #custom").css("background-color", "");
  } else if (min === 1 && max === 1000) {
    $("#oneToThousand").css("background-color", "lightblue");
    $("#oneToTen, #oneToHundred, #custom").css("background-color", "");
  } else {
    $("#oneToTen, #oneToHundred, #oneToThousand").css("background-color", "");
    $("#custom").css("background-color", "lightblue");
  }
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
  alert("Custom Range set: Guess a number between " + min + " and " + max + ".");
}

function setLimitedGuessMode() {
  limitedGuessMode = true;
  maxGuesses = parseInt($("#maxGuesses").val());
  if (isNaN(maxGuesses) || maxGuesses <= 0) {
    alert("Please enter a valid number of maximum guesses.");
    return;
  }
  $("#limGuessOptions").toggle();
  $("#limGuessButton").css("background-color", "lightblue");
  alert("Limited Guess Mode enabled: You have " + maxGuesses + " guesses to find the number.");
}

function proceed() {
  let displayGuesses;
  let displayTime;
  if (limitedGuessMode) {
    displayGuesses = maxGuesses + " guesses";
  } else {
    displayGuesses = "unlimited guesses";
  }
  if (timedGuessMode) {
    displayTime = timeLimit / 1000 + " seconds";
  } else {
    displayTime = "unlimited time";
  }

  $("#options").hide();
  $("#guessBox").prop("disabled", false);
  $("#clues").append("<p>"+type+" • <span id='guessesLeft'>"+displayGuesses+" left</span> • " + displayTime + "</p>");
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
  $("#timedGuessOptions").toggle();
  $("#timedGuessButton").css("background-color", "lightblue");
  alert("Timed Guess Mode enabled: You have " + (timeLimit / 1000) + " seconds to find the number.");
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
    $("#guessesLeft").text(maxGuesses - guesses + " guesses left");
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
      if (!gameWon && guesses < maxGuesses) {
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

$("#guessBox").on('keydown', function(e) {
    if (e.key === 'Enter') {
        guess();
        console.log('Enter pressed');
    }
});

$("#min, #max").on('keydown', function(e) {
    if (e.key === 'Enter') {
        setCustomRange();
    }
});

$("#maxGuesses").on('keydown', function(e) {
    if (e.key === 'Enter') {
        setLimitedGuessMode();
    }
});

$("#timeLimit").on('keydown', function(e) {
    if (e.key === 'Enter') {
        setTimedGuessMode();
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





function turnOffLimGuess() {
  limitedGuessMode = false;
  $("#limGuessButton").css("background-color", "");
}

function turnOffTimedGuess() {
  timedGuessMode = false;
  $("#timedGuessButton").css("background-color", "");
}