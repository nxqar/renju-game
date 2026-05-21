# Renju Game - 19x19

An interactive web-based implementation of the traditional board game **Renju**, built with JavaScript, HTML5, and CSS3.

## Live Demo
Check out the live game here: [DEMO](https://nxqar.github.io/renju-game/)

## Features
### 1. Interactive board
* **Dynamic 19x19 board:** a fully responsive grid with coordinate labeling (1-19) for easy navigation.
* **Win detection:** real-time logic checks for five consecutive stones (horizontal, vertical, or diagonal).
* **Turn management:** automatic switching between Black (starts first) and White players.

### 2. Test case & Parser
* **Multi-test Support:** allows users to paste large matrices of game states (web UI or CLI) to determine winners and coordinates instantly.
* **Coordinate Output:** identifies the leftmost/uppermost stone of a winning sequence using 1-based indexing.

## Rules of the Game
* The game is played on a **19x19** grid.
* **Black** always moves first.
* **Victory Condition:** a player wins by placing **five** stones of their color consecutively in a row (horizontally, vertically, or diagonally).

## Technical Implementation

### File Structure
* `index.html`: contains the layout and application structure.
* `style.css`: external stylesheet for the game UI, grid layouts, and stone designs.
* `logic.js`: core game logic, containing win evaluation and text processing algorithms (shared between Web and CLI).
* `app.js`: handles interactive UI events, board rendering, and state management for the browser.
* `cli.js`: command line Interface for running automated tests via standard input (`stdin`).

### Key Logic: The `evaluateBoard` Function
The win-condition algorithm uses a directional scanning approach. It optimizes performance by:
1. Scanning the board from top-left to bottom-right.
2. Checking only 4 primary directions (right, down, down-right, up-right).
3. Ensuring it doesn't duplicate scans by skipping sequences that are a continuation of an already checked row.

## Installation & Usage

1. Clone the repository:
   ```bash
   git clone [https://github.com/nxqar/renju-game.git](https://github.com/nxqar/renju-game.git)
   cd renju-game

### Web Interface
Open index.html directly in any modern web browser, or serve it via a local server.
To test the parser in the browser, paste a 19x19 matrix into the text area and click "Process data".

### Running Test Cases via CLI
You can test game states using Node.js by piping a text file containing the 19x19 matrix into the CLI script.

Run the following command in your terminal:
```bash
cmd /c "node cli.js < input.txt"
