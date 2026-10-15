const homePage = document.querySelector('#home-page')
const gamePage = document.querySelector('#game-page')
const playBtn = document.querySelector('#play-btn')
const boardElement = document.querySelector('#guesses')
const keyboardElement = document.querySelector('#keyboard')
const keyElements = document.querySelectorAll('.key')
const messageElement = document.querySelector('#message')

const words = ['CLOCK', 'PAPER', 'BROWN', 'APPLE', 'BRAIN']
let word
let currentAttempt
let currentGuess = ''
let gameOver
let guesses =[]

function init(){
    homePage.style.display = 'flex'
    gamePage.style.display = 'none'
}

function gameDisplay(){
    homePage.style.display = 'none'
    gamePage.style.display = 'flex'

    word = words[Math.floor(Math.random() * words.length)]
    currentAttempt = 0
    currentGuess = ''
    gameOver = false
    guesses = []
    messageElement.textContent = ''
    
    console.log(word)
}

function keyClick(event){

    const key = event.target.textContent
    console.log(key)

    if(key === 'Enter'){
        enterGuess()
    }
    else if(key === '⌫'){
        deleteLetter()
    }
    else{
        addLetter(key)
    }
}

function addLetter(letter){
    if(currentGuess.length < 5 && !gameOver){
        currentGuess = currentGuess + letter
        console.log(currentGuess)
    }
}

function deleteLetter(){
    if(currentGuess.length > 0 && !gameOver){
        currentGuess = currentGuess.slice(0, -1)
                console.log(currentGuess)
    }
}

function enterGuess(){
    console.log(currentGuess)
    if(gameOver){
        return
    }

    if(currentGuess.length !== 5){
        messageElement.textContent = 'Enter 5 letters!'
        return
    }

    const guess = currentGuess
    guesses.push(guess)
    messageElement.textContent = ''
    console.log(guess)
    updateKeyboard(guess, checkGuess(guess))

    if(guess === word){
        messageElement.textContent = 'You Won!'
        gameOver = true
        return
    }

    currentAttempt++
    currentGuess = ''
    console.log(currentAttempt)

    if(currentAttempt === 6){
        messageElement.textContent = `Game over! The word was ${word}`
        gameOver = true
    }
}

function checkGuess(guess){
    let result = Array(5).fill = 'gray'
    let remaining = word.split('')

    for(let i=0; i<5; i++){
        if(guess[i] === word[i]){
            result[i] = 'green'
            remaining[i] = null
        }
    }

    for(let i=0; i<5; i++){
        if(result[i] === 'green'){
            continue
        }

        let index = remaining.indexOf(guess[i])

        if(index !== -1){
            result[i] = 'yellow'
            remaining[index] = null
        }
    }
    console.log(guess, word, result)
    return result
}

function updateKeyboard(guess, result){
    console.log(guess)
    for(let i=0; i<5; i++){
        const keyEl = [...keyElements].find((k) => {
            k.textContent === guess[i]
        })

        if(!keyEl){
            continue
        }

        if(keyEl.classList.contains('green')){
            continue
        }

        if(keyEl.classList.contains('yellow') && result[i] === 'gray'){
            continue
        }

        keyEl.classList.remove('yellow', 'gray')
        keyEl.classList.add(result[i])
    }
}

init()
playBtn.addEventListener('click', gameDisplay)
keyboardElement.addEventListener('click', keyClick)

