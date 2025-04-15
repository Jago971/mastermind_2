const COLORS = ["red", "green", "blue", "yellow", "purple", "orange"];
const MAX_TURNS = 10;

let currentGuess = [];
let opponent = [];
let turn = 1;

const guessElements = [...document.querySelectorAll(".guess")];
const resultsElements = [...document.querySelectorAll(".result")];
const opponentElements = [...document.querySelectorAll(".opponent .pin")];
const colorButtons = document.querySelectorAll(".choose .pin");
const undoButton = document.querySelector("#undo");
const enterButton = document.querySelector("#enter");
const cover = document.querySelector(".cover");
const highscoreModal = document.getElementById("highscoreModal");
const submitScoreButton = document.getElementById("submitScore");

function toggleCover() {
  cover.classList.toggle("hidden");
}

function removeAllPins() {
  document.querySelectorAll(".pin:not(.choose .pin)").forEach((pin) => {
    pin.classList.remove(...COLORS);
    pin.classList.remove("right", "wrong");
  });
}

function drawPins(pinElements, pinColors) {
  pinElements.forEach((pin) => {
    pin.classList.remove(...COLORS);
  });

  pinColors.forEach((color, index) => {
    if (pinElements[index]) {
      pinElements[index].classList.add(color);
    }
  });
}

function generateOpponent() {
  opponent = [];
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * COLORS.length);
    opponent.push(COLORS[randomIndex]);
  }
}

function checkWin(guess, opponent) {
  return guess.every((color, index) => color === opponent[index]);
}

function getRightPosition(guess, opponent) {
  let matches = 0;
  for (let i = 0; i < opponent.length; i++) {
    if (opponent[i] === guess[i]) {
      matches++;
    }
  }
  return matches;
}

function getWrongPosition(guess, opponent) {
  const guessCopy = [...guess];
  const opponentCopy = [...opponent];

  for (let i = 0; i < guessCopy.length; i++) {
    if (guessCopy[i] === opponentCopy[i]) {
      guessCopy[i] = null;
      opponentCopy[i] = null;
    }
  }

  let matches = 0;
  for (const color of guessCopy) {
    if (color && opponentCopy.includes(color)) {
      opponentCopy[opponentCopy.indexOf(color)] = null;
      matches++;
    }
  }

  return matches;
}

function showResults(guess, opponent) {
  const right = getRightPosition(guess, opponent);
  const wrong = getWrongPosition(guess, opponent);
  const resultsPins =
    resultsElements[MAX_TURNS - turn].querySelectorAll(".pin");

  resultsPins.forEach((pin) => pin.classList.remove(...COLORS));

  for (let i = 0; i < right; i++) {
    resultsPins[i].classList.add("right");
  }

  for (let i = right; i < right + wrong; i++) {
    resultsPins[i].classList.add("wrong");
  }
}

function addGuess(color) {
  if (currentGuess.length < 4) {
    currentGuess.push(color);
  }
}

function removeGuess() {
  if (currentGuess.length > 0) {
    currentGuess.pop();
  }
}

function enterGuess() {
  if (currentGuess.length !== 4) return;

  drawPins(
    guessElements[MAX_TURNS + 1 - turn].querySelectorAll(".pin"),
    currentGuess
  );
  showResults(currentGuess, opponent);

  if (checkWin(currentGuess, opponent)) {
    alert("Congratulations! You guessed the correct combination!");
    toggleCover();
    setTimeout(() => {
      resetGame("win");
    }, 1000);
  } else if (turn >= MAX_TURNS) {
    alert("Game over! You're out of turns.");
    toggleCover();
    setTimeout(() => {
      resetGame("lose");
    }, 1000);
  } else {
    turn++;
    currentGuess = [];
  }
}

function resetGame(outcome) {
  if (outcome === "win") {
    highscoreModal.classList.remove("hidden");
  } else {
    finalizeReset();
  }
}

submitScoreButton.addEventListener("click", (event) => {
  event.preventDefault();
  const username = document.getElementById("username").value.trim();
  if (!username) return alert("Please enter a name.");

  const data = {
    username: username,
    score: turn,
  };

  try {
    fetch("http://localhost:3000/highscore", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((errorData) => {
            throw new Error(errorData.error || "Something went wrong");
          });
        }
        return res.json();
      })
      .then((data) => {
        alert(data.message);
        window.location.reload();
      });
  } catch (err) {
    console.error("Error:", err);
    alert("There was an error submitting your score: " + err.message);
  }
});

function finalizeReset() {
  toggleCover();
  setTimeout(() => {
    currentGuess = [];
    opponent = [];
    turn = 1;
    toggleCover();
    removeAllPins();
    generateOpponent();
    drawPins(opponentElements, opponent);
  }, 200);
}

colorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const color = button.getAttribute("data-color");
    addGuess(color);
    drawPins(
      guessElements[MAX_TURNS + 1 - turn].querySelectorAll(".pin"),
      currentGuess
    );
  });
});

undoButton.addEventListener("click", () => {
  removeGuess();
  drawPins(
    guessElements[MAX_TURNS + 1 - turn].querySelectorAll(".pin"),
    currentGuess
  );
});

enterButton.addEventListener("click", enterGuess);

generateOpponent();
drawPins(opponentElements, opponent);
