const homePage = document.querySelector('#home-page')
const gamePage = document.querySelector('#game-page')
const playBtn = document.querySelector('#play-btn')
const boardElement = document.querySelector('#guesses')
const keyboardElement = document.querySelector('#keyboard')
const keyElements = document.querySelectorAll('.key')
const messageElement = document.querySelector('#message')
const restartBtn = document.querySelector('#restart')
const letterElements = document.querySelectorAll('.letter')
const rowElements = document.querySelectorAll('.guess-row')

const words = ['CLOCK', 'PAPER', 'BROWN', 'APPLE', 'BRAIN', 'CLOUD', 'BEACH', 'PLANE', 'WATER', 'HONEY', 'MONEY']
let word
let currentGuess = ''
let gameOver
let guesses = []
let indexGuess = 0

let round = 0
function init() {
    homePage.style.display = 'flex'
    gamePage.style.display = 'none'
}

function gameDisplay() {
    homePage.style.display = 'none'
    gamePage.style.display = 'flex'

    word = words[Math.floor(Math.random() * words.length)]

    currentGuess = ''
    gameOver = false
    guesses = []
    indexGuess = 0
    messageElement.textContent = ''
    round = 0
    for (let square of letterElements) {
        square.textContent = ''
        square.style.backgroundColor = ''
    }
    console.log(word)
}

function keyClick(event) {

    if (!event.target.classList.contains('key') && event.target.tagName !== 'BUTTON') {
        return
    }
    const key = event.target.textContent

    console.log(key)
    if (key !== 'Enter' && key !== '⌫') {
        const currentRound = rowElements[round]

        console.log(currentGuess)

        currentRound.children[indexGuess].textContent = key

        indexGuess++
    }

    if (key === 'Enter') {
        enterGuess()
    }
    else if (key === '⌫') {
        deleteLetter()
        indexGuess--
    }
    else {
        addLetter(key)
    }
}

function addLetter(letter) {
    if (currentGuess.length < 5 && !gameOver) {
        currentGuess = currentGuess + letter
    }
    console.log(currentGuess)
}

function deleteLetter() {
    if (currentGuess.length > 0 && !gameOver) {
        currentGuess = currentGuess.slice(0, -1)
        rowElements[round].children[currentGuess.length].textContent = ''
    }
    console.log(currentGuess)

}

function enterGuess() {
    if (gameOver) {
        return
    }

    if (currentGuess.length !== 5) {
        messageElement.textContent = 'Enter 5 letters!'
        return
    }

    const guess = currentGuess
    guesses.push(guess)
    messageElement.textContent = ''
    checkGuess()

    if (guess === word) {
        messageElement.textContent = 'You Won!'
        gameOver = true
        currentGuess = ''
        return
    }

    currentGuess = ''

    if (guesses.length === 6) {
        messageElement.textContent = `Game over! The word was ${word}`
        gameOver = true
    }
    round++
    indexGuess = 0
}

function checkGuess() {
    for (let i = 0; i < 5; i++) {
        if (currentGuess[i] === word[i]) {
            letterElements[i + (round * 5)].style.backgroundColor = 'rgb(99, 210, 93)'
        }
        else if (word.includes(currentGuess[i])) {
            letterElements[i + (round * 5)].style.backgroundColor = 'rgb(255, 255, 145)'
        }
        else {
            letterElements[i + (round * 5)].style.backgroundColor = 'rgb(194, 194, 194)'
        }
    }
}

init()
playBtn.addEventListener('click', gameDisplay)
keyboardElement.addEventListener('click', keyClick)
restartBtn.addEventListener('click', gameDisplay)