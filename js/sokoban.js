const canvas = document.getElementById("gc");
const ctx = canvas.getContext("2d");
const tileSize = 20;
const gameWidth = canvas.width / tileSize;
const gameHeight = canvas.height / tileSize;
const KEYLEFT = 37;
const KEYRIGHT = 39;
const KEYUP = 38;
const KEYDOWN = 40;

const WALLCOLOR = "magenta";
const BOXCOLOR = "lime";
const PLAYERCOLOR = "red";

var player = {x: 1, y: 1, move: true, color: PLAYERCOLOR}

var boxes = [
    {x:3, y:3, move: true, color: BOXCOLOR},
    {x:3, y:4, move: true, color: BOXCOLOR},
]

var walls = [
    {x:5, y:3, move: false, color: WALLCOLOR},
    {x:5, y:4, move: false, color: WALLCOLOR},
]
for (var i = 0; i<gameWidth;i++) {
    walls.push({x:i, y:0, move:false, color: WALLCOLOR});
    walls.push({x:i, y: gameHeight - 1, move:false, color: WALLCOLOR});
}
for (var i = 1; i < gameHeight - 1; i++) {
    walls.push({x:0, y:i, move:false, color: WALLCOLOR});
    walls.push({x:gameWidth-1, y:i, move:false, color: WALLCOLOR});
}

var targets = [
    {x:7, y:3, done:false},
    {x:7, y:4, done:false}
]


function drawElement(obj) {
    ctx.fillStyle = obj.color;
    ctx.fillRect(obj.x * tileSize + 1, obj.y * tileSize + 1, tileSize - 2, tileSize - 2);
}

function drawTargets() {
    for (target of targets) {
        ctx.strokeStyle = target.done ? "grey" : "white";
        ctx.lineWidth = "2";
        ctx.beginPath();
        ctx.rect(target.x * tileSize, target.y * tileSize, tileSize, tileSize);
        ctx.stroke();
    }
}

function drawGame() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawTargets();

    drawElement(player);
    for (box of boxes) {
        drawElement(box);
    }
    for (wall of walls) {
        drawElement(wall);
    }
}

function moveObj(obj ,dx, dy) {
    move = obj.move;
    for (box of boxes){
        if (move == false) break;
        if (box != obj && box.x == obj.x + dx && box.y == obj.y +dy ){
            move = moveObj(box, dx, dy);
        }
    }
    for (wall of walls) {
        if (move == false) break;
        if (wall.x == obj.x + dx && wall.y == obj.y + dy) {
            move = false;
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

function gameState() {
    for (target of targets) {
        len = boxes.filter(box => target.x == box.x && target.y == box.y).length
        target.done = len > 0 ? true : false;
    }
    if (targets.filter(t => !t.done).length == 0) {
        console.log("Winner Winner Chickendinner!")
    }
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
    gameState();
    drawGame();
}

window.onload = function() {
    drawGame();
    document.addEventListener('keydown', onKeyDown);
}