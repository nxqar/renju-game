export const BOARD_SIZE = 19;
const WINNING_SCORE = 5;
const EMPTY = 0;

function withinBounds(row, column) {
    return row >= 0 && row < BOARD_SIZE && column >= 0 && column < BOARD_SIZE;
}

function hasStone(board, row, column, player) {
    return withinBounds(row, column) && board[row][column] === player;
}

export function evaluateBoard(currentBoard) {
    const directions = [
        [0, 1],
        [1, 0],
        [1, 1],
        [-1, 1]
    ];

    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let column = 0; column < BOARD_SIZE; column++) {
            const player = currentBoard[row][column];
            if (player === EMPTY) continue;

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

export function processText(text) {
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    if (lines.length === 0) return "";

    let numtest = 1;
    let currentLine = 0;

    const firstLine = lines[0].split(/\s+/).map(Number);
    if (firstLine.length === 1) {
        numtest = firstLine[0];
        currentLine = 1;
    } else {
        numtest = Math.floor(lines.length / BOARD_SIZE);
        currentLine = 0;
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

        if (result.winner === EMPTY) {
            outputText += "0\n";
        } else {
            outputText += `${result.winner}\n${result.row} ${result.column}\n`;
        }
    }

    return outputText.trim();
}
