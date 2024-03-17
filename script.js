/*----- constants -----*/
const MAX_ATTEMPTS = 10;
const COLOR_PICKED = ['red', 'purple', 'blue', 'green', 'yellow', 'gray']


/*----- state variables -----*/
let playersBoard = [];
let feedbackBoard = [];
let currentGuess;
let result;
let winCombo;
let pickedCombinationBoard;

/*----- cached elements  -----*/
const message = document.getElementById('message');
const button = document.querySelector('.button')
const samples = [...document.querySelectorAll('#sample-board > div')]
const combinationBoardDivs = [...document.querySelectorAll('#picked-comb-board > div')]
console.log(samples)

/*----- event listeners -----*/
samples.forEach(el => {
    el.addEventListener('click', handleClick);
})
document.getElementById('resetButton').addEventListener('click', handleReset)
document.getElementById('checkButton').addEventListener('click', handleCheck)


/*----- functions -----*/
init();

function init() {

    playersBoard = [[null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null]];

    currentGuess = 0;
    result = null;
    pickedCombinationBoard = []
    winCombo = generateWinCombo();
    render()

}

function handleClick(e) {
    let pickedColor = (e.target.id)
    pickedCombinationBoard.push(pickedColor);
    renderPickedCombinationBoard();
}

function handleReset(e) {
    console.log("RESET");
    resetCombinationBoard();
    render();
}


function handleCheck(e) {
    console.log("CHECK");
    renderFeedbackBoard();
    moveToPlayerBoard();
    resetCombinationBoard();
    renderPickedCombinationBoard();
    render();
    currentGuess++;

}
function renderPickedCombinationBoard() {
    // console.log(pickedCombinationBoard)
    combinationBoardDivs.forEach((el) => {
        el.style.backgroundColor = "transparent";
    })
    combinationBoardDivs.forEach((el, idx) => {
        const pickedColor = pickedCombinationBoard[idx];
        el.style.backgroundColor = pickedColor;
    })
}

function renderPlayersBoard() {
    // console.log(playersBoard)
    // playersBoard[1] = 'yellow'

}

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

function renderWinningMessage() {

}

function generateWinCombo() {
    let winCombo = [];
    for (let i = 0; i < 4; i++) {
        let randomIdx = Math.floor(Math.random() * COLOR_PICKED.length);
        winCombo.push(COLOR_PICKED[randomIdx])
    }
    console.log(winCombo)
    winCombo = ["yellow", "red", "red", "red"];
    return winCombo
}

function render() {
    renderWinningMessage()
    renderPickedCombinationBoard();
}

function resetCombinationBoard() {
    pickedCombinationBoard = [];
}

function moveToPlayerBoard() {
    playersBoard[currentGuess].forEach(function (elem, index) {
        playersBoard[currentGuess][index] = pickedCombinationBoard[index];
    });
    renderFeedbackBoard();
    currentGuess++;
}