/*----- constants -----*/
const MAX_ATTEMPTS = 10;
const COLOR_PICKED = ['red', 'purple', 'blue', 'green', 'yellow', 'orange']
const sounds = {
    red: '',
    purple: '',
    blue: '',
    green: '',
    yellow: '',
    orange: '',
}

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

function init() {
    playersBoard = [[null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null]];
    currentGuess = 0;
    pickedCombinationBoard = []
    winCombo = generateWinCombo();
    render()
}

function handleClick(e) {
    click.play()
    if (pickedCombinationBoard.length >= 4) {
        return
    }
    let pickedColor = (e.target.id)
    pickedCombinationBoard.push(pickedColor);
    renderPickedCombinationBoard();
}

function handleReset(e) {
    resetCombinationBoard();
    render();
}


function handleCheck(e) {
    check.play()
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
function renderPickedCombinationBoard() {
    combinationBoardDivs.forEach((el) => {
        el.className = ''; // Clear all existing classes
    });

    combinationBoardDivs.forEach((el, idx) => {
        pickedColor = pickedCombinationBoard[idx]
        el.classList.add(`${pickedColor}`)
    })
}

function renderPlayersBoard() {
    playersBoard[currentGuess] = [...pickedCombinationBoard];
    playersBoard[currentGuess].forEach((el, idx) => {
        const selector = `#p${currentGuess} .circle${idx}`;
        const element = document.querySelector(selector);
        element.classList.add(`${el}`);
    })

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
}

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