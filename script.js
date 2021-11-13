var main = document.querySelector('#main')
var score = document.querySelector('#score')
var timeLeft = document.querySelector('#timeleft')
var timeCount = 30
var timer = null
var answer

// when click the startBtn, timer starts and block-making starts
function startGame(num) {
  // to avoid more than one timer to be active
  if (timer === null) timer = setInterval(timeRunning, 1000)

  timeLeft.innerHTML = timeCount
  score.innerHTML = 0
  makeBlock(num)
}

function makeBlock(num) {
  // the total quantity of blocks equal to (num of block in width) * (num of block in height) 
  var blocks = num * num
  // let the answer to be a random integer from 0-1
  answer = Math.floor(Math.random() * blocks)
  // to acquire random color
  var r = Math.floor(Math.random() * 128) + 64
  var g = Math.floor(Math.random() * 128) + 64
  var b = Math.floor(Math.random() * 128) + 64
  main.innerHTML = ''

  for (let i = 0; i < blocks; i++) {
    // only the answer-block would have opacity

    if (i === answer) {
      if (answer === 0) answer = 1

      main.innerHTML += `
        <div class="block"
          style="background-color:rgb(${r},${g},${b}); opacity:${difficulty};"
          onclick="check(${i})"
        >
        </div>
        `
    } else {
      main.innerHTML += `
      <div class="block"
        style="background-color:rgb(${r},${g},${b});"
        onclick="check(${i})"
      >
      </div>
      `
    }
    // to justify the width and height of block when quantity of blocks change
    var block = document.querySelectorAll('.block')
    block[i].style.width = `calc(400px / ${num})`
    block[i].style.height = `calc(400px / ${num})`

    // set up different difficulty, make the game harder and harder
    if (parseInt(score.innerHTML) < 5) {
      var difficulty = 0.5
    } else if (parseInt(score.innerHTML) < 10) {
      var difficulty = 0.6
    } else if (parseInt(score.innerHTML) < 15) {
      var difficulty = 0.7
    } else if (parseInt(score.innerHTML) < 20) {
      var difficulty = 0.8
    } else {
      var difficulty = 0.9
    }
  }
}

// when selecting the correct block, score add one
function check(correct) {
  if (correct === answer) score.innerHTML = parseInt(score.innerHTML) + 1

  if (parseInt(score.innerHTML) === 1) {
    makeBlock(2)
  } else if (parseInt(score.innerHTML) === 2) {
    makeBlock(3)
  } else if (parseInt(score.innerHTML) === 3) {
    makeBlock(4)
  } else if (parseInt(score.innerHTML) === 4) {
    makeBlock(5)
  } else if (parseInt(score.innerHTML) > 4) {
    makeBlock(6)
  }
}

// timer running
function timeRunning() {
  timeLeft.innerHTML = parseInt(timeLeft.innerHTML) - 1
  if (parseInt(timeLeft.innerHTML) === 0) {
    clearInterval(timer)
    // when timer ends, clear all the contents of HTML
    main.innerHTML = ''
    alert(`game over, your score is ${score.innerHTML}`)
  }
}
