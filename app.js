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
const themeBtn = document.querySelector('#theme')
const bodyElement = document.querySelector('#body')
const h2Element = document.querySelector('#h2')
const enterBtn = document.querySelector('#enter-btn')
const deleteBtn = document.querySelector('#delete-btn')
const timerElement = document.querySelector('#timer')

const words = ['CLOCK', 'PAPER', 'BROWN', 'APPLE', 'BRAIN', 'CLOUD', 'BEACH', 'PLANE', 'WATER', 'HONEY', 'MONEY']
let word
let currentGuess = ''
let gameOver
let guesses = []
let indexGuess = 0
let isDark = false
let round = 0
let time = 60
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
    time = 60
    for (let square of letterElements) {
        square.textContent = ''
        square.style.backgroundColor = ''
    }

    startTimer()
}

function keyClick(event) {

    if (!event.target.classList.contains('key') && event.target.tagName !== 'BUTTON') {
        return
    }
    const key = event.target.textContent

    if (key !== 'Enter' && key !== '⌫') {
        if(gameOver){
            return
        }
        else{
        const currentRound = rowElements[round]

        currentRound.children[indexGuess].textContent = key

        indexGuess++
        }
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
}

function deleteLetter() {
    if (currentGuess.length > 0 && !gameOver) {
        currentGuess = currentGuess.slice(0, -1)
        rowElements[round].children[currentGuess.length].textContent = ''
    }
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
            if (isDark) {
                letterElements[i + (round * 5)].style.color = 'rgb(86, 79, 61)'
            }
        }
        else if (word.includes(currentGuess[i])) {
            letterElements[i + (round * 5)].style.backgroundColor = 'rgb(255, 255, 145)'
            if (isDark) {
                letterElements[i + (round * 5)].style.color = 'rgb(86, 79, 61)'
            }
        }
        else {
            letterElements[i + (round * 5)].style.backgroundColor = 'rgb(194, 194, 194)'
            if (isDark) {
                letterElements[i + (round * 5)].style.color = 'rgb(86, 79, 61)'
            }
        }
    }
}
function changeTheme() {
    if (!isDark) {
        isDark = true
        themeBtn.textContent = '🌙'
        bodyElement.style.backgroundColor = 'rgb(64, 52, 39)'
        themeBtn.style.backgroundColor = 'rgb(92, 78, 62)'
        themeBtn.style.border = '2px solid rgb(221, 214, 197)'
        messageElement.style.color = 'rgb(221, 214, 197)'
        h2Element.style.color = 'rgb(221, 214, 197)'
        enterBtn.style.backgroundColor = 'rgb(92, 78, 62)'
        enterBtn.style.border = '2px solid rgb(221, 214, 197)'
        enterBtn.style.color = 'rgb(221, 214, 197)'
        deleteBtn.style.backgroundColor = 'rgb(92, 78, 62)'
        deleteBtn.style.border = '2px solid rgb(221, 214, 197)'
        deleteBtn.style.color = 'rgb(221, 214, 197)'
        restartBtn.style.backgroundColor = 'rgb(92, 78, 62)'
        restartBtn.style.border = '2px solid rgb(221, 214, 197)'
        restartBtn.style.color = 'rgb(221, 214, 197)'
        timerElement.style.color = 'rgb(221, 214, 197)'

        for (let i = 0; i < letterElements.length; i++) {
            letterElements[i].style.border = '2px solid rgb(221, 214, 197)'
            letterElements[i].style.color = 'rgb(221, 214, 197)'
        }

        for (let i = 0; i < keyElements.length; i++) {
            keyElements[i].style.border = '2px solid rgb(221, 214, 197)'
            keyElements[i].style.backgroundColor = 'rgb(86, 79, 61)'
            keyElements[i].style.color = 'rgb(221, 214, 197)'
        }
    }
    else {
        isDark = false
        themeBtn.textContent = '☀️'
        bodyElement.style.backgroundColor = 'rgb(221, 214, 197)'
        themeBtn.style.backgroundColor = 'rgb(255, 247, 229)'
        themeBtn.style.border = '2px solid rgb(86, 79, 61)'
        messageElement.style.color = 'rgb(86, 79, 61)'
        h2Element.style.color = 'rgb(86, 79, 61)'
        enterBtn.style.backgroundColor = 'rgb(255, 247, 229)'
        enterBtn.style.border = '2px solid rgb(86, 79, 61)'
        enterBtn.style.color = 'rgb(86, 79, 61)'
        deleteBtn.style.backgroundColor = 'rgb(255, 247, 229)'
        deleteBtn.style.border = '2px solid rgb(86, 79, 61)'
        deleteBtn.style.color = 'rgb(86, 79, 61)'
        restartBtn.style.backgroundColor = 'rgb(255, 247, 229)'
        restartBtn.style.border = '2px solid rgb(86, 79, 61)'
        restartBtn.style.color = 'rgb(86, 79, 61)'
        timerElement.style.color = 'rgb(86, 79, 61)'

        for (let i = 0; i < letterElements.length; i++) {
            letterElements[i].style.border = '2px solid rgb(86, 79, 61)'
            letterElements[i].style.color = 'rgb(86, 79, 61)'
        }

        for (let i = 0; i < keyElements.length; i++) {
            keyElements[i].style.border = '2px solid rgb(86, 79, 61)'
            keyElements[i].style.backgroundColor = 'rgb(239, 226, 207)'
            keyElements[i].style.color = 'rgb(86, 79, 61)'
        }
    }
}

function startTimer(){
    const intervalId = setInterval(() => {
        if(time === 0){
            clearInterval(intervalId)
            messageElement.textContent = `Game over! The word was ${word}`
            gameOver = true
            return
        }
        time--
        timerElement.textContent = time
        if(gameOver){
            clearInterval(intervalId)
        }
    }, 1000)
}

init()
playBtn.addEventListener('click', gameDisplay)
keyboardElement.addEventListener('click', keyClick)
restartBtn.addEventListener('click', gameDisplay)
themeBtn.addEventListener('click', changeTheme)