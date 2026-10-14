const homePage = document.querySelector('#home-page')
const gamePage = document.querySelector('#game-page')
const playBtn = document.querySelector('#play-btn')
const boardElement = document.querySelector('#guesses')
const keyboardElement = document.querySelector('#keyboard')
const keysElement = document.querySelectorAll('.key')

const words = ['CLOCK', 'PAPER', 'BROWN', 'APPLE', 'BRAIN']
let word
let currentAttempt
let currentGuess
let gameOver

function init(){
    homePage.style.display = 'flex'
    gamePage.style.display = 'none'

    word = words[Math.floor(Math.random() * words.length)]
    currentAttempt = 0
    currentGuess = ''
    gameOver = false
}

function gameDisplay(){
    homePage.style.display = 'none'
    gamePage.style.display = 'flex'
}

init()
playBtn.addEventListener('click', gameDisplay)