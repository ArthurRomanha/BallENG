const divVictory = document.querySelector(".victory");
const divScreens = document.querySelector(".screens");
const secondScreen = document.querySelectorAll(".secondScreen");
const selectDifficult = document.querySelectorAll("#selectDifficult");
const instructionsDescription = document.querySelector("#instructionsDescription");
const btnContinue = document.querySelector("#continue");
const ship = document.querySelector("#ship");

const words = [
    {
        "name": "LIGHT",
        "image": "",
        "mean": "LUZ",
        "linkTranslator": ""
    },
    {
        "name": "COUNTRY",
        "image": "",
        "mean": "PAÍS",
        "linkTranslator": ""
    },
    {
        "name": "PICTURE",
        "image": "",
        "mean": "FOTO",
        "linkTranslator": ""
    },
    {
        "name": "WAITER",
        "image": "",
        "mean": "GARÇOM",
        "linkTranslator": ""
    },
    {
        "name": "BROKE",
        "image": "",
        "mean": "QUEBRADO",
        "linkTranslator": ""
    },
    {
        "name": "ACCENT",
        "image": "",
        "mean": "SOTAQUE",
        "linkTranslator": ""
    },
    {
        "name": "BONES",
        "image": "",
        "mean": "OSSOS",
        "linkTranslator": ""
    },
    {
        "name": "CARRY",
        "image": "",
        "mean": "CARREGAR",
        "linkTranslator": ""
    },
    {
        "name": "TEETH",
        "image": "",
        "mean": "DENTE",
        "linkTranslator": ""
    },
    {
        "name": "TENT",
        "image": "",
        "mean": "CABANA",
        "linkTranslator": ""
    }
]
let loopId;
let screen = 1;

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');


let randomWord = words[(Math.floor(Math.random()*10))];

let spriteSize = 30;

let xShip = canvas.width / 2 - spriteSize / 2;
let yShip = canvas.height - spriteSize;

let shoot;
let widthShoot = 5;

let xShoot = xShip + spriteSize / 2 - widthShoot / 2;
let yShoot = yShip;
let shootExist = false;
const randomXBolide = () => {
    let x = Math.floor(Math.random()*30);
    while (!(x>0||x<canvas.width)){
        x = Math.floor(Math.random()*30);
    }
    return x;
}
const randomYBolide = () => {    
    let y = Math.floor(Math.random()*30);
    while (!(y>0||x<canvas.height)) {
        y = Math.floor(Math.random()*30);
    }
    return y;
}

const drawShoot = () => {
    if (shootExist == true) {
        ctx.fillStyle = "white";
        shoot = ctx.fillRect(xShoot, yShoot, 5, 15);
        yShoot -= 15;
    } else {
        yShoot = yShip;
        shootExist = true;
    }
}
// const drawBolides = () => {
//     for (let letter of randomWord.name){
//         ctx.drawImage(document.getElementById(`meteor${letter}`, randomXBolide(), randomYBolide()));
//     }
// }
// drawBolides();
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
const drawGrid = () => {
    ctx.lineWidth = 1
    ctx.strokeStyle = 'gray';

    for (let i = 0; i < canvas.width + 30; i += 30) {//linhas verticais
        ctx.beginPath();
        ctx.lineTo(i, 0)
        ctx.lineTo(i, canvas.height)
        ctx.stroke()

        ctx.beginPath();
        ctx.lineTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
    }
}
const initSprites = () => {
    divScreens.style.display = "none";
    canvas.style.display = "block";
    ctx.drawImage(ship, xShip, yShip, 30, 30);
}
const game = () => {
    clearInterval(loopId);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // randomWord();
    initSprites();
    drawGrid();

    if (yShoot > 0) {
        drawShoot();
    } else {
        shootExist = false;
    }

    loopId = setTimeout(() => {
        game();
    }, 100);
}
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
            });
            game();
            break;
    }
}
document.addEventListener('keydown', function (tecla) {
    switch (tecla.keyCode) {
        case 39://right
            if (xShip < canvas.width - spriteSize) {
                xShip += 30;
            }
            break;
        case 37://left
            if (xShip > 0) { xShip -= 30; }
            break;
        case 32:
            if (shootExist == false) {
                xShoot = xShoot = xShip + spriteSize / 2 - widthShoot / 2;;
                yShoot = yShip;
                shootExist = true;
                drawShoot();
            }
            break;
    }
});