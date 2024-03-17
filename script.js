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
const picked = [...document.querySelectorAll('#picked-comb-board > div')]
console.log(samples)

/*----- event listeners -----*/
document.getElementById('sample-board').addEventListener('click', handleClick);
document.getElementById('check').addEventListener('click', handleCheck)

/*----- functions -----*/
init();

function init() {

    playersBoard = [[null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null]];
    feedbackBoard = [[null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null]];
    currentGuess = 0;
    result = null;
    pickedCombinationBoard = []
    winCombo = generateWinCombo();
    render()

}

function handleClick(e) {
    let pickedColor = (e.target.id)
    if (pickedCombinationBoard.length === 4) {
        return pickedCombinationBoard
    } else {
        // console.log(pickedColor)
        pickedCombinationBoard.push(pickedColor)
        console.log(pickedCombinationBoard)
    }
    render()
    currentGuess += 1
}

function handleCheck(e) {

    playersBoard[0] = pickedCombinationBoard
    console.log(playersBoard[0])
    console.log(playersBoard)
}

function renderPickedCombinationBoard() {
    // console.log(pickedCombinationBoard)
    picked.forEach((el, idx) => {
        const pickedColor = pickedCombinationBoard[idx];
        el.style.backgroundColor = pickedColor;
    })
}

function renderPlayersBoard() {
    // console.log(playersBoard)
    // playersBoard[1] = 'yellow'

}

function renderFeedbackBoard() {

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
    return winCombo
}

function render() {
    renderPickedCombinationBoard()
    renderPlayersBoard()
    renderFeedbackBoard()
    renderWinningMessage()
}
