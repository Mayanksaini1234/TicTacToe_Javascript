let message_conatiner = document.querySelector(".msg-container");
let message = document.querySelector("#msg");
let newGame = document.querySelector("#new-btn");
let boxes = document.querySelectorAll(".box");
let resetGame = document.querySelector("#reset-btn");

let turn = true;
let count = 0;

const winingPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
]
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn) {
            box.innerHTML = "O";
            box.classList.add("color_O");
            turn = false;
        } else {
            box.innerHTML = "X";
            turn = true;
            box.classList.remove("color_O");

        }
        box.disabled = true;
        // SO THAT WE CAN'T CHANGE AFTER ASSIGNING .. 
        count++;
        const winner = Winner();
        if (count == 9 && !winner) {
            GetDraw();
        }
    });
});

function GetDraw() {
    message_conatiner.classList.remove("hide");
    message.innerHTML = "Its a Draw !";
}
function disableBoxes() {
    boxes.forEach((box) => {
        box.disabled = true;
    });
}

function enableBoxes() {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerHTML = "";
    });
}
function reset() {
    count = 0;
    turn = true;
    enableBoxes();
    message_conatiner.classList.add("hide");

}

function showWinner(winner) {
    message_conatiner.classList.remove("hide");
    message.innerHTML = `Winner is ${winner}`;
    disableBoxes();
}

const Winner = () => {
    winingPatterns.forEach((pattern) => {
        let pos1val = boxes[pattern[0]].innerHTML;
        let pos2val = boxes[pattern[1]].innerHTML;
        let pos3val = boxes[pattern[2]].innerHTML;
        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val);
                return true;
            }
        }
    })


}
resetGame.addEventListener("click", () => {
    reset();
});
newGame.addEventListener("click", () => {
    reset();
});
