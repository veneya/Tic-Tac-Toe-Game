// Initialize game variables
let currentPlayer = "X"; // Player X always starts
let gameBoard = ["", "", "", "", "", "", "", "", ""]; // Empty game board
let gameActive = false; // Flag to track if game is active
let player1Name = "";
let player2Name = "";
const cells = document.querySelectorAll(".cell");
const messageDiv = document.getElementById("message");
const resetButton = document.getElementById("reset");
const thirdHalf = document.getElementById("third_half");
const playerNamesSection = document.getElementById("player-names-section");

// Get player names and start the game
document.getElementById("start-game").addEventListener("click", startGame);

// Function to start the game
function startGame() {
    // Get player names from inputs
    player1Name = document.getElementById("player1-name").value || "Player 1";
    player2Name = document.getElementById("player2-name").value || "Player 2";

    // Display player names and current turn
    thirdHalf.innerHTML = `
        <h2>PLAYER 1: ${player1Name} (X)</h2>
        <h2>PLAYER 2: ${player2Name} (O)</h2>
        <h3>Current Turn: X</h3>
    `;
    
    // Hide the player names section and show the game board
    playerNamesSection.style.display = "none";
    document.getElementById("board").style.display = "grid";
    resetButton.style.display = "inline-block"; // Show reset button
    gameActive = true; // Game is active now
    resetGame(); // Start fresh with a reset game
}

// Function to handle cell click
function handleCellClick(index) {
    if (!gameActive || gameBoard[index] !== "") {
        return; // Ignore if the cell is already filled or the game is over
    }

    // Mark the cell with the current player's symbol (X or O)
    gameBoard[index] = currentPlayer;
    document.getElementById(`cell${index + 1}`).textContent = currentPlayer;

    // Check if there is a winner
    if (checkWinner()) {
        messageDiv.textContent = `${currentPlayer === "X" ? player1Name : player2Name} Wins!`;
        gameActive = false; // End the game
        return;
    }

    // Check if it's a draw
    if (!gameBoard.includes("")) {
        messageDiv.textContent = "It's a Draw!";
        gameActive = false;
        return;
    }

    // Switch players
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    thirdHalf.innerHTML = `
        <h2>PLAYER 1: ${player1Name} (X)</h2>
        <h2>PLAYER 2: ${player2Name} (O)</h2>
        <h3>Current Turn: ${currentPlayer}</h3>
    `;
}

// Function to check for a winner
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    // Check each winning pattern
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }

    return false;
}

// Function to reset the game
function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""]; // Reset the game board
    currentPlayer = "X"; // Reset to Player X starting
    gameActive = true; // Game is active now
    
    // Clear the cells on the board
    cells.forEach(cell => cell.textContent = "");
    
    // Reset the message
    messageDiv.textContent = "";

    // Reset the player names and turn
    thirdHalf.innerHTML = `
        <h2>PLAYER 1: ${player1Name} (X)</h2>
        <h2>PLAYER 2: ${player2Name} (O)</h2>
        <h3>Current Turn: X</h3>
    `;
}

// Attach event listeners to each cell
cells.forEach((cell, index) => {
    cell.addEventListener("click", () => handleCellClick(index));
});

// Attach event listener to reset button
resetButton.addEventListener("click", resetGame);
