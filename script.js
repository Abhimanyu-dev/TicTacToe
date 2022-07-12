const body = document.querySelector(".board");
const winner = document.querySelector(".winner");

const GameBoard = () => {
  const Board = Array(9).fill(" ");
  let winner;
  const isEqual = (array) => {
    if (array[0] === array[1]) {
      if (array[0] === array[2]) if (array[0] != " ") return true;
    }
    return false;
  };
  const check = (board) => {
    let rows = [board.slice(0, 3), board.slice(3, 6), board.slice(6, 9)];
    let columns = [];
    let diagonal = [
      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]],
    ];

    for (let i = 0; i < 3; i++) {
      let column = [];
      for (let j = i, k = 0; j < 9; j += 3, k++) {
        column[k] = board[j];
      }
      columns.push(column);
    }
    var row_check = rows.map(isEqual);
    var column_check = columns.map(isEqual);
    var diagonal_check = diagonal.map(isEqual);
    // console.log(rows)
    if (row_check.includes(true)) {
      switch (row_check.indexOf(true)) {
        case 0:
          winner = rows[0][0] == "X" ? playerA : playerB;
          break;
        case 1:
          winner = rows[1][0] == "X" ? playerA : playerB;

          break;
        case 2:
          winner = rows[2][0] == "X" ? playerA : playerB;
          break;
        default:
      }
      return winner;
    }
    if (column_check.includes(true)) {
      switch (column_check.indexOf(true)) {
        case 0:
          winner = rows[0][0] == "X" ? playerA : playerB;
          break;
        case 1:
          winner = rows[0][1] == "X" ? playerA : playerB;

          break;
        case 2:
          winner = rows[0][2] == "X" ? playerA : playerB;

          break;
        default:
      }
      return winner;
    }
    if (diagonal_check.includes(true)) {
      switch (diagonal_check.indexOf(true)) {
        case 0:
          winner = rows[0][0] == "X" ? playerA : playerB;
          break;
        case 1:
          winner = rows[0][2] == "X" ? playerA : playerB;
          break;
        default:
      }
      return winner;
    }
    // return "No winners yet"
  };

  return { Board, check };
};

const PlayerA = () => {
  const chance = true;
  const mark = "X";
  return { chance, mark };
};

const PlayerB = () => {
  const chance = false;
  const mark = "O";
  return { chance, mark };
};

function onClick() {
  let player1 = playerA;
  let player2 = playerB;
  // console.log(this.parentNode)
  if (this.parentNode) {
    // console.log(1)
    let container = document.querySelector("#" + this.parentNode.id);
    // console.log(2)
    container.removeChild(container.children[0]);

    // container.removeChild(container.children[0])
    // console.log(this.textContent)
    // console.log(container.children[0])
    if (container.textContent === " ") {
      if (player1.chance) {
        container.textContent = "";
        container.textContent = player1.mark;
        container.className += " x";
        board.Board[parseInt(container.id.replace("c", ""))] = player1.mark;
        player1.chance = false;
        player2.chance = true;
      } else {
        container.textContent = "";
        container.textContent = player2.mark;
        container.className += " o";
        board.Board[parseInt(container.id.replace("c", ""))] = player2.mark;
        player2.chance = false;
        player1.chance = true;
      }
      let winner = board.check(board.Board)
      if (winner){
        openModal(winner.mark)
    }
    }
  }
}

function openModal(player){
    let modal = document.querySelector(".winner")
    let text_container = document.querySelector(".text-container")
    window.addEventListener("click", function(){
        window.location.reload()
    })
    switch (player){
        case "X":
            var winner = "Player A" 
            text_container.textContent = winner + " wins"
            modal.style.display = "block"
            break
        case "O":
            var winner = "Player B"
            text_container.textContent = winner + " wins"
            modal.style.display = "block"
            break
    }
}


function onMouseOver() {
  if (this.textContent === " ") {
    var hoverElement = document.createElement("div");
    hoverElement.className = "hover";
    hoverElement.addEventListener("mousedown", onClick);
    if (playerA.chance) {
      hoverElement.textContent = "X";
    } else {
      hoverElement.textContent = "O";
    }
    this.appendChild(hoverElement);
  }
}
function onMouseOut() {
  // this.style = "background-color: #78bec5; color: black"
  // this.textContent = ""
  if (this.childNodes.length > 1) this.removeChild(this.children[0]);
}

function DrawBoard(board) {
  for (let i = 0; i < 9; i++) {
    var container = document.createElement("div");
    container.className += `container`;
    container.id = "c" + i;
    // container.addEventListener("click", onClick)
    container.addEventListener("mouseenter", onMouseOver);
    container.addEventListener("mouseleave", onMouseOut);
    var text = board[i];
    container.appendChild(document.createTextNode(text));
    body.appendChild(container);
  }
}

var board = GameBoard();
var playerA = PlayerA();
var playerB = PlayerB();

DrawBoard(board.Board);


document.querySelector(".button-container").addEventListener("click", function(){
    window.location.reload()
})
// console.log(board.winner)
