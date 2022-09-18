let word = "";
let guessedLetters = [];
let livesLeft = 6;
const displayText = document.getElementById("displayText");

// Event listener so that when button is clicked, the input box clears
document.getElementById("button").addEventListener("click", function clearInput() {
    document.getElementById("userInput").value = "";
})

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
        updateHangman(livesLeft);
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
    // If player runs out of lives and the full hangman gets drawn the player loses
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
