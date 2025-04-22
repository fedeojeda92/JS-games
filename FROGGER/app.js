const timeLeftDisplay = document.querySelector('#time-left')
const resultDisplay = document.querySelector('#result')
const startPauseButton = document.querySelector('#start-pause-button')
const squares = document.querySelectorAll('.grid div')
const logsLeft = document.querySelectorAll('.log-left')
const logsRight = document.querySelectorAll('.log-right')
const carsLeft = document.querySelectorAll('.car-left')
const carsRight = document.querySelectorAll('.car-right')




const width = 9

let currentIdex = 76
let timerId
let currentTime = 20
let outcomeTimerId 

function moveFrog(e) {

    squares[currentIdex].classList.remove('frog')
    
    switch (e.key) {
        case 'ArrowUp':
            if (currentIdex - width >= 0) currentIdex -= width
            break;
        case 'ArrowLeft':
            if (currentIdex % width !== 0) currentIdex -= 1
            break;
        case 'ArrowRight':
            if (currentIdex % width < width -1) currentIdex += 1
            break;
        case 'ArrowDown':
            if (currentIdex + width < width * width) currentIdex += width
            break;
    }

    squares[currentIdex].classList.add('frog')
    
}

function autoMoveElements() {
    currentTime--
    timeLeftDisplay.textContent = currentTime
    logsLeft.forEach(logLeft => moveLogLeft(logLeft))
    logsRight.forEach(logRight => moveLogRight(logRight))
    carsLeft.forEach(carLeft => moveCarLeft(carLeft))
    carsRight.forEach(carRight => moveCarRight(carRight))

}


function moveLogLeft(logleft) {
    switch (true) {
        case logleft.classList.contains('l1'):
            logleft.classList.remove('l1')
            logleft.classList.add('l2')
            break;
        case logleft.classList.contains('l2'):
            logleft.classList.remove('l2')
            logleft.classList.add('l3')
            break;
        case logleft.classList.contains('l3'):
            logleft.classList.remove('l3')
            logleft.classList.add('l4')
            break;
        case logleft.classList.contains('l4'):
            logleft.classList.remove('l4')
            logleft.classList.add('l5')
            break;
        case logleft.classList.contains('l5'):
            logleft.classList.remove('l5')
            logleft.classList.add('l1')
            break;


    }
}

function moveLogRight(logsRight) {
    switch (true) {
        case logsRight.classList.contains('l1'):
            logsRight.classList.remove('l1')
            logsRight.classList.add('l5')
            break;
        case logsRight.classList.contains('l2'):
            logsRight.classList.remove('l2')
            logsRight.classList.add('l1')
            break;
        case logsRight.classList.contains('l3'):
            logsRight.classList.remove('l3')
            logsRight.classList.add('l2')
            break;
        case logsRight.classList.contains('l4'):
            logsRight.classList.remove('l4')
            logsRight.classList.add('l3')
            break;
        case logsRight.classList.contains('l5'):
            logsRight.classList.remove('l5')
            logsRight.classList.add('l4')
            break;  
    }
}

function moveCarLeft(carsLeft) {
    switch (true) {
        case carsLeft.classList.contains('c1'):
            carsLeft.classList.remove('c1')
            carsLeft.classList.add('c2')
            break;
        case carsLeft.classList.contains('c2'):
            carsLeft.classList.remove('c2')
            carsLeft.classList.add('c3')
            break;
        case carsLeft.classList.contains('c3'):
            carsLeft.classList.remove('c3')
            carsLeft.classList.add('c1')
            break;
    }
}

function moveCarRight(carsRight) {
    switch (true) {
        case carsRight.classList.contains('c1'):
            carsRight.classList.remove('c1')
            carsRight.classList.add('c3')
            break;
        case carsRight.classList.contains('c2'):
            carsRight.classList.remove('c2')
            carsRight.classList.add('c1')
            break;
        case carsRight.classList.contains('c3'):
            carsRight.classList.remove('c3')
            carsRight.classList.add('c2')
            break;
    }
}

function lose(){
    if (
        squares[currentIdex].classList.contains('c1') || 
        squares[currentIdex].classList.contains('l4') ||
        squares[currentIdex].classList.contains('l5') ||
        currentTime <=0
    ) {
        resultDisplay.textContent = 'You lose!'
        clearInterval(timerId)
        clearInterval(outcomeTimerId)

        squares[currentIdex].classList.remove('frog')
        document.removeEventListener('keyup', moveFrog)
    }

}

function win() {
    if (squares[currentIdex].classList.contains('ending-block')) {
        resultDisplay.textContent = 'You win!'
        clearInterval(timerId)
        clearInterval(outcomeTimerId)

        document.removeEventListener('keyup', moveFrog)
    }
}



startPauseButton.addEventListener('click', () => {
    if (timerId) {
        clearInterval(timerId)
        clearInterval(outcomeTimerId)
        outcomeTimerId = null
        timerId = null
        document.removeEventListener('keyup', moveFrog)

    }else{
        timerId = setInterval(autoMoveElements, 1000)
        outcomeTimerId = setInterval(checkOutcomes, 50)
        document.addEventListener('keyup', moveFrog)
    }
})

function checkOutcomes() {
    lose()
    win()
}
