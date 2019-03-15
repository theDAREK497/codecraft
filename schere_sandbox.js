var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 7500;
var paddleX = (canvas.width-paddleWidth)/2;
var paddleY = (canvas.height-paddleHeight);
var paddleX_enemy = (canvas.width-paddleWidth)/2;
var paddleY_enemy = paddleHeight * 3;
var rightPressed = false;
var leftPressed = false;
var New_Color="#0095DD"; //для рандома
var brickRowCount = 5;
var brickColumnCount = 7;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var lives = 3;
var enemyLives = 3;

var bricks = [];  //массив кирпичей
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 0 };
    }
}

document.addEventListener("keydown", keyDownHandler, false); //подключение элементов
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
//======================================================================================================================
// Доп. функции
//======================================================================================================================
function Random_Color() {
    var result = 'rgb('
        + (Math.floor(Math.random() * 256)) + ','
        + (Math.floor(Math.random() * 256)) + ','
        + (Math.floor(Math.random() * 256)) + ')';
    return result;
}
//======================================================================================================================
// Управление
//======================================================================================================================
function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}
//======================================================================================================================
// Отрисовка объекта
//======================================================================================================================
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#FF0000";
    ctx.fillText("Your Lives: "+lives, 10, 15);
}
function drawLives_enemy() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#FF0000";
    ctx.fillText("Enemy Lives: "+enemyLives, canvas.width-120, 15);
}
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = New_Color;
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight * 2, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle_enemy() {
    ctx.beginPath();
    ctx.rect(paddleX_enemy, paddleY_enemy, paddleWidth, paddleHeight);
    ctx.fillStyle = "#DD9500";
    ctx.fill();
    ctx.closePath();
}
function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop+canvas.height/3;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#00dd00";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
//======================================================================================================================
// Взаимодействие с окружением
//======================================================================================================================
function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                }
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawLives();
    drawLives_enemy();
    drawBall();
    drawPaddle();
    drawPaddle_enemy();
    collisionDetection();

    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy > canvas.height-ballRadius) {
        lives--;
        if(!lives) {
            alert("GAME OVER");
            document.location.reload();
        }
        else {
            x = canvas.width/2;
            y = canvas.height-30;
            dx = 2;
            dy = -2;
            paddleX = (canvas.width-paddleWidth)/2;
            paddleX_enemy = (canvas.width-paddleWidth)/2;
        }
    }
    if (y + dy == paddleY-paddleHeight-ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
            New_Color="#0095DD";
        }
    }
    if(y + dy < ballRadius) {
        enemyLives--;
        if(!enemyLives) {
            alert("YOU WIN");
            document.location.reload();
        }
        else {
            x = canvas.width/2;
            y = paddleY_enemy+10;
            dx = 2;
            dy = 2;
            paddleX = (canvas.width-paddleWidth)/2;
            paddleX_enemy = (canvas.width-paddleWidth)/2;
        }
    }
    if (y - dy === paddleY_enemy+paddleHeight+ballRadius) {
        if (x > paddleX_enemy && x < paddleX_enemy+paddleWidth) {
            dy = -dy;
            New_Color="#DD9500";
        }
    }

    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;
}
//======================================================================================================================
// Основная часть
//======================================================================================================================
setInterval(draw, 10);