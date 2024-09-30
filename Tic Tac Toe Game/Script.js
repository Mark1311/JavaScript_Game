// Store Class and Id's Value in a Variable using js.

let boxes = document.querySelectorAll(".box");    //Input Box
let resetBtn = document.querySelector("#reset-btn");    //Restart Button Game
let newGameBtn = document.querySelector("#new-btn");    //New Button Game
let msgContainer = document.querySelector(".msg-container");    // Winning msg print container
let msg = document.querySelector("#win-msg");             // Winning msg print on screen

let turnO = true; //playerX, playerO
let count = 0; //To Track Draw game

//Winning Possibility pattern

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Restart Game Button

const resetGamebtn = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};


//Main Logic of Full Game

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      //playerO
      box.innerText = "O";
      turnO = false;
    } else {
      //playerX
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});


// Drow Game Logic

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};


// Check Winner

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

// Show Winner

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// EventListener for Game Restart and New Game

newGameBtn.addEventListener("click", resetGamebtn);
resetBtn.addEventListener("click", resetGamebtn);