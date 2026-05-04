const BOARD_SIZE = 19;
const WINNING_SCORE = 5;

function withinBounds(row, column) {
    return row >= 0 && row < BOARD_SIZE && column >= 0 && column < BOARD_SIZE;
}

function hasStone(board, row, column, player) {
    return withinBounds(row, column) && board[row][column] === player;
}

function evaluateBoard(currentBoard) {
    const directions = [
        [0, 1],
        [1, 0],
        [1, 1],
        [-1, 1]
    ];

    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let column = 0; column < BOARD_SIZE; column++) {
            const player = currentBoard[row][column];
            if (player === 0) continue;

            for (let [deltaRow, deltaColumn] of directions) {
                let count = 1;
                let prevRow = row - deltaRow;
                let prevColumn = column - deltaColumn;

                if (hasStone(currentBoard, prevRow, prevColumn, player)) {
                    continue;
                }

                for (let i = 1; i <= WINNING_SCORE; i++) {
                    let nextRow = row + deltaRow * i;
                    let nextColumn = column + deltaColumn * i;

                    if (hasStone(currentBoard, nextRow, nextColumn, player)) {
                        count++;
                    } else {
                        break;
                    }
                }

                if (count === WINNING_SCORE) {
                    return { winner: player, row: row + 1, column: column + 1 };
                }
            }
        }
    }
    return { winner: 0 };
}

function processText(text) {
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    if (lines.length === 0) return "";

    let numtest = 1;
    let currentLine = 0;

    const firstLine = lines[0].split(/\s+/).map(Number);
    if (firstLine.length === 1) {
        numtest = firstLine[0];
        currentLine = 1;
    }

    let outputText = "";

    for (let test = 0; test < numtest; test++) {
        let testBoard = [];
        for (let i = 0; i < BOARD_SIZE; i++) {
            if (currentLine < lines.length) {
                const row = lines[currentLine].split(/\s+/).map(Number);
                while (row.length < BOARD_SIZE) row.push(0);
                testBoard.push(row);
                currentLine++;
            } else {
                testBoard.push(Array(BOARD_SIZE).fill(0));
            }
        }

        const result = evaluateBoard(testBoard);

        if (result.winner === 0) {
            outputText += "0\n";
        } else {
            outputText += `${result.winner}\n${result.row} ${result.column}\n`;
        }
    }

    return outputText.trim();
}

if (typeof process !== 'undefined' && process.release.name === 'node') {
    const fs = require('fs');
    try {
        const inputData = fs.readFileSync(0, 'utf-8'); 
        if (inputData.trim()) {
            console.log(processText(inputData));
        }
    } catch (err) {
        console.error("Error:", err);
    }
}

if (typeof window !== 'undefined') {
    let board = Array(BOARD_SIZE).fill().map(() => Array(BOARD_SIZE).fill(0));
    let currentPlayer = 1;
    let gameActive = true;

    const boardElement = document.getElementById('board');
    const statusElement = document.getElementById('status');

    function initBoard() {
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

                boardElement.appendChild(cell);
            }
        }
    }

    function makeStep(e) {
        if (!gameActive) return;
        const row = parseInt(e.target.dataset.row);
        const column = parseInt(e.target.dataset.column);

        if (board[row][column] !== 0) return;

        board[row][column] = currentPlayer;
        const stone = document.createElement('div');
        stone.className = `stone ${currentPlayer === 1 ? 'black' : 'white'}`;
        e.target.appendChild(stone);

        const result = evaluateBoard(board);

        if (result.winner !== 0) {
            const winner = `Game over! ${result.winner === 1 ? 'Black (1)' : 'White (2)'} wins;`;
            gameActive = false;
            statusElement.innerText = winner;
            alert(`${winner}\nCoordinates: ${result.row} ${result.column};`);
        } else {
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            statusElement.innerText = `Current turn: ${currentPlayer === 1 ? 'black' : 'white'}.`;
        }
    }

    function runParser() {
        const text = document.getElementById('test-input').value.trim();
        if (!text) return;
        document.getElementById('test-output').innerText = processText(text);
    }

    function reloadGame() {
        board = Array(BOARD_SIZE).fill().map(() => Array(BOARD_SIZE).fill(0));
        currentPlayer = 1;
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
}
