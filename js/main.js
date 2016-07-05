//Variables for various stopwatch elements
var startButton = document.getElementById('btn-start'),
  stopButton = document.getElementById('btn-stop'),
  minutes = document.getElementById('minutes'),
  seconds = document.getElementById('seconds'),
  tenthSeconds = document.getElementById('tenth-seconds'),
  message = document.getElementById('message'),
  timer = document.getElementById('timer'),
  tenthCounter = 1,
  secondsCounter = 1,
  minutesCounter = 1,
  tenthInterval,
  secondInterval,
  minuteInterval,
  stopTimeout,
  bkgColor


//Listen for the Start button to be clicked and perform an action
startButton.addEventListener('click', function() {
  //Clear the timer intervals so they don't overlap with multiple button clicks
  clearTimers()

  //Set the Start button text to Restart once the timer starts.
  startButton.innerHTML = 'Restart'
  stopButton.innerHTML = 'Stop'
  message.innerHTML = 'GO!'

  //Reset all initial values to their original values every button click
  tenthSeconds.innerHTML = '00'
  seconds.innerHTML = '00'
  minutes.innerHTML = '00'
  tenthCounter = 1
  secondsCounter = 1
  minutesCounter = 1

  //Run the function to start the timers
  timers()
})


//Listen for the Stop button to be clicked and perform an action
stopButton.addEventListener('click', function(){

  //Set the Stop button text to Continue once you press the Stop button and pause the timers.
  //When Continue is pressed unpause the timers, and change the text back to Stop
  if (stopButton.innerHTML === 'Stop') {
    clearTimers()
    stopButton.innerHTML = 'Continue'
    message.innerHTML = 'Paused.'

    //Blink the timer when Paused


    //If the timer is stopped for 15 seconds, reset everything.
    stopTimeout = setTimeout(function(){
      tenthSeconds.innerHTML = '00'
      seconds.innerHTML = '00'
      minutes.innerHTML = '00'
      tenthCounter = 1
      secondsCounter = 1
      minutesCounter = 1
      stopButton.innerHTML = 'Stop'
      startButton.innerHTML = 'Start'
      message.innerHTML = 'Timer reset due to inactivity.'
    }, 15000)

  } else if (stopButton.innerHTML === 'Continue') {
    stopButton.innerHTML = 'Stop'
    message.innerHTML = 'GO!'
    clearTimeout(stopTimeout)
    timers()
  }
})

//Function to clear all timer intervals
function clearTimers () {
  clearInterval(tenthInterval)
  clearInterval(secondInterval)
  clearInterval(minuteInterval)
  clearTimeout(stopTimeout)
}

function timers () {
  //Every tenth of a second, increment the tenthSecond variable
  tenthInterval = setInterval(function() {
    if (tenthCounter < 100 && tenthCounter < 10) {
      tenthSeconds.innerHTML = '0' + tenthCounter
      tenthCounter++
    } else if (tenthCounter < 100) {
      tenthSeconds.innerHTML = tenthCounter
      tenthCounter++
    } else {
      tenthCounter = 1
      tenthSeconds.innerHTML = '00'
    }
  }, 10)

  //Every second, increment the second variable
  secondInterval = setInterval(function() {
    if (secondsCounter < 60 && secondsCounter < 10) {
      seconds.innerHTML = '0' + secondsCounter
      secondsCounter++
    } else if (secondsCounter < 60) {
      seconds.innerHTML = secondsCounter
      secondsCounter++
    } else {
      secondsCounter = 1
      seconds.innerHTML = '00'
    }

    //Change the background color based on the timer every second.
    bkgColor = 'rgb(' + Math.floor((secondsCounter / 60) * 100) + '%,' + Math.floor((secondsCounter / 60) * 100) + '%,' + (100 - Math.floor((secondsCounter / 60) * 100)) + '%)'
    document.body.style.backgroundColor = bkgColor
  }, 1000)

  //Every minute, increment the minute variable
  minuteInterval = setInterval(function() {
    if (minutesCounter < 60 && minutesCounter < 10) {
      minutes.innerHTML = '0' + minutesCounter
      minutesCounter++
    } else if (minutesCounter < 60) {
      minutes.innerHTML = minutesCounter
      minutesCounter++
    } else {
      minutesCounter = 1
      minutes.innerHTML = '00'
    }
  }, 60000)
}

// Adventurer Mode
// When the timer is paused, the time should blink to let the user know it's paused.

// Epic Mode
// Add analog rotating hands or rings on the timer, one for the 1/10th of a second, one for the second, and one for the minute.
// Think of and try other interesting things you can do visually to indicate the timer changes.
