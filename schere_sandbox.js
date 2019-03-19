const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var paddleY = (canvas.height-paddleHeight);
var paddleX_enemy = (canvas.width-paddleWidth)/2;
var paddleY_enemy = paddleHeight * 3;
var rightPressed = false;
var leftPressed = false;
var New_Color="#0095DD"; //for random
var Enemy_Color="#DD9500";
var Player_Color="#0095DD";
var color_cout_damage; //damage timer
var brickRowCount = 4;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var lives = 3;
var enemyLives = 3;

let bricks = [];  //mass bricks
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: (Math.random()>0.5)? 1 : 0  };
    }
}

class Ball {
    x;
    y;
    ballRadius;
    ballColor;
    ctx = canvas.getContext("2d");
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.ballRadius=10;
        this.ballColor="#0095DD";
    }
    drawBall(x, y, ballRadius, ballColor) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, ballRadius, 0, Math.PI*2);
        this.ctx.fillStyle = ballColor;
        this.ctx.fill();
        this.ctx.closePath();
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
//======================================================================================================================
// AI
//======================================================================================================================
function Enemy_Paddle_Control(target_x) {
    let stupid_brain; //мозг бота
	stupid_brain=0;//Math.floor(Math.random()*50)-50;
	paddleX_enemy = target_x+stupid_brain;
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
    if(relativeX > paddleWidth/2 && relativeX < canvas.width-paddleWidth/2) {
        paddleX = relativeX - paddleWidth/2;
    }
}
//======================================================================================================================
// Draw objects
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
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight * 2, paddleWidth, paddleHeight);
    ctx.fillStyle =Player_Color;//"#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle_enemy() {
    ctx.beginPath();
    ctx.rect(paddleX_enemy, paddleY_enemy, paddleWidth, paddleHeight);
    ctx.fillStyle =Enemy_Color;//"#DD9500";
    ctx.fill();
    ctx.closePath();
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
                    dy = -dy;
                    b.status = 0;
                }
            }
        }
    }
}

function draw(ball) {
    let New_Radius = 10;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawLives();
    drawLives_enemy();
    ball.drawBall( ball.x, ball.y, New_Radius, New_Color);
    drawPaddle();
    drawPaddle_enemy();
    collisionDetection(ball.x, ball.y);
	if (color_cout_damage === 0){
		Enemy_Color="#DD9500";
		Player_Color="#0095DD";
	}
	else {
		color_cout_damage--;
	}

    if(ball.x + dx > canvas.width-ball.ballRadius || ball.x + dx < ball.ballRadius) {
        dx = -dx;
    }
     if(ball.y + dy > canvas.height-ball.ballRadius) {
         lives--;
         if(!lives) {
             alert("GAME OVER");
             document.location.reload();
         }
         else {
	 		Player_Color="#FF0000";
	 		color_cout_damage = 15;
	 		ball.y = paddleY-30+ball.ballRadius;
	 		paddleX = ball.x;
            dx = 2;
            dy = 2;
	 		sleep(10);
         }
     }
     if (ball.y + dy === paddleY-paddleHeight) {
         if (ball.x > paddleX-5 && ball.x < paddleX + paddleWidth) {
             dy = -dy;
             New_Color="#0095DD";
         }
     }
     if(ball.y + dy < ball.ballRadius) {
         enemyLives--;
         if(!enemyLives) {
             alert("YOU WIN");
             document.location.reload();
         }
         else {
	 		Enemy_Color="#FF0000";
	 		color_cout_damage = 15;
            ball.y = paddleY_enemy+30+ball.ballRadius;
	 		paddleX_enemy = ball.x;
            dx = 2;
            dy = 2;
	 		sleep(10);
         }
     }
     if (ball.y + dy === paddleY_enemy+paddleHeight) {
         if (ball.x > paddleX_enemy-5 && ball.x < paddleX_enemy + paddleWidth) {
             dy = -dy;
             New_Color="#DD9500";
         }
     }

    if((rightPressed && paddleX < canvas.width-paddleWidth)) {
        paddleX += 7;
    }
    else if((leftPressed && paddleX > 0)) {
        paddleX -= 7;
    }

	if((paddleX_enemy < canvas.width-paddleWidth)) {
        paddleX_enemy += 7;
    }
    else if((paddleX_enemy > 0)) {
        paddleX_enemy -= 7;
    }

    ball.moveBall(dx,dy);
    Enemy_Paddle_Control(ball.x);
}
//======================================================================================================================
// Main path
//======================================================================================================================
function gameplay() {    //typo javascript costili
    draw(m_ball);
}
//======================================================================================================================
const m_ball = new Ball(canvas.width / 2, canvas.height - 30);
setInterval( gameplay, 10);
delete(m_ball);
//======================================================================================================================