const cardArray = [
    {
        name: 'fries', 
        img: 'images/fries.png'
    },
    {
        name: 'cheeseburger', 
        img: 'images/cheeseburger.png'
    },
    {
        name: 'hotdog', 
        img: 'images/hotdog.png'
    },
    {
        name: 'ice-cream', 
        img: 'images/ice-cream.png'
    },
    {
        name: 'milkshake', 
        img: 'images/milkshake.png'
    },
    {
        name: 'pizza', 
        img: 'images/pizza.png'
    },
    {
        name: 'fries', 
        img: 'images/fries.png'
    },
    {
        name: 'cheeseburger', 
        img: 'images/cheeseburger.png'
    },
    {
        name: 'hotdog', 
        img: 'images/hotdog.png'
    },
    {
        name: 'ice-cream', 
        img: 'images/ice-cream.png'
    },
    {
        name: 'milkshake', 
        img: 'images/milkshake.png'
    },
    {
        name: 'pizza', 
        img: 'images/pizza.png'
    }
]

cardArray.sort(() => 0.5 - Math.random())

const gridDisplay = document.querySelector('#grid')

let resultDisplay = document.querySelector('#result')

let intentosDisplay = document.querySelector('#intentos')

let cardsChosen = []

let cardsChosenIds = []

let cardsWon = []

let intentos = 0

function createBoard () {
    for (let i = 0; i < cardArray.length ; i++) {
        const card = document.createElement('img')
        card.setAttribute('src', 'images/blank.png')
        card.setAttribute('data-id', i)
        card.addEventListener('click', flipCard)
        gridDisplay.appendChild(card)
    }
}



function checkMatch() {
    const cards = document.querySelectorAll('img')
    const optionOneId = cardsChosenIds[0]
    const optionTwoId = cardsChosenIds[1]

    if (optionOneId === optionTwoId) {
        cards[optionOneId].setAttribute('src', 'images/blank.png')
        cards[optionTwoId].setAttribute('src', 'images/blank.png')
        alert('You have clicked the same image!!')
        intentos += 1
    }

    if (cardsChosen[0] === cardsChosen[1]) {
        alert('You found a match!')
        cards[optionOneId].setAttribute('src', 'images/white.png')
        cards[optionTwoId].setAttribute('src', 'images/white.png')
        cards[optionOneId].removeEventListener('click', flipCard)
        cards[optionTwoId].removeEventListener('click', flipCard)
        cardsWon.push(cardsChosen)
        intentos += 1
    } else {
        cards[optionOneId].setAttribute('src', 'images/blank.png')
        cards[optionTwoId].setAttribute('src', 'images/blank.png')
        alert('sorry, try again!')
        intentos += 1
    }
    cardsChosen = []
    cardsChosenIds = []
    resultDisplay.textContent = cardsWon.length
    intentosDisplay.textContent = intentos
    console.log(cardsWon.length)
    

    if (cardsWon.length === cardArray.length / 2) {
        resultDisplay.textContent = 'Congratulations you found them all!'
        intentos = 0
    }
}

function flipCard () {
    let cardId = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenIds.push(cardId)
    console.log(cardsChosen)
    console.log(cardsChosenIds)
    this.setAttribute('src', cardArray[cardId].img)
    if (cardsChosen.length === 2) {
        setTimeout(checkMatch, 500)
    }
}

createBoard()