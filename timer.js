let lowerLimit = 0
let upperLimit = 0
let visibleTimer = false
let ms = 0
let hours = 0
let minutes = 0
let seconds = 0
const audio = new Audio('alarmSound.mp3')
let globalBool = true
let pause = false

let oriHours = 0
let oriMinutes = 0
let oriSeconds = 0

function startTimer () {
    turnOffAlarm()
    pause = false
    document.getElementById('turnOff').innerHTML = ''
    document.getElementById('pauseText').innerHTML = ''

    lowerLimit = parseInt(document.getElementById('lowerLimit').value)
    upperLimit = parseInt(document.getElementById('upperLimit').value)
    visibleTimer = document.getElementById('visibleTimer').checked

    if (isNaN(lowerLimit) || isNaN(upperLimit) || upperLimit < lowerLimit) {
        console.log(':(')
        globalBool = false
        return
    }
    else {
        ms = randomInteger(lowerLimit, upperLimit) * 60 * 1000
        hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
        seconds = Math.floor((ms % (1000 * 60)) / 1000)

        oriHours = hours
        oriMinutes = minutes
        oriSeconds = seconds

        displayTimer()
    }

    document.getElementById('pauseTimer').innerHTML = '<center><button class="bttn" onclick="pauseTimer()">Pause</button></center>'

    const interval = setInterval(function () {
        if (!pause) ms -= 1000
        hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
        seconds = Math.floor((ms % (1000 * 60)) / 1000)

        displayTimer()

        document.getElementById('resultText').innerHTML = '<p class="centerText">Timer has started</p>'

        if (ms <= 0) {
            clearInterval(interval)
            audio.loop = true
            audio.play()
            document.getElementById('resultText').innerHTML = '<p class="centerText">TIME OVER, time was: ' + oriHours.toString().padStart(2, '0') + ':' + oriMinutes.toString().padStart(2, '0') + ':' + oriSeconds.toString().padStart(2, '0') + '</p>'
            document.getElementById('pauseText').innerHTML = ''
            document.getElementById('turnOff').innerHTML = '<center><button class="bttn" onclick="turnOffAlarm()">Turn off</button></center>'
        }
    }, 1000)
}

function pauseTimer () {
    pause = !pause

    if (pause) {
        document.getElementById('pauseText').innerHTML = '<p class="centerText">Timer paused</p>'
    }
    else {
        document.getElementById('pauseText').innerHTML = '<p class="centerText">Timer unpaused</p>'
    }
}

function turnOffAlarm () {
    audio.pause()
    audio.currentTime = 0
}

function displayTimer () {
    if (visibleTimer) {
        document.getElementById('time').innerHTML =  hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0')
    }
    else {
        document.getElementById('time').innerHTML = ''
    }
}

function updateVisibleTimer () {
    visibleTimer = document.getElementById('visibleTimer').checked
    displayTimer()
}

function randomInteger (min, max) {
    return Math.floor(Math.random() * (parseInt(max) - parseInt(min) + parseInt(1))) + parseInt(min)
}