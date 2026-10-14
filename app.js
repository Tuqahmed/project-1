const homePage = document.querySelector('#home-page')
const gamePage = document.querySelector('#game-page')
const playBtn = document.querySelector('#play-btn')

const words = ['CLOCK', 'PAPER', 'BROWN', 'APPLE', 'BRAIN']
let word
let currentAttempt
let gameOver

function init(){
    homePage.style.display = 'flex'
    gamePage.style.display = 'none'
}

function gameDisplay(){
    homePage.style.display = 'none'
    gamePage.style.display = 'flex'
}

init()
playBtn.addEventListener('click', gameDisplay)