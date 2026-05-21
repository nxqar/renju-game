import { BOARD_SIZE, evaluateBoard, processText } from './logic.js';

const PLAYER_BLACK = 1;
const PLAYER_WHITE = 2;

const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');

function initBoard() {
    let state = {
        board: Array(BOARD_SIZE).fill().map(() => Array(BOARD_SIZE).fill(0)),
        currentPlayer: PLAYER_BLACK,
        gameActive: true
    };

    const fragment = document.createDocumentFragment();
    for (let row = 0; row <= BOARD_SIZE; row++) {
        for (let column = 0; column <= BOARD_SIZE; column++) {
            const cell = document.createElement('div');

            if (row === 0 && column === 0) {
                cell.className = 'cell cell-txt-style';
            } else if (row === 0) {
                cell.className = 'cell cell-txt-style';
                cell.innerText = column;
            } else if (column === 0) {
                cell.className = 'cell cell-txt-style';
                cell.innerText = row;
            } else {
                cell.className = 'cell';
                cell.dataset.row = row - 1;
                cell.dataset.column = column - 1;
                
                cell.addEventListener('click', (e) => {
                    state = makeStep(e, state);
                });
            }
            fragment.appendChild(cell);
        }
    }
    boardElement.appendChild(fragment);

    window.reloadGame = function() {
        state = {
            board: Array(BOARD_SIZE).fill().map(() => Array(BOARD_SIZE).fill(0)),
            currentPlayer: PLAYER_BLACK,
            gameActive: true
        };
        statusElement.innerText = 'Current turn: black.';
        document.querySelectorAll('.cell[data-row]').forEach(c => c.innerHTML = '');
        document.getElementById('test-output').innerText = 'Output will appear here...';
        document.getElementById('test-input').value = '';
    };
}

function makeStep(e, currentState) {
    if (!currentState.gameActive) return currentState;

    const row = parseInt(e.target.dataset.row);
    const column = parseInt(e.target.dataset.column);

    if (currentState.board[row][column] !== 0) return currentState;

    currentState.board[row][column] = currentState.currentPlayer;
    const stone = document.createElement('div');
    stone.className = `stone ${currentState.currentPlayer === PLAYER_BLACK ? 'black' : 'white'}`;
    e.target.appendChild(stone);

    const result = evaluateBoard(currentState.board);

    if (result.winner !== 0) {
        const winner = `Game over! ${result.winner === PLAYER_BLACK ? 'Black (1)' : 'White (2)'} wins;`;
        currentState.gameActive = false;
        statusElement.innerText = winner;
        setTimeout(() => {
            alert(`${winner}\nCoordinates: ${result.row} ${result.column};`);
        }, 10);
    } else {
        currentState.currentPlayer = currentState.currentPlayer === PLAYER_BLACK ? PLAYER_WHITE : PLAYER_BLACK;
        statusElement.innerText = `Current turn: ${currentState.currentPlayer === PLAYER_BLACK ? 'black' : 'white'}.`;
    }

    return currentState;
}

window.runParser = function() {
    const text = document.getElementById('test-input').value.trim();
    if (!text) return;
    document.getElementById('test-output').innerText = processText(text);
};

initBoard();