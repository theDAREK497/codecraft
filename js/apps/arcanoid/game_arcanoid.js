//======================================================================================================================
// Functions
//======================================================================================================================
/**
 * @return {string}
 */
function Random_Color() {
    return 'rgb('
        + (Math.floor(Math.random() * 256)) + ','
        + (Math.floor(Math.random() * 256)) + ','
        + (Math.floor(Math.random() * 256)) + ')';
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
//======================================================================================================================
// Control
//======================================================================================================================
document.addEventListener("keydown", keyDownHandler, false); //connect elements
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

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
    mouse_x = e.clientX - canvas.offsetLeft;
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
    let New_Radius = 8;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawArea();
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
            (player.x + player.paddleWidth/2 < mouse_x - 4 || player.x + player.paddleWidth/2 > mouse_x + 4) &&         // Crazy paddle don't lags!!!                   //
            (mouse_x > 0 && mouse_x < canvas.width))) {                                                                 // Mouse in playable zone                       //
        player.x += 7;                                                                                                  // Move paddle to right                         //
    }                                                                                                                   //==============================================//
    else if ((leftPressed && player.x > 0) ||                                                                           // Left arrow key pressed = true                //
        ((mouse_x < player.x + player.paddleWidth/2 && player.x > 0) &&                                                 // Mouse to the left of the paddle.             //
            (player.x + player.paddleWidth/2 < mouse_x - 4 || player.x + player.paddleWidth/2 > mouse_x + 4) &&         // Crazy paddle...                              //
            (mouse_x > 0 && mouse_x < canvas.width))) {                                                                 // Mouse in playable zone                       //
        player.x -= 7;                                                                                                  // Move paddle to left                          //
    }                                                                                                                   //==============================================//
                                                                                                                        // Enemy AI v1.0                                //
    if ((ball.x > enemy.x + enemy.paddleWidth/2 && enemy.x < canvas.width-enemy.paddleWidth) &&                         // Find ball                                    //
        (enemy.x + enemy.paddleWidth/2 < ball.x - 2 || enemy.x + enemy.paddleWidth/2 > ball.x + 2)) {                   // Blind area                                   //
        enemy.x += 4;                                                                                                   // Move AI right                                //
    }                                                                                                                   //==============================================//
    else if((ball.x < enemy.x + enemy.paddleWidth/2 && enemy.x > 0) &&                                                  // This is the same for moving to the left      //
        (enemy.x + enemy.paddleWidth/2 < ball.x - 2 || enemy.x + enemy.paddleWidth/2 > ball.x + 2)) {                   //==============================================//
        enemy.x -= 4;
    }
    
    ball.moveBall(dx,dy);
}
//======================================================================================================================
// Main path
//======================================================================================================================
function init_game_arc() {
    m_btn_ar_st.disabled = true;
    m_btn_ar_ex.disabled = false;
    m_btn_sn_st.disabled = true;
    m_btn_sn_ex.disabled = true;


    var m_ball   = new Ball(canvas.width / 2, canvas.height - 30),
      m_player = new Paddle((canvas.width - PADDLE_WIDTH) / 2, canvas.height - PADDLE_HEIGHT * 3, PADDLE_HEIGHT, PADDLE_WIDTH, "#0095DD"),
      m_enemy  = new Paddle((canvas.width - PADDLE_WIDTH) / 2, PADDLE_HEIGHT * 3, PADDLE_HEIGHT, PADDLE_WIDTH, "#DD9500");
    setInterval(function gamely_sandbox() { draw(m_ball, m_player, m_enemy) }, 10);    
}

function exit_game_arc() {
    m_btn_ar_st.disabled = false;
    m_btn_ar_ex.disabled = true;
    m_btn_sn_st.disabled = false;
    m_btn_sn_ex.disabled = true;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    delete (m_ball);
    delete (m_player);
    delete (m_enemy);
    document.location.reload();
}