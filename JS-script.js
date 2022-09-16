let word = "";
let guessedLetters = [];
let livesLeft = 6;
const displayText = document.getElementById("displayText");
// Variables below are used to draw inside the canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 300;

// Event listener so that when button is clicked, the input box clears
document.getElementById("button").addEventListener("click", function clearInput() {
    document.getElementById("userInput").value = "";
})

// Draws the gallow when the page loads
function drawGallow() {
    ctx.fillRect(180, 280, 240, 3);
    ctx.fillRect(230, 40, 3, 240);
    ctx.fillRect(230, 40, 100, 3);
    ctx.fillRect(330, 40, 3, 40);
    // Line below will allow the rest of the hangmand to be drawn when the time comes
    ctx.beginPath();
}

// Retrieves the word given by the user
function getWord() {
    word = document.getElementById("userInput").value.toUpperCase();
}

// Creates place holders for each letter of the given word
function createCensoredWord() {
    let censoredText = document.getElementById("censoredWord");
    for (let i = 0; i < word.length; ++i) {
       let char = document.createElement("span");
       char.className = "badge text-bg-dark";
       char.id = i;
       char.innerHTML = "_";
       censoredText.appendChild(char);
    }
}

// Updates the censored word if the letter is found in the word
function updateCensoredWord(letter) {
    let letterIndex = word.indexOf(letter, -1);
    while (word.indexOf(letter, letterIndex) > -1) {
        let char = document.getElementById(letterIndex);
        char.innerHTML = letter;
        letterIndex = word.indexOf(letter, letterIndex + 1);
    }
}

function updateHangman() {
    // Draws:
    if (livesLeft == 5) {
        // Head
        ctx.arc(331, 100, 20, 0, Math.PI * 2, false);
    } else if (livesLeft == 4) {
        // Body 
        ctx.moveTo(331, 120);
        ctx.lineTo(331, 210);
    } else if (livesLeft == 3) {
        // Left Arm
        ctx.moveTo(331, 130);
        ctx.lineTo(300, 170);
    } else if (livesLeft == 2) {
        // Right Arm
        ctx.moveTo(331, 130);
        ctx.lineTo(362, 170);
    } else if (livesLeft == 1) {
        // Left Leg
        ctx.moveTo(331, 210);
        ctx.lineTo(300, 250);
    } else if (livesLeft == 0) {
        // Right Leg
        ctx.moveTo(331, 210);
        ctx.lineTo(362, 250);
    }
    ctx.stroke();
}

// Checks the letter given by user
function checkLetter() {
    let letter = document.getElementById("userInput").value.toUpperCase();
    // Checks if the letter has already been guessed
    if (guessedLetters.indexOf(letter) > -1) {
        displayText.innerHTML = letter + " has already been guessed";
    // If the letter has not been guessed previously, it checks if the letter is in the word 
    } else if (word.indexOf(letter) > -1) {
        displayText.innerHTML = letter + " is in the word";
        // Adds the letter to the guessed letters list
        guessedLetters.push(letter);
        updateGuessedLettersList(letter);
        checkGameStatus();
        updateCensoredWord(letter);
    // If the letter is not in the word the following code runs
    } else {
        displayText.innerHTML = letter + " is not in the word";
        // Adds the letter to the guessed letters list
        guessedLetters.push(letter);
        updateGuessedLettersList(letter);
        --livesLeft;
        updateHangman();
        checkGameStatus();
    }
}

// Displays the letter
function updateGuessedLettersList(letter) {
    let guessedLettersList = document.getElementById("guessedLetters");
    guessedLettersList.innerHTML += letter + ", ";
}

// Checks if the game is won or lost
function checkGameStatus() {
    // If player runs out of lives and the full hangman gets drawn the lose
    if (livesLeft == 0) {
        window.alert("You lost! Refresh page to play again");
        return true;
    }
    // If player still has lives left and all the letters of the word have been guessed then player wins
    for (let i = 0; i < word.length; ++i) {
        if (guessedLetters.indexOf(word[i]) < 0) {
            return false;
        }
    }
    window.alert("You won! Refresh page to paly again");
    return true;
}

function startGame() {
    getWord();
    createCensoredWord();
    displayText.innerHTML = "Type in a letter and click 'Check'";
    // Edits the input box
    document.getElementById("userInput").placeholder = "Type in a letter";
    document.getElementById("userInput").maxLength = "1";
    document.getElementById("userInput").minLength = "1";
    // Changes the called function when the button is clicked and button's name
    document.getElementById("button").outerHTML = "<button id=\"button\" class=\"btn btn-secondary\" onclick=\"checkLetter()\">";
    document.getElementById("button").innerHTML = "Check";
    // Event listener so that when button is clicked, the input box clears
    document.getElementById("button").addEventListener("click", function clearInput() {
        document.getElementById("userInput").value = "";
    })
    document.getElementById("guess").hidden = false;
}