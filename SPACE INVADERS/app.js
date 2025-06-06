const grid = document.querySelector('.grid')
const resultsDisplay = document.querySelector('#results')

let currentShooterIndex = 202
let width = 15
let direction = 1
let invadersID 
let goingRight = true
let aliensRemoved = []
let results = 0

for (let i = 0 ; i < 225 ; i++) {
    const square = document.createElement('div')
    grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div'))

const alienInvaders = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
]

function draw () {
    for (let i = 0; i < alienInvaders.length; i++) {
        //dibujar todo pero teniendo en cuenta cada vez que se carga que no esten los eliminados por el laser
        if (!aliensRemoved.includes(i)) {
            squares[alienInvaders[i]].classList.add('invader')    
        } 
    }
}

function remove () {
    for (let i = 0; i < alienInvaders.length; i++) {
        squares[alienInvaders[i]].classList.remove('invader')
        
    }
}

draw()

squares[currentShooterIndex].classList.add('shooter')

function moveShooter (e) {
    squares[currentShooterIndex].classList.remove('shooter')
    switch(e.key) {
        case 'ArrowLeft':
            if (currentShooterIndex % width != 0) {
                currentShooterIndex -= 1 
                
            }
            break
        case 'ArrowRight':
            if (currentShooterIndex % width < width - 1) {
                currentShooterIndex += 1 
                
            }
            break
    }
    squares[currentShooterIndex].classList.add('shooter')
}

document.addEventListener('keydown', moveShooter)

function moveInvaders () {
    const leftEdge = alienInvaders[0] % width === 0
    const righEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1
    remove()

    if (righEdge && goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width +1
            direction = -1
            goingRight = false
            }
        }
    if (leftEdge && !goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width -1 
            direction = 1
            goingRight = true
            }
        }

    for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += direction
    }
    draw()


    // si toca al shooter pierde
    if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
        resultsDisplay.innerHTML = "GAME OVER"
        clearInterval(invadersID)
    }

    // Si el invasor toca el piso, fin del juego
    for (let i = 0; i < alienInvaders.length; i++) {
        if (alienInvaders[i] >= squares.length - width) {
            resultsDisplay.innerHTML = 'GAME OVER'
            clearInterval(invadersID)
            return
        }
    }
    //si no queda ningun bicho gana
    if (aliensRemoved.length === alienInvaders.length) {
        resultsDisplay.innerHTML = 'YOU WIN'
        clearInterval(invadersID)
    }
}

invadersID = setInterval(moveInvaders, 500)

// dispararle a los bichos
function shoot(e) {
    let laserId
    let currentLaserIndex = currentShooterIndex
    //mover el tiro para arriba restandole de a una fila
    function moveLaser() {
        squares[currentLaserIndex].classList.remove('laser')
        currentLaserIndex -= width
        // Si se sale del grid (parte superior)
        if (currentLaserIndex < 0) {
            clearInterval(laserId)
            return
        }
        squares[currentLaserIndex].classList.add('laser')
        
        
        //cuando le pega al bicho borro el bicho, el laser y agrego un boom
        if (squares[currentLaserIndex].classList.contains('invader')) {
            squares[currentLaserIndex].classList.remove('invader')
            squares[currentLaserIndex].classList.remove('laser')
            squares[currentLaserIndex].classList.add('boom')
            //hacer que el boom desaparesca despues de un momento
            setTimeout(()=>squares[currentLaserIndex].classList.remove('boom'), 300)
            clearInterval(laserId)
            //eliminando al bicho cuando le pega el laser
            const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
            aliensRemoved.push(alienRemoved)
            results++
            resultsDisplay.innerHTML = results
        }

    }
    //Dispara cuando apreto espacio 
    switch (e.key) {
        case ' ':
            laserId = setInterval(moveLaser, 100)
    }
}

//activo el eventListener para que escuche cuando apreto la tecla y dispare
document.addEventListener('keydown', shoot)



