# Renju Game - 19x19

An interactive web-based implementation of the traditional board game **Renju**, built with JavaScript, HTML5, and CSS3.

## Live Demo
Check out the live game here: [DEMO](https://nxqar.github.io/renju-game/)

## Features
### 1. Interactive board
* **Dynamic 19x19 board:** a fully responsive grid with coordinate labeling (1-19) for easy navigation.
* **Win detection:** real-time logic checks for exactly five consecutive stones (horizontal, vertical, or diagonal).
* **Turn management:** automatic switching between Black (starts first) and White players.

### 2. Test case
* **Multi-test Support:** allows users to paste large matrices of game states to determine winners and coordinates instantly.
* **Coordinate Output:** identifies the leftmost/uppermost stone of a winning sequence using 1-based indexing.


##  Rules of the Game
* The game is played on a **19x19** grid.
* **Black** always moves first.
* **Victory Condition:** a player wins by placing exactly **five** stones of their color consecutively in a row (horizontally, vertically, or diagonally).

## Technical implementation

### File structure
* `index.html`: contains the application structure and the core JavaScript logic.
* `style.css`: external stylesheet for the game UI, grid layouts, and stone animations.
* `script.js`: externalized logic for modularity.

### Key logic: 
### The `evaluateBoard` function
The win-condition algorithm uses a directional scanning approach. It optimizes performance by:
1.  Scanning the board from top-left to bottom-right.
2.  Checking only 4 primary directions (right, down, down-right, up-right).
3.  Verifying the "exactly 5" rule by checking the boundary cells to ensure a sequence isn't part of a longer 6+ line.


## Installation & Usage
1.  Clone the repository:
    ```bash
    git clone https://github.com/nxqar/renju-game.git
    ```
2.  Open `index.html` in any modern web browser.
3.  To test the parser, paste a 19x19 matrix into the text area and click **"Process Data"**.
