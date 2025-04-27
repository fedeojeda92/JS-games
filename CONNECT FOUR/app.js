document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const result = document.querySelector('#result')
    const displayCurrentPlayer = document.querySelector('#current-player')

    let squares = []

    let currentPlayer = 1

    const width = 14; // número de columnas
    const height = 7; // número de filas (sin contar la fila de suelo)

    const winningArrays = []

    // Horizontal
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width - 3; col++) {
            let start = row * width + col
            winningArrays.push([start, start + 1, start + 2, start + 3])
        }
    }

    // Vertical
    for (let col = 0; col < width; col++) {
        for (let row = 0; row < height - 3; row++) {
            let start = row * width + col
            winningArrays.push([start, start + width, start + width * 2, start + width * 3])
        }
    }

    // Diagonal derecha abajo
    for (let row = 0; row < height - 3; row++) {
        for (let col = 0; col < width - 3; col++) {
            let start = row * width + col
            winningArrays.push([start, start + width + 1, start + (width + 1) * 2, start + (width + 1) * 3])
        }
    }

    // Diagonal izquierda abajo
    for (let row = 0; row < height - 3; row++) {
        for (let col = 3; col < width; col++) {
            let start = row * width + col
            winningArrays.push([start, start + width - 1, start + (width - 1) * 2, start + (width - 1) * 3])
        }
    }``


    function createBoard () {
        for (let i = 0 ; i < 98 ; i++) {
            const square = document.createElement('div')
            grid.appendChild(square) // Agrega al grid
        }
        for (let i = 0 ; i < 14 ; i++) {
            const square = document.createElement('div')
            square.classList.add('taken')
            grid.appendChild(square) // Agrega al grid
        }
        squares = Array.from(document.querySelectorAll('.grid div'))
    }

    createBoard()

    function checkBoard() {
        for (let i = 0 ; i < winningArrays.length ; i++) {
            const square1 = squares[winningArrays[i][0]]
            const square2 = squares[winningArrays[i][1]]
            const square3 = squares[winningArrays[i][2]]
            const square4 = squares[winningArrays[i][3]]
            //check squares to see if they all have the class of player 
           if (
                square1.classList.contains('player-one') &&
                square2.classList.contains('player-one') &&
                square3.classList.contains('player-one') &&
                square4.classList.contains('player-one')
                ) { 
                    result.textContent = 'Player ONE wins!'
            }
            if (
                square1.classList.contains('player-two') &&
                square2.classList.contains('player-two') &&
                square3.classList.contains('player-two') &&
                square4.classList.contains('player-two')
                ) {
                    result.textContent = 'Player TWO wins!'
            } 
        }
    }

    for (let i = 0 ; i < squares.length ; i++){
        squares[i].addEventListener('click', () => {
            //Si el cuadrado debajo de tu cuadrado actual esta tomado podes ir arriba de el
            if (squares[i + 14].classList.contains('taken')) {
                if (currentPlayer == 1) {
                    squares[i].classList.add('taken')
                    squares[i].classList.add('player-one')
                    currentPlayer = 2
                    displayCurrentPlayer.innerHTML = currentPlayer
                } else if (currentPlayer == 2) {
                    squares[i].classList.add('taken')
                    squares[i].classList.add('player-two')
                    currentPlayer = 1
                    displayCurrentPlayer.innerHTML = currentPlayer
                }
            }
            checkBoard()
        })
    }
})