import { BOARD_SIZE, evaluateBoard, processText } from './logic.js';

const PLAYER_BLACK = 1;
const PLAYER_WHITE = 2;

    let board = Array(BOARD_SIZE).fill().map(() => Array(BOARD_SIZE).fill(0));
    let currentPlayer = PLAYER_BLACK;
    let gameActive = true;

    const boardElement = document.getElementById('board');
    const statusElement = document.getElementById('status');

    function initBoard() {
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
                    cell.addEventListener('click', makeStep);
                }
                fragment.appendChild(cell);
            }
        }

        boardElement.appendChild(fragment);
    }

    function makeStep(e) {
        if (!gameActive) return;
        const row = parseInt(e.target.dataset.row);
        const column = parseInt(e.target.dataset.column);

        if (board[row][column] !== 0) return;

        board[row][column] = currentPlayer;
        const stone = document.createElement('div');
        stone.className = `stone ${currentPlayer === PLAYER_BLACK ? 'black' : 'white'}`;
        e.target.appendChild(stone);

        const result = evaluateBoard(board);

        if (result.winner !== 0) {
            const winner = `Game over! ${result.winner === PLAYER_BLACK ? 'Black (1)' : 'White (2)'} wins;`;
            gameActive = false;
            statusElement.innerText = winner;
            setTimeout(() => {
                alert(`${winner}\nCoordinates: ${result.row} ${result.column};`);
            }, 10);
        } else {
            currentPlayer = currentPlayer === PLAYER_BLACK ? PLAYER_WHITE : PLAYER_BLACK;
            statusElement.innerText = `Current turn: ${currentPlayer === PLAYER_BLACK ? 'black' : 'white'}.`;
        }
    }

    function runParser() {
        const text = document.getElementById('test-input').value.trim();
        if (!text) return;
        document.getElementById('test-output').innerText = processText(text);
    }

    function reloadGame() {
        board = Array(BOARD_SIZE).fill().map(() => Array(BOARD_SIZE).fill(0));
        currentPlayer = PLAYER_BLACK;
        gameActive = true;
        statusElement.innerText = 'Current turn: black.';

        const cells = document.querySelectorAll('.cell[data-row]');
        cells.forEach(cell => {
            cell.innerHTML = '';
        });

        document.getElementById('test-output').innerText = 'Output will appear here...';
        document.getElementById('test-input').value = '';
    }

    window.runParser = runParser;
    window.reloadGame = reloadGame;
    initBoard();