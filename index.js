const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");



let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6]
];

//lets create function to initialise game


function intiGame(){
    currentPlayer = "X";

    gameGrid = ["","","","","","","","",""];
    newGameBtn.classList.remove("active");

    //UI empty
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";

        //remove green color --- intitialise box with CSS properties again
        box.classList = `box box${index+1}`;

    });



    gameInfo.innerText = `Current Player - ${currentPlayer}`;

    // console.log(currentPlayer);
}

intiGame();

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "0";
    }
    else{
        currentPlayer = "X";
    }

    //UI Update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}


function checkGameOver(){
    let answer = "";
    
    winningPositions.forEach((position) => {
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && (gameGrid[position[0]] ===  gameGrid[position[1]] ) && ( gameGrid[position[1]] === gameGrid[position[2]]) )
      {
        //check if winner is x
        if(gameGrid[position[0]] === "X")
            answer = "x";
        else{
            answer = "0";
        }

        boxes.forEach((box) => {
            box.style.pointerEvents = "none";
        })

        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win");

        }
    });


    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }
    


    //let's chechk whether there is tie
    let fillcount = 0;
    gameGrid.forEach((box) => {
        if(box !== "")
            fillcount++;
    });

    //board id filled game is TIE
    if(fillcount === 9){
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }
}

function handleClick(index){
    if(gameGrid[index] === "" ) {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;

        boxes[index].style.pointerEvents = "none";
        //swap turn
        swapTurn();
        //check koi jeet toh nhi gya
        checkGameOver();

    }

}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })

})

newGameBtn.addEventListener("click", intiGame);

