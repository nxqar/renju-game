    const BOARD_SIZE = 19;
    let board = Array(BOARD_SIZE).fill().map(() => Array(BOARD_SIZE).fill(0));
    let currentPlayer = 1; 
    let gameActive = true;

    const boardElement = document.getElementById('board');
    const statusElement = document.getElementById('status');

    function initBoard() {
        for (let r = 0; r <= BOARD_SIZE; r++) {
            for (let c = 0; c <= BOARD_SIZE; c++) {
                const cell = document.createElement('div');
                
                if (r === 0 && c === 0) {
                    cell.className = 'cell cell-txt-style';
                } else if (r === 0) {
                    cell.className = 'cell cell-txt-style';
                    cell.innerText = c;
                } else if (c === 0) {
                    cell.className = 'cell cell-txt-style';
                    cell.innerText = r;
                } else {
                    cell.className = 'cell';
                    cell.dataset.row = r - 1; 
                    cell.dataset.col = c - 1;
                    cell.addEventListener('click', makeStep);
                }
                
                boardElement.appendChild(cell);
            }
        }
    }

    function makeStep(e) {
        if (!gameActive) return;
        const r = parseInt(e.target.dataset.row);
        const c = parseInt(e.target.dataset.col);

        if (board[r][c] !== 0) return;

        board[r][c] = currentPlayer;
        const stone = document.createElement('div');
        stone.className = `stone ${currentPlayer === 1 ? 'black' : 'white'}`;
        e.target.appendChild(stone);

        const result = evaluateBoard(board);

        if (result.winner !== 0) {
            const winner = `Game over! ${result.winner === 1 ? 'Black (1)' : 'White (2)'} wins;`;
            gameActive = false;
            statusElement.innerText = winner;
            alert(`${winner}\nCoordinates: ${result.r} ${result.c};`);
        } else {
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            statusElement.innerText = `Current turn: ${currentPlayer === 1 ? 'black' : 'white'}.`;
        }
    }

    function evaluateBoard(currentBoard) {
        const directions = [
            [0, 1],
            [1, 0],
            [1, 1],
            [-1, 1]
        ];

        for (let r = 0; r < BOARD_SIZE; r++) {
            for (let c = 0; c < BOARD_SIZE; c++) {
                let player = currentBoard[r][c];
                if (player === 0) continue;

                for (let [dr, dc] of directions) {
                    let count = 1;
                    let prevR = r - dr;
                    let prevC = c - dc;
                    if (prevR >= 0 && prevR < BOARD_SIZE && prevC >= 0 && prevC < BOARD_SIZE && currentBoard[prevR][prevC] === player) {
                        continue; 
                    }

                    for (let i = 1; i <= 5; i++) { 
                        let nextR = r + dr * i;
                        let nextC = c + dc * i;
                        
                        if (nextR >= 0 && nextR < BOARD_SIZE && nextC >= 0 && nextC < BOARD_SIZE && currentBoard[nextR][nextC] === player) {
                            count++;
                        } else {
                            break;
                        }
                    }

                    if (count === 5) {
                        return { winner: player, r: r + 1, c: c + 1 };
                    }
                }
            }
        }
        return { winner: 0 };
    }

    function runParser() {
        const text = document.getElementById('test-input').value.trim();
        if (!text) return;

        const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
        if (lines.length === 0) return;

        let numtest = 1;
        let currentLine = 0;

        const firstLineNumbers = lines[0].split(/\s+/).map(Number);
        if (firstLineNumbers.length === 1) {
            numtest = firstLineNumbers[0];
            currentLine = 1;
        }

        let outputText = "";

        for (let t = 0; t < numtest; t++) {
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
                outputText += `${result.winner}\n${result.r} ${result.c}\n`;
            }
        }

        document.getElementById('test-output').innerText = outputText;
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

    initBoard();