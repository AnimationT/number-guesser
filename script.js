var number = Math.floor(Math.random() * 100);

function setRange(min, max) {
  number = Math.floor(Math.random() * (max - min + 1)) + min;
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

function guess() {
  let guess = parseInt($("#guessBox").val());
  let result = check(guess);
  guesses++;
  $("#guessBox").val("");

  if (result == "less") {
    $("#clues").append("<p>The number is MORE than "+guess+" </p>");
  } else if (result == "more") {
    $("#clues").append("<p>The number is LESS than "+guess+" </p>");
  } else if (result == "equal") {
    const finishTime = realTime;
    $("#clues").append("<p>CORRECT! the number is "+number+". You got this in "+guesses+" guesses and "+finishTime+" seconds</p> <button onclick="+ "location.reload();" +">play again</button>");
  }

  if (guesses === 1) {
    setInterval(function() {
      timer++;
      realTime = timer / 100;
      $("#timer").text("Time: " + realTime.toFixed(2) + " seconds");
    }, 10);
  }
}

window.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        guess();
        console.log('Enter pressed');
    }
});

//update test
