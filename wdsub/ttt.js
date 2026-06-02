let gameOver = document.getElementById("game-over");
let winnerText = document.querySelector("#game-over p");
let squareArr = document.querySelectorAll(".ttt-square");
let currentPlayer = "X";

for (const elem of squareArr) {
  elem.addEventListener("click", (event) => drawSymbol(event));
}

function drawSymbol(event) {
  let clickedSquare = event.target;
  
  if (clickedSquare.innerText == "") {
    clickedSquare.innerText = currentPlayer;
    
    if (winCheck() == false) {
      tieCheck();           
    } else {
      
      return;
    }
    
    changePlayer();
  }
}

function winCheck() {
  let isGameOver = false;
  
  // check for 3 in a row
  for (let i = 0; i < 3; i++) {
    if (squareArr[3*i].innerText == currentPlayer &&
        squareArr[3*i+1].innerText == currentPlayer &&
        squareArr[3*i+2].innerText == currentPlayer) {
      isGameOver = true;
    }
  }
  
  // check columns
  for (let i = 0; i < 3; i++) {
    if (squareArr[i].innerText == currentPlayer &&
        squareArr[i+3].innerText == currentPlayer &&
        squareArr[i+6].innerText == currentPlayer) {
      isGameOver = true;
    }
  }
  
  // check diag
  if (squareArr[0].innerText == currentPlayer &&
      squareArr[4].innerText == currentPlayer &&
      squareArr[8].innerText == currentPlayer) {
    isGameOver = true;
  } else if (squareArr[2].innerText == currentPlayer &&
             squareArr[4].innerText == currentPlayer &&
             squareArr[6].innerText == currentPlayer) {
    isGameOver = true;
  }

  if (isGameOver) {
    showWinner();        
  }
  
  return isGameOver;
}

function tieCheck() {      
  let isDraw = true;
  
  for (const elem of squareArr) {
    if (elem.innerText == "") {
      isDraw = false;
    }
  }
  
  if (isDraw) {
    showDraw();
  }
}

function changePlayer() {
  if (currentPlayer == "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
}

function showWinner() {
  gameOver.style.display = "flex";           
  winnerText.innerText = currentPlayer + " Wins!";
}

function showDraw() {
  gameOver.style.display = "flex";
  winnerText.innerText = "Cat Game🐈";
}

function resetGame() {
  gameOver.style.display = "none";
  
  for (const elem of squareArr) {
    elem.innerText = "";
  }
  currentPlayer = "X";     
}
