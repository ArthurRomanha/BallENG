const divVictory = document.querySelector(".victory");
const divScreens = document.querySelector(".screens");
const secondScreen = document.querySelectorAll(".secondScreen");
const selectDifficult = document.querySelectorAll("#selectDifficult");
const instructionsDescription = document.querySelector("#instructionsDescription");
const btnContinue = document.querySelector("#continue");
const ship = document.querySelectorAll("#ship");

let screen = 1;

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');;

const nextScreen = () => {
    switch (screen) {
        case 1:
            secondScreen.forEach(element => {
                element.style.visibility = "visible";
            })
            screen++;
            break;
        case 2:
            instructionsDescription.style.visibility = "hidden";
            btnContinue.style.visibility = "hidden"
            selectDifficult.forEach(element => {
                element.style.visibility = "visible";
            })            
            break;
    }
}

const winGame = () => {
    fetch("dados.JSON").then((response) => {
        response.json().then((object) => {
            object.words.map((words) => {
                divVictory.innerHTML += `<h1>${words.name}</h1>
                                        <h2>${words.mean}</h2>`;
            })
        })
    })
}
const game = () => {
    divScreens.style.display = "none";
    canvas.style.display = "block";
    ctx.drawImage(ship, 30, 30, 30, 30);
    
}