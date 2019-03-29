var New_Color_Player = START_PLAYER_COLOR;
var New_Color_Enemy = START_ENEMY_COLOR;
var New_Color_Ball = New_Color_Player;
const PADDLE_HEIGHT = 10;
const PADDLE_WIDTH = 75;
var mouse_x;
var dx = 2;
var dy = -2
var rightPressed = false;
var leftPressed = false;
var color_cout_damage; //damage timer
var brickRowCount = 5;
var brickColumnCount = 11;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var live_player = 3;
var Live_enemy = 3;

let bricks = [];  //mass bricks
    for (var c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (var r = 0; r < brickRowCount; r++) {
            bricks[c][r] = {x: 0, y: 0, status: (Math.random() > 0.5) ? 1 : 0};
        }
    }

class Paddle {
        constructor(m_x, m_y, m_height, m_width, New_Color) {
            this.paddleHeight = m_height;
            this.paddleWidth = m_width;
            this.x = m_x;
            this.y = m_y;
            this.paddleColor = New_Color;
        }

        drawPaddle() {
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.paddleWidth, this.paddleHeight);
            ctx.fillStyle = this.paddleColor;
            ctx.fill();
            ctx.closePath();
        }
    }

class Ball {
        constructor(m_x, m_y) {
            this.x = m_x;
            this.y = m_y;
            this.ballRadius = 10;
            this.ballColor = "#0095DD";
        }

        drawBall() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);
            ctx.fillStyle = this.ballColor;
            ctx.fill();
            ctx.closePath();
        }

        moveBall(dx, dy) {
            this.x += dx;
            this.y += dy;
        }
    }