let allBoxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetBtn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; 
let count = 0;

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

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

allBoxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      
      box.innerHTML = "ক";
      turnO = false;
    } else {
     
      box.innerText = "খ";
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

const gameDraw = () => {
  msg.innerText = `দুজনেই সমান সমান`; //Game was a Draw.
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of allBoxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of allBoxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `তৈরি কৃত রিদওয়ান হোসাইন এর পক্ষ থেকে আপনাকে অভিনন্দন   (${winner})`;  //Developer Redwan Congratulates you, Winner ${winner}
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = allBoxes[pattern[0]].innerText;
    let pos2Val = allBoxes[pattern[1]].innerText;
    let pos3Val = allBoxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
