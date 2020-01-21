const canvas = document.getElementById("gc");
const ctx = canvas.getContext("2d");
const tileSize = 20;
const gameWidth = canvas.width / tileSize;
const gameHeight = canvas.height / tileSize;
const KEYLEFT = 37;
const KEYRIGHT = 39;
const KEYUP = 38;
const KEYDOWN = 40;


var player = {x: 0, y: 0, move: true, color: "red"}

var boxes = [
    {x:3, y:3, move: true, color: "lime"},
    {x:3, y:4, move: true, color: "lime"},
    {x:5, y:3, move: false, color: "lightblue"},
    {x:5, y:4, move: false, color: "lightblue"},
]


function drawElement(obj) {
    ctx.fillStyle = obj.color;
    ctx.fillRect(obj.x * tileSize + 1, obj.y * tileSize + 1, tileSize - 2, tileSize - 2)
}

function drawGame() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawElement(player);

    for (box of boxes) {
        drawElement(box);
    }
}

function moveObj(obj ,dx, dy) {
    move = obj.move;
    for (box of boxes){
        if (box != obj && box.x == obj.x + dx && box.y == obj.y +dy ){
            move = moveObj(box, dx, dy);
        }
    }
    move &= obj.x + dx >= 0 && obj.x + dx < gameWidth;
    move &= obj.y + dy >= 0 && obj.y + dy < gameHeight;
    if (move) {
        obj.x += dx;
        obj.y += dy;
    }
    return move;
}

function onKeyDown(evt) {
    switch (evt.keyCode) {
        case KEYLEFT : {
            moveObj(player ,-1, 0);
            break;
        }
        case KEYRIGHT: {
            moveObj(player, 1, 0);
            break;
        }
        case KEYDOWN: {
            moveObj(player, 0, 1);
            break;
        }
        case KEYUP: {
            moveObj(player, 0, -1);
            break;
        }
    }
    drawGame();
}

window.onload = function() {
    drawGame();
    document.addEventListener('keydown', onKeyDown);
}