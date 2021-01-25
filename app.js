console.log("load");
const X = "X";
const circle = "O";
const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const cells = document.querySelectorAll(".row > div");
const board = document.getElementById("board");
const announceWinnerElement = document.getElementById("announceWinner");
const playAgain = document.getElementById("playAgain");
const announceWinnerElementText = document.querySelector(
  "[data-announce-winner-text]"
);
let circleTurn;

beginPlaying();

playAgain.addEventListener("click", beginPlaying);

function beginPlaying() {
  circleTurn = false;
  cells.forEach((cell) => {
    cell.classList.remove(X);
    cell.classList.remove(circle);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  announceWinnerElement.classList.remove("show");
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? circle : X;
  console.log(currentClass);
  placeMark(cell, currentClass);
  console.log(checkWin(currentClass), isDraw());
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function endGame(draw) {
  console.log(draw);
  if (draw) {
    announceWinnerElement.innerText = "Draw!";
  } else {
    announceWinnerElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
  }
  announceWinnerElement.classList.add("show");
}

function isDraw() {
  return [...cells].every((cell) => {
    return cell.classList.contains(X) || cell.classList.contains(circle);
  }); 
}

function placeMark(cell, currentClass) {
  console.log(cell, currentClass);
  cell.innerText = currentClass;
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X);
  board.classList.remove(circle);
  if (circleTurn) {
    board.classList.add(circle);
  } else {
    board.classList.add(X);
  }
}

function checkWin(currentClass) {
  return WINNING_COMBOS.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", handleClick);
  console.log(cells[i]);
}

// function cellClicked () {
//     event.target.textContent = "X";
//     console.log(event.target.textContent)
// }

//const announceWinner ()

//if(condition1 && condition2) {}
//if(condition1 || condition2)

// hints! cells[0].textcontent; if else statements

//
