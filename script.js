/*----- constants -----*/
const MAX_ATTEMPTS = 10;
const COLOR_PICKED = ['red', 'purple', 'blue', 'green', 'yellow', 'orange']

/*----- state variables -----*/
let playersBoard = [];
let feedbackBoard = [];
let currentGuess;
let winCombo;
let pickedCombinationBoard;

/*----- cached elements  -----*/

const message = document.getElementById('message');
const playButton = document.getElementById('play')
const samples = [...document.querySelectorAll('#sample-board > div')]
const combinationBoardDivs = [...document.querySelectorAll('#picked-comb-board > div')]

/*----- event listeners -----*/
samples.forEach(el => {
    el.addEventListener('click', handleClick);
})
document.getElementById('resetButton').addEventListener('click', handleReset)
document.getElementById('checkButton').addEventListener('click', handleCheck)
let click = document.getElementById("clickSound");
let check = document.getElementById("checkSound")


/*----- functions -----*/
init();

// Initialize the game
function init() {
    playersBoard = [[null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null]];
    currentGuess = 0;
    pickedCombinationBoard = []
    winCombo = generateWinCombo();
    render()
}

// Handle click on color sample
function handleClick(e) {
    click.play()
    if (pickedCombinationBoard.length >= 4) {
        return
    }
    let pickedColor = (e.target.id)
    pickedCombinationBoard.push(pickedColor);
    renderPickedCombinationBoard();
}

// Handle click on reset button
function handleReset(e) {
    resetCombinationBoard();
    render();
}

// Handle click on check button
function handleCheck(e) {
    check.play()
    if (pickedCombinationBoard.length < 4) {
        return
    }
    renderFeedbackBoard();
    renderPlayersBoard()
    moveToPlayerBoard();
    resetCombinationBoard();
    renderPickedCombinationBoard();
    pickedCombinationBoard = []
    renderWinningMessage()
    render();
    currentGuess++;
}

// Render the picked combination board
function renderPickedCombinationBoard() {
    combinationBoardDivs.forEach((el) => {
        el.className = ''; // Clear all existing classes
    });

    combinationBoardDivs.forEach((el, idx) => {
        pickedColor = pickedCombinationBoard[idx]
        el.classList.add(`${pickedColor}`)
    })
}

// Render player's board
function renderPlayersBoard() {
    playersBoard[currentGuess] = [...pickedCombinationBoard];
    playersBoard[currentGuess].forEach((el, idx) => {
        const selector = `#p${currentGuess} .circle${idx}`;
        const element = document.querySelector(selector);
        element.classList.add(`${el}`);
    })

}

// Render feedback for the current guess
function renderFeedbackBoard() {
    let feedbackField = 0;
    let playerChoice = playersBoard[currentGuess].slice();
    let winningSet = winCombo.slice();
    for (let index = 0; index < 4; index++) {
        if (playerChoice[index] === winningSet[index]) {
            document.querySelector(`#f${currentGuess} .circle${feedbackField}`).style.backgroundColor = "red";
            playerChoice[index] = winningSet[index] = "checked";
            feedbackField++;
        }
    }
    for (let index = 0; index < 4; index++) {
        if (winningSet.includes(playerChoice[index]) && playerChoice[index] !== "checked") {
            document.querySelector(`#f${currentGuess} .circle${feedbackField}`).style.backgroundColor = "white";
            winningSet[winningSet.indexOf(playerChoice[index])] = "checked";
            feedbackField++;
        }
    }
}

// Generate winning combination
function generateWinCombo() {
    let winCombo = [];
    for (let i = 0; i < 4; i++) {
        let randomIdx = Math.floor(Math.random() * COLOR_PICKED.length);
        winCombo.push(COLOR_PICKED[randomIdx])
    }
    console.log(winCombo)
    return winCombo
}

// Render game state
function render() {
    renderWinningMessage()
    renderPickedCombinationBoard();
}

// Reset combination board
function resetCombinationBoard() {
    pickedCombinationBoard = [];
}

// Move picked combination to player's board
function moveToPlayerBoard() {
    playersBoard[currentGuess].forEach(function (elem, index) {
        playersBoard[currentGuess][index] = pickedCombinationBoard[index];
    });
    renderFeedbackBoard();
}

// Render winning/losing message
function renderWinningMessage() {
    if (playersBoard[currentGuess].every((el, idx) => el === winCombo[idx])) {
        message.innerText = `You Guessed the combination 🎉`
        samples.forEach(el => {
            el.removeEventListener('click', handleClick);
        })
    } else if (currentGuess === 9) {
        message.innerText = `You Lost the game 😭`
    }
}
