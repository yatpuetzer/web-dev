//TODO: Replace p1NumStrats and p2NumStrats with query parameters
let queryParams = new URLSearchParams(window.location.search);
const P1_NUM_STRATS = Number(queryParams.get("p1NumStrats"));
const P2_NUM_STRATS = Number(queryParams.get("p2NumStrats"));
const PAYOFF_CONTENTS = "(<input type='number'>,<input type='number'>)"

buildMatrix();

function buildMatrix() {
  let matrix = document.getElementById("matrix");
  //Loop through (P1_NUM_STRATS + 1) times. Each iteration, make a row div
for(let i=0;  i<(P1_NUM_STRATS + 1); i++) {
  //Creat new row div
  
  let newRow = document.createElement("div");
  newRow.classList.add("matrix-row");
  matrix.append(newRow);
  
  //loop through (P2_NUM_STRATS + 1) times. Each iteration, make a cell
  for(let j=0; j < (P2_NUM_STRATS + 1); j++) {
    //creat a new cell
  let newCell = document.createElement("div");
    if (i == 0 && j == 0) {
      newCell.classList.add("empty-cell")
    } else if (i == 0) {
      newCell.classList.add("strat-cell")
      newCell.innerHTML = "t<sub>"+ j +"</sub>"
    }  else if (j == 0) {
      newCell.classList.add("strat-cell")
      newCell.innerHTML = "s<sub>"+ i +"</sub>"
    } else {
      newCell.classList.add("payoff");
      newCell.innerHTML = PAYOFF_CONTENTS;
    }
  newRow.append(newCell);
    }
  }  
}

function randomize() {
  let payoffArr = document.querySelectorAll("input");
  
  const MIN = -5;
  const MAX = 15;
  
  for (const elem of payoffArr) {
    elem.value = Math.floor(Math.random()*(MAX+1 - MIN) + MIN);
  }
}

function calc() {
  let p1PayArr = document.querySelectorAll(".payoff input:first-child");
  let p2PayArr = document.querySelectorAll(".payoff input:last-child");
  let payCellArr = document.querySelectorAll(".payoff");
  
  for (const elem of payCellArr) {
    if(elem.classList.contains("eliminated") == true) elem.classList.remove("eliminated");
    if(elem.classList.contains("ne") == true) elem.classList.remove("ne");
  }
//loop througb every cilum finding p1 highest payoff out of the rows
  for (let j=0; j < P2_NUM_STRATS; j++) {
    let largest = - Infinity;
    //Identify the highest payoff in this collom
    for (let i=0; i < P1_NUM_STRATS; i++) {
      if (Number(p1PayArr[P2_NUM_STRATS*i+j].value)> Number(largest)) largest = Number(p1PayArr[P2_NUM_STRATS*i+j].value);
    }
    //Eliminate any cless which aren't best responses
    for (let j=0; j < P2_NUM_STRATS; j++) {
     if (Number(p1PayArr[P2_NUM_STRATS*i+j].value) != Number(largest)) payCellArr[P2_NUM_STRATS*i+j].classList.add("eliminated");
    }
  }
//Loop through every row, finding p2s highest payooff of the colloms
  for (let i=0; i < P1_NUM_STRATS; i++) {
    let largest = - Infinity;
    
    //Identify the highest payoff in this collom
    for (let j=0; j < P2_NUM_STRATS; j++) {
      if (Number(p2PayArr[P2_NUM_STRATS*i+j].value)> Number(largest)) largest = p2PayArr[P2_NUM_STRATS*i+j].value;
    }
    //Eliminate any cless which aren't best responses
    for (let j=0; j < P2_NUM_STRATS; j++) {
     if (Number(p2PayArr[P2_NUM_STRATS*i+j].value) != Number(largest)) payCellArr[P2_NUM_STRATS*i+j].classList.add("eliminated");
    }
  }
//Give thje ne class to any cells which are best responses for both players
  for (const elem of payCellArr) {
    if(elem.classList.contains("eliminated") == false) elem.classList.add("ne")
  }
}
