const divScreens = document.querySelector(".screens");
const secondScreen = document.querySelectorAll(".secondScreen");
const instructionsDescription = document.querySelector("#instructionsDescription");
const btnContinue = document.querySelector(".continue");
const btnStart = document.querySelector(".start");
const divInfo = document.querySelector(".info");
const clue = document.querySelector(".clue");
const campMyWord = document.querySelector(".myWord");
const divVictory = document.querySelector(".victory");
const divLoose = document.querySelector(".loose");
const wordImage = document.querySelector(".wordImage");
const mean = document.querySelector(".mean");

let myWord = []
let speedGame = 100;
let positionNextLetter = 0;

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const tileSize = 30;
let ship = {
    img: document.querySelector(".ship"),
    x: canvas.width / 2 - tileSize / 2,
    y: canvas.height - tileSize
}
let speedball = 15;
let bullet;
let game;

let formedWord = "";

const words = [
    {
        "name": "LIGHT",
        "image": "img/imagesWords/light.webp",
        "mean": "LUZ"
    },
    {
        "name": "COUNTRY",
        "image": "img/imagesWords/country.webp",
        "mean": "PAÍS",
    },
    {
        "name": "PICTURE",
        "image": "img/imagesWords/picture.webp",
        "mean": "FOTO"
    },
    {
        "name": "WAITER",
        "image": "img/imagesWords/waiter.webp",
        "mean": "GARÇOM"
    },
    {
        "name": "BROKEN",
        "image": "img/imagesWords/broken.webp",
        "mean": "QUEBRADO"
    },
    {
        "name": "HEIGHT",
        "image": "img/imagesWords/height.webp",
        "mean": "ALTURA"
    },
    {
        "name": "BONES",
        "image": "img/imagesWords/bones.webp",
        "mean": "OSSOS"
    },
    {
        "name": "CARRY",
        "image": "img/imagesWords/carry.webp",
        "mean": "CARREGAR"
    },
    {
        "name": "TEETH",
        "image": "img/imagesWords/teeth.webp",
        "mean": "DENTE"
    },
    {
        "name": "TENT",
        "image": "img/imagesWords/tent.webp",
        "mean": "CABANA"
    }
]
let balls = [
];
const randomX = () => {
    let x = Math.floor(Math.random() * 14) * tileSize;
    while (x <= 0) {
        x = Math.floor(Math.random() * 14) * tileSize;
    }
    return x;
}
const randomY = () => {
    let y = Math.floor(Math.random() * 10) * tileSize;
    while (y <= 0) {
        y = Math.floor(Math.random() * 10) * tileSize;
    }
    return y;
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
let randomWord = words[(Math.floor(Math.random() * 10))];
// let randomWord = 'I'
for (let letter of randomWord.name) {
    campMyWord.textContent += "_ ";
    balls.push({
        letter: `${letter}`,
        x: randomX(),
        y: randomY(),
        direction: randomDirection(),
        exist: true
    })
}
//console.log(balls);
let loopId;
let screen = 1;

let shoot = {
    x: ship.x,
    y: ship.y + tileSize,
    img: document.querySelector(".shoot"),
    speed: 30,
    width: 30,
    height: 30,
    exist: false
};

const winGame = () => {
    clearInterval(game);
    canvas.style.display = "none";
    divVictory.style.display = "block";
    wordImage.src = `img/imagesWords/${randomWord.name}.webp`;
    mean.textContent = `A palavra ${randomWord.name} significa ${randomWord.mean}`;
}

const gameOver = () => {
    clearInterval(game)
    canvas.style.display = "none";
    divLoose.style.display = "block";

}
const reload = () => {
    window.location.reload();
}
const drawSprites = () => {
    divScreens.style.display = "none";
    canvas.style.display = "block";
    ctx.drawImage(ship.img, ship.x, ship.y, tileSize, tileSize);
    for (let ball of balls) {
        if (ball.exist) {
            ctx.drawImage(document.getElementById(`ball${ball.letter}`), ball.x, ball.y, tileSize, tileSize);

        }
    }
    if (shoot.exist == true && shoot.y > 0) {
        ctx.fillStyle = "white";
        bullet = ctx.drawImage(shoot.img, shoot.x, shoot.y, shoot.width, shoot.height);
        shoot.y -= shoot.speed;
    } else {
        shoot.y = ship.y;
        shoot.exist = false;
    }
}
const moveAndColisionball = () => {
    for (let ball of balls) {
        if ((ball.x == ship.x - 15 || ball.x == ship.x || ball.x == ship.x + 15) &&
            (ball.y == ship.y - 15 || ball.y == ship.y || ball.y == ship.y + 15) &&
            ball.exist) {
            gameOver();
        }
        if ((ball.x == shoot.x - 15 || ball.x == shoot.x || ball.x == shoot.x + 15) &&
            (ball.y == shoot.y - 15 || ball.y == shoot.y || ball.y == shoot.y + 15) &&
            shoot.exist && ball.exist) {
            myWord.push(`${ball.letter} `);
            ball.exist = false;
            shoot.exist = false;
            formedWord += ball.letter;
            campMyWord.textContent = " ";
            for (let i = 0; i < myWord.length; i++) {
                campMyWord.textContent += `${myWord[i]} `;
            }
            for (let j = 0; j < randomWord.name.length - myWord.length; j++) {
                campMyWord.textContent += "_ ";
            }
            if (formedWord.length == randomWord.name.length) {
                if(formedWord == randomWord.name){
                    winGame();
                }else{
                    gameOver();
                }
            }
        } else {
            switch (ball.direction) {
                case 45:
                    ball.y -= speedball;
                    ball.x += speedball;
                    break;
                case 135:
                    ball.y += speedball;
                    ball.x += speedball;
                    break;
                case -45:
                    ball.y -= speedball;
                    ball.x -= speedball;
                    break;
                case -135:
                    ball.y += speedball;
                    ball.x -= speedball;
                    break;
            }
            if ((ball.x == 0 && ball.y == 0) || //up and left corner
                (ball.x == canvas.width - tileSize && ball.y == 0) || //up and right corner
                (ball.x == 0 && ball.y == canvas.height - tileSize) ||//down and left corner
                (ball.x == canvas.width - tileSize && ball.y == canvas.height - tileSize)) { //down and right corner
                if ((ball.direction == 45) || (ball.direction == 135)) {
                    ball.direction -= 180;
                } else {
                    ball.direction += 180;
                }
            } else if (!((ball.x > 0 && ball.x < canvas.width - tileSize))) {
                ball.direction = ball.direction * -1;
            } else if (!(ball.y > 0 && ball.y < canvas.height - tileSize)) {
                if (ball.direction == 45 || ball.direction == -135) {
                    ball.direction += 90;

                } else {
                    ball.direction -= 90;
                }

            }
        }
    }
}
const startGame = () => {
    game = setInterval(() => {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawSprites();
        moveAndColisionball();


    }, speedGame);
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
            divScreens.style.display = "none";
            btnContinue.style.display = "none";
            btnStart.style.display = "block";
            canvas.style.display = "block";
            divInfo.style.display = "block";
            clue.innerHTML = `A palavra é: <bold>${randomWord.name}</bold>`;
            drawSprites();
            break;
    }
}
btnStart.addEventListener('click', () => {
    btnStart.style.display = "none";
    startGame()
})
document.addEventListener('keydown', function (tecla) {
    switch (tecla.keyCode) {
        case 39://right
            if (ship.x < canvas.width - tileSize) {
                ship.x += tileSize;
            }
            break;
        case 37://left
            if (ship.x > 0) { ship.x -= tileSize; }
            break;
        case 32:
            if (shoot.exist == false) {
                shoot.x = ship.x;
                shoot.y = ship.y + tileSize;
                shoot.exist = true;
            }
            break;
    }
});
