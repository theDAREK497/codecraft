const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const RED_COLOR ="#FF0000";
const START_PLAYER_COLOR = "#0095DD";
const START_ENEMY_COLOR = "#DD9500";
var New_Color_Player=START_PLAYER_COLOR;
var New_Color_Enemy=START_ENEMY_COLOR;
var New_Color_Ball=New_Color_Player;
const PADDLE_HEIGHT=10;
const PADDLE_WIDTH=75;
var mouse_x;
var dx = 2;
var dy = -2;
var rightPressed = false;
var leftPressed = false;
var color_cout_damage; //damage timer
var brickRowCount = 4;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var live_player = 3;
var Live_enemy = 3;

let bricks = [];  //mass bricks
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: (Math.random()>0.5)? 1 : 0  };
    }
}

class Paddle {
    constructor(m_x, m_y, m_height, m_width, New_Color)
    {
        this.paddleHeight = m_height;
        this.paddleWidth = m_width;
        this.x = m_x;
        this.y = m_y;
        this.paddleColor=New_Color;
    }
    drawPaddle() {
        ctx.beginPath();
        ctx.rect(this.x, this.y , this.paddleWidth, this.paddleHeight);
        ctx.fillStyle =this.paddleColor;
        ctx.fill();
        ctx.closePath();
    }
}

class Ball {
    constructor(m_x, m_y) {
        this.x = m_x;
        this.y = m_y;
        this.ballRadius=10;
        this.ballColor="#0095DD";
    }
    drawBall() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI*2);
        ctx.fillStyle = this.ballColor;
        ctx.fill();
        ctx.closePath();
    }
    moveBall(dx, dy){
        this.x += dx;
        this.y += dy;
    }
}

document.addEventListener("keydown", keyDownHandler, false); //connect elements
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
//======================================================================================================================
// Functions
//======================================================================================================================
/**
 * @return {string}
 */
function Random_Color() {
    let result = 'rgb('
        + (Math.floor(Math.random() * 256)) + ','
        + (Math.floor(Math.random() * 256)) + ','
        + (Math.floor(Math.random() * 256)) + ')';
    return result;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
//======================================================================================================================
// Control
//======================================================================================================================
function keyDownHandler(e) {
    if(e.keyCode === 39) {
        rightPressed = true;
    }
    else if(e.keyCode === 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode === 39) {
        rightPressed = false;
    }
    else if(e.keyCode === 37) {
        leftPressed = false;
    }
}
function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    // if(relativeX > PADDLE_WIDTH/2 && relativeX < canvas.width-PADDLE_WIDTH/2) {
    //     mouse_x = relativeX - PADDLE_WIDTH/2;
    // }
    mouse_x = relativeX;
}
//======================================================================================================================
// Draw objects
//======================================================================================================================
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = RED_COLOR;
    ctx.fillText("Your Lives: "+live_player, 10, 15);
}
function drawLives_enemy() {
    ctx.font = "16px Arial";
    ctx.fillStyle = RED_COLOR;
    ctx.fillText("Enemy Lives: "+Live_enemy, canvas.width-120, 15);
}

