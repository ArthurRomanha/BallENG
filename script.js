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
let bolides = [
];
const randomX = () => {
    return Math.floor(Math.random() * 15) * 30;
}
const randomY = () => {
    return Math.floor(Math.random() * 10) * 30;
}
const randomDirection = () => {
    switch (Math.floor(Math.random() * 8)) {
        case 0:
            return 0;
        case 1:
            return 45;
        case 2:
            return 90;
        case 3:
            return 135;
        case 4:
            return 180;
        case 5:
            return -135;
        case 6:
            return -90;
        case 7:
            return -45;
    }
}
let randomWord = words[(Math.floor(Math.random() * 10))].name;
for (let letter of randomWord) {
    bolides.push({
        letter: `${letter}`,
        x: randomX(),
        y: randomY(),
        directon: randomDirection()
    })
}
console.log(bolides);
let loopId;
let screen = 1;

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');



let spriteSize = 30;

let xShip = canvas.width / 2 - spriteSize / 2;
let yShip = canvas.height - spriteSize;

let shoot;
let widthShoot = 5;

let xShoot = xShip + spriteSize / 2 - widthShoot / 2;
let yShoot = yShip;
let shootExist = false;

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
const drawSprites = () => {
    divScreens.style.display = "none";
    canvas.style.display = "block";
    ctx.drawImage(ship, xShip, yShip, 30, 30);
    for (let bolide of bolides) {
        ctx.drawImage(document.getElementById(`meteor${bolide.letter}`), bolide.x, bolide.y, 30, 30);
    }
}
const moveBolides = () => {
    for (let bolide of bolides) {
        if (bolide.y > 0 && bolide.y < canvas.height && bolide.x > 0 && bolide.x < canvas.width)
            switch (bolide.directon) {
                case 0:
                    bolide.y -= 30;
                    break;
                case 45:
                    bolide.y -= 30;
                    bolide.x += 30;
                    break;
                case 90:
                    bolide.x += 30;
                    break;
                case 135:
                    bolide.y += 30;
                    bolide.x += 30;
                    break;
                case 180:
                    bolide.y += 30;
                    break;
                case -45:
                    bolide.y += 30;
                    bolide.x -= 30;
                    break;
                case -90:
                    bolide.x -= 30;
                    break;
                case -135:
                    bolide.y -= 30;
                    bolide.x -= 30;
                    break;
            }
    }
}
const verifyColisionWall = () => {
    for (let bolide of bolides) {
        if (positionXBall == - sizeBall) { // left walls
            directionBall = 90;
            pointsPlayer2++;
            resetPositions();
        }
        if (positionXBall == canvas.width) {// right walls
            directionBall = -90;
            pointsPlayer1++;
            resetPositions();
        }
        if (positionYBall == 0 || positionYBall == canvas.height - sizeBall) { //up and down walls
            if (directionBall == 45 || directionBall == -135) {
                directionBall += 90;

            } else {
                directionBall -= 90;
            }
        }
    }
}
const game = () => {
    clearInterval(loopId);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawSprites();
    moveBolides();
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