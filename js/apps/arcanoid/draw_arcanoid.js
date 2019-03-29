function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = RED_COLOR;
    ctx.fillText("Your Lives: "+live_player, 10, 15);
}

function drawArea() {
    ctx.fillStyle = ARCA_BACKGROUND_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = ARCA_WALL_COLOR;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
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