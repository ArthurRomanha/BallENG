const divVictory = document.querySelector(".victory");
const divScreens = document.querySelector(".screens");
const secondScreen = document.querySelectorAll(".secondScreen");
const selectDifficult = document.querySelectorAll("#selectDifficult");
const instructionsDescription = document.querySelector("#instructionsDescription");
const btnContinue = document.querySelector("#continue");
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const ship = document.querySelector("#ship");
let tileSize = 30;
let speedBolide = 5;
let speedShoot = 20;

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
let bolides = [
];
const randomX = () => {
    return Math.floor(Math.random() * 14) * tileSize;
}
const randomY = () => {
    return Math.floor(Math.random() * 10) * tileSize;
}
const randomDirection = () => {
    switch (Math.floor(Math.random() * 4)) {
        case 0:
            return 45;
        case 1:
            return 135;
        case 2:
            return -135;
        case 3:
            return -45;
    }
}
// const canMove = () => {
//     return true;
// }
//let randomWord = words[(Math.floor(Math.random() * 10))].name;
let randomWord = 'I'
for (let letter of randomWord) {
    bolides.push({
        letter: `${letter}`,
        x: randomX(),
        y: randomY(),
        direction: randomDirection()
        // canMove: canMove()
    })
}
//console.log(bolides);
let loopId;
let screen = 1;

let xShip = canvas.width / 2 - tileSize / 2;
let yShip = canvas.height - tileSize;

let shoot;
let widthShoot = 5;

let xShoot = xShip + tileSize / 2 - widthShoot / 2;
let yShoot = yShip;
let shootExist = false;

const drawShoot = () => {
    if (shootExist == true) {
        ctx.fillStyle = "white";
        shoot = ctx.fillRect(xShoot, yShoot, 5, 15);
        yShoot -= speedShoot;
    } else {
        yShoot = yShip;
        shootExist = true;
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
const drawGrid = () => {
    ctx.lineWidth = 1
    ctx.strokeStyle = 'gray';

    for (let i = 0; i < canvas.width + tileSize; i += tileSize) {//linhas verticais
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
const drawSprites = () => {
    divScreens.style.display = "none";
    canvas.style.display = "block";
    ctx.drawImage(ship, xShip, yShip, tileSize, tileSize);
    for (let bolide of bolides) {
        ctx.drawImage(document.getElementById(`meteor${bolide.letter}`), bolide.x, bolide.y, tileSize, tileSize);
    }
}
const moveBolide = () => {
    for (let bolide of bolides) {
        switch (bolide.direction) {
            case 45:
                bolide.y -= speedBolide;
                bolide.x += speedBolide;
                break;
            case 135:
                bolide.y += speedBolide;
                bolide.x += speedBolide;
                break;
            case -45:
                bolide.y -= speedBolide;
                bolide.x -= speedBolide;
                break;
            case -135:
                bolide.y += speedBolide;
                bolide.x -= speedBolide;
                break;
        }
        if (!((bolide.x > 0 && bolide.x < canvas.width - tileSize))) {
            bolide.direction = bolide.direction*-1;
        }else if(!(bolide.y > 0 && bolide.y < canvas.height - tileSize)){
            if (bolide.direction == 45 || bolide.direction == -135) {
                bolide.direction += 90;
    
            } else {
                bolide.direction -= 90;
            }
            
        }
    
    }
}
// const moveBolides = (bolide, directionInvert) => {
//     if ((bolide.y >= 0 && bolide.y < canvas.height - tileSize) && (bolide.x > 0 && bolide.x < canvas.width - tileSize) || directionInvert == true) {
//         if (bolide.direction == 45) {
//             bolide.y -= tileSize;
//             bolide.x += tileSize;
//         }
//         if (bolide.direction == 135) {
//             bolide.y += tileSize;
//             bolide.x += tileSize;
//         }
//         if (bolide.direction == -45) {
//             bolide.y -= tileSize;
//             bolide.x -= tileSize;
//         }
//         if (bolide.direction == -135) {
//             bolide.y += tileSize;
//             bolide.x -= tileSize;
//         }
//     } else {
//         if (bolide.direction == 45) {
//             bolide.direction = -45;
//             moveBolides(bolide, true);
//         } else if (bolide.direction == -45) {
//             bolide.direction = 45;
//             moveBolides(bolide, true);
//         } else if (bolide.direction == -135) {
//             bolide.direction = 135;
//             moveBolides(bolide, true);
//         } else if (bolide.direction == 135) {
//             bolide.direction = -135;
//             moveBolides(bolide, true);
//         }

//     //    console.log(bolide.direction);
//     }
// }
const game = () => {
    clearInterval(loopId);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawSprites();
    drawGrid();
    moveBolide();
    if (yShoot > 0) {
        drawShoot();
    } else {
        shootExist = false;
    }

    loopId = setTimeout(() => {
        game();
    }, 40);
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
            if (xShip < canvas.width - tileSize) {
                xShip += tileSize;
            }
            break;
        case 37://left
            if (xShip > 0) { xShip -= tileSize; }
            break;
        case 32:
            if (shootExist == false) {
                xShoot = xShoot = xShip + tileSize / 2 - widthShoot / 2;;
                yShoot = yShip;
                shootExist = true;
                drawShoot();
            }
            break;
    }
});