function drawBricks() {
    for(let c=0; c<brickColumnCount; c++) {
        for(let r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status === 1) {
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
// Environment
//======================================================================================================================
function collisionDetection(x,y) {
    for(let c=0; c<brickColumnCount; c++) {
        for(let r=0; r<brickRowCount; r++) {
            let b = bricks[c][r];
            if(b.status === 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy *= -1;
                    if (dx < 0 && (x % 32 < 10 || x % 32 > 22)) dx *= -1;
                    if (dx > 0 && ((x + 12) % 32 < 10 || (x + 12) % 32 > 22)) dx *= -1;
                    b.status = 0;
                }
            }
        }
    }
}

function draw(ball, player, enemy) {
<<<<<<< HEAD
    let New_Radius = 8;
=======
    let New_Radius = 10;
>>>>>>> 7dc6ab7eaf067c4cf24f458b1a9cc592f5976b1d
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawLives();
    drawLives_enemy();
    ball.ballRadius=New_Radius;
    ball.ballColor=New_Color_Ball;
    enemy.paddleColor=New_Color_Enemy;
    player.paddleColor=New_Color_Player;
    ball.drawBall();
    player.drawPaddle();
    enemy.drawPaddle();
    collisionDetection(ball.x, ball.y);

    if (color_cout_damage === 0){
        New_Color_Enemy=START_ENEMY_COLOR;
        New_Color_Player=START_PLAYER_COLOR;
    }
    else {
        color_cout_damage--;
    }

    if(ball.x + dx > canvas.width-ball.ballRadius || ball.x + dx < ball.ballRadius) {
        dx *= -1;
    }
    if(ball.y + dy > canvas.height-ball.ballRadius) {
        live_player--;
        if(!live_player) {
            alert("GAME OVER");
            document.location.reload();
        }
        else {
            New_Color_Player=RED_COLOR;
            New_Color_Ball=RED_COLOR;
            color_cout_damage = 15;
            ball.y = player.y-30+ball.ballRadius;
            player.x = ball.x;
            dx = 2;
            dy = -2;
            sleep(30);
        }
    }
    if ((ball.y + dy === player.y) || (ball.y + dy === player.y + player.height)) {
<<<<<<< HEAD
        if (ball.x > player.x - 8 && ball.x < player.x + player.paddleWidth + 8) {
            dy *= -1;
            if (ball.x <= player.x + 2) {
                dx = -5;
            }
            else if (ball.x >= player.x + player.paddleWidth - 2) {
                dx = 5;
            }
            else if (ball.x <= player.x + 15) {
                dx = 3;
            }
            else if (ball.x >= player.x + player.paddleWidth - 15) {
                dx = -3;
=======
        if (ball.x > player.x - 5 && ball.x < player.x + player.paddleWidth + 5) {
            dy *= -1;
            if (ball.x <= player.x + 15) {
                dx = -6;
            }
            else if (ball.x >= player.x + player.paddleWidth - 15) {
                dx = 6;
>>>>>>> 7dc6ab7eaf067c4cf24f458b1a9cc592f5976b1d
            }
            else if (Math.abs(dx) === 6) {
                dx = (dx * 2 / 3) | 0;
            }
            New_Color_Ball=New_Color_Player;
        }
    }
    if(ball.y + dy < ball.ballRadius) {
        Live_enemy--;
        if(!Live_enemy) {
            alert("YOU WIN");
            document.location.reload();
        }
        else {
            New_Color_Enemy=RED_COLOR;
            New_Color_Ball=RED_COLOR;
            color_cout_damage = 15;
            ball.y = enemy.y+30+ball.ballRadius;
            enemy.x = ball.x;
            dx = 2;
            dy = 2;
            sleep(30);
        }
    }
<<<<<<< HEAD
    if (ball.y -  ball.ballRadius + dy === enemy.y) {
        if (ball.x > enemy.x - 8 && ball.x < enemy.x + 8 + enemy.paddleWidth) {
            dy *= -1;
            if (ball.x <= enemy.x + 2) {
                dx = -5;
            }
            else if (ball.x >= enemy.x + enemy.paddleWidth - 2) {
                dx = 5;
            }
            else if (ball.x <= enemy.x + 15) {
                dx = 3;
            }
            else if (ball.x >= enemy.x + enemy.paddleWidth - 15) {
                dx = -3;
=======
    if ((ball.y + dy === enemy.y) || (ball.y + dy === enemy.y + enemy.height)) {
        if (ball.x > enemy.x - 5 && ball.x < enemy.x + 5 + enemy.paddleWidth) {
            dy *= -1;
            if (ball.x <= enemy.x + 15) {
                dx = -6;
            }
            else if (ball.x >= enemy.x + enemy.paddleWidth - 15) {
                dx = 6;
>>>>>>> 7dc6ab7eaf067c4cf24f458b1a9cc592f5976b1d
            }
            else if (Math.abs(dx) === 6) {
                dx = (dx * 2 / 3) | 0;
            }
            New_Color_Ball=New_Color_Enemy;
        }
    }                                                                                                                   //==============================================//
                                                                                                                        // Sorry for this govnocode                     //
    if((rightPressed && player.x < canvas.width-player.paddleWidth) ||                                                  // Right arrow key pressed = true               //
        ((mouse_x > player.x + player.paddleWidth/2 && player.x < canvas.width-player.paddleWidth) &&                   // Mouse to the right of the paddle.            //
<<<<<<< HEAD
            (player.x + player.paddleWidth/2 < mouse_x - 4 || player.x + player.paddleWidth/2 > mouse_x + 4) &&         // Crazy paddle don't lags!!!                   //
=======
        (player.x + player.paddleWidth/2 < mouse_x - 4 || player.x + player.paddleWidth/2 > mouse_x + 4) &&             // Crazy paddle don't lags!!!                   //
>>>>>>> 7dc6ab7eaf067c4cf24f458b1a9cc592f5976b1d
            (mouse_x > 0 && mouse_x < canvas.width))) {                                                                 // Mouse in playable zone                       //
        player.x += 7;                                                                                                  // Move paddle to right                         //
    }                                                                                                                   //==============================================//
    else if ((leftPressed && player.x > 0) ||                                                                           // Left arrow key pressed = true                //
        ((mouse_x < player.x + player.paddleWidth/2 && player.x > 0) &&                                                 // Mouse to the left of the paddle.             //
<<<<<<< HEAD
            (player.x + player.paddleWidth/2 < mouse_x - 4 || player.x + player.paddleWidth/2 > mouse_x + 4) &&         // Crazy paddle...                              //
=======
        (player.x + player.paddleWidth/2 < mouse_x - 4 || player.x + player.paddleWidth/2 > mouse_x + 4) &&             // Crazy paddle...                              //
>>>>>>> 7dc6ab7eaf067c4cf24f458b1a9cc592f5976b1d
            (mouse_x > 0 && mouse_x < canvas.width))) {                                                                 // Mouse in playable zone                       //
        player.x -= 7;                                                                                                  // Move paddle to left                          //
    }                                                                                                                   //==============================================//
                                                                                                                        // Enemy AI v1.0                                //
    if ((ball.x > enemy.x + enemy.paddleWidth/2 && enemy.x < canvas.width-enemy.paddleWidth) &&                         // Find ball                                    //
        (enemy.x + enemy.paddleWidth/2 < ball.x - 2 || enemy.x + enemy.paddleWidth/2 > ball.x + 2)) {                   // Blind area                                   //
<<<<<<< HEAD
        enemy.x += 4;                                                                                                   // Move AI right                                //
    }                                                                                                                   //==============================================//
    else if((ball.x < enemy.x + enemy.paddleWidth/2 && enemy.x > 0) &&                                                  // This is the same for moving to the left      //
        (enemy.x + enemy.paddleWidth/2 < ball.x - 2 || enemy.x + enemy.paddleWidth/2 > ball.x + 2)) {                   //==============================================//
        enemy.x -= 4;
=======
        enemy.x += 5;                                                                                                   // Move AI right                                //
    }                                                                                                                   //==============================================//
    else if((ball.x < enemy.x + enemy.paddleWidth/2 && enemy.x > 0) &&                                                  // This is the same for moving to the left      //
        (enemy.x + enemy.paddleWidth/2 < ball.x - 2 || enemy.x + enemy.paddleWidth/2 > ball.x + 2)) {                   //==============================================//
        enemy.x -= 5;
>>>>>>> 7dc6ab7eaf067c4cf24f458b1a9cc592f5976b1d
    }

    ball.moveBall(dx,dy);
}
//======================================================================================================================
// Main path
//======================================================================================================================
function gamely_sandbox() {    //typo javascript costili
    draw(m_ball, m_player, m_enemy);
}
//======================================================================================================================
let m_ball = new Ball(canvas.width / 2, canvas.height - 30);
<<<<<<< HEAD
let m_player = new Paddle((canvas.width-PADDLE_WIDTH)/2, canvas.height - PADDLE_HEIGHT * 3, PADDLE_HEIGHT, PADDLE_WIDTH, "#0095DD");
=======
let m_player = new Paddle((canvas.width-PADDLE_WIDTH)/2, canvas.height - PADDLE_HEIGHT * 3, PADDLE_HEIGHT,PADDLE_WIDTH, "#0095DD");
>>>>>>> 7dc6ab7eaf067c4cf24f458b1a9cc592f5976b1d
let m_enemy = new Paddle((canvas.width-PADDLE_WIDTH)/2, PADDLE_HEIGHT * 3, PADDLE_HEIGHT, PADDLE_WIDTH, "#DD9500");
setInterval( gamely_sandbox, 10);
delete(m_ball);
delete(m_player);
delete(m_enemy);
//======================================================================================================================