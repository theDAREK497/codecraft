var drawModule_snake = (function () {

    var bodySnake = function(x, y) {
        ctx.shadowBlur = 2;
        ctx.shadowColor = SNAKE_BODY_COLOR;
        ctx.fillStyle = SNAKE_BODY_COLOR;
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
        ctx.strokeStyle = SNAKE_SKIN_COLOR;        
        ctx.strokeRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
    };

    var apple = function(x, y) {        
        if (count_blur_apple_up) {
            count_blur_apple++;
            if (count_blur_apple >= 20) {
               count_blur_apple_up=false; 
            }
        }      
        else {
            count_blur_apple--;
            if (count_blur_apple <= 2) {
               count_blur_apple_up=true; 
            }
        }
        ctx.shadowBlur = count_blur_apple;
        ctx.shadowColor = RED_COLOR;
        ctx.fillStyle = FOOD_AURA_COLOR;
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
        ctx.fillStyle = FOOD_COLOR;
        ctx.fillRect(x*snakeSize+1, y*snakeSize+1, snakeSize-2, snakeSize-2);
    };

    var terrain = function(x, y) {
        ctx.shadowBlur = 2;
        ctx.shadowColor = ROCK_AURA_COLOR;
        ctx.fillStyle = ROCK_AURA_COLOR;
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
        ctx.fillStyle = ROCK_COLOR;
        ctx.fillRect(x*snakeSize+1, y*snakeSize+1, snakeSize-2, snakeSize-2);
    };

    var scoreText = function() {
        ctx.shadowBlur = 0;
        var score_text = "Score: " + score;
        ctx.fillStyle = RED_COLOR;
        ctx.fillText(score_text, 10, 15);
    };

    var drawSnake = function() {
        var length = 4;
        snake = [];
        for (var i = length-1; i>=0; i--) {
            snake.push({x:i, y:0});
        }
    };

    var paint = function(){
        ctx.shadowBlur = 0;
        ctx.fillStyle = SNAK_BACKGROUND_COLOR;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = SNAK_WALL_COLOR;
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        var snakeX = snake[0].x;
        var snakeY = snake[0].y;

        if (direction === 'right') {
            snakeX++; }
        else if (direction === 'left') {
            snakeX--; }
        else if (direction === 'up') {
            snakeY--;
        } else if(direction === 'down') {
            snakeY++; }

        if (snakeX === -1 || snakeX === canvas.width/snakeSize || snakeY === -1 || snakeY === canvas.height/snakeSize || checkCollision(snakeX, snakeY, snake)) {
            //restart game 
            ctx.clearRect(0,0,canvas.width,canvas.height);
            gameloop = clearInterval(gameloop);
            alert("GAME OVER");
            document.location.reload();
            return;
        }

        for (var j = dif_terra-1; j>=0; j--) {   
            if (snakeX === terraland[j].x && snakeY === terraland[j].y) {
                //restart game 
               ctx.clearRect(0,0,canvas.width,canvas.height);
               gameloop = clearInterval(gameloop);
               alert("GAME OVER");
               document.location.reload();
               return;
            }
        }

        if(snakeX === food.x && snakeY === food.y) {
            tail = {x: snakeX, y: snakeY}; //Create a new head instead of moving the tail
            score ++;

            createFood(); //Create new food
        } else {
            tail = snake.pop(); //pops out the last cell
            tail.x = snakeX;
            tail.y = snakeY;
        }
        //The snake can now eat the food.
        snake.unshift(tail); //puts back the tail as the first cell

        for(var i = 0; i < snake.length; i++) {
            bodySnake(snake[i].x, snake[i].y);
        }        

        for (var j = dif_terra-1; j>=0; j--) {    
            terrain(terraland[j].x, terraland[j].y);
        }

        apple(food.x, food.y);
        scoreText();
    };

    var createFood = function() {
        food = {
            x: Math.floor((Math.random() * (canvas.width /10-1)) + 1),
            y: Math.floor((Math.random() * (canvas.height/10-1)) + 1)
        };

        for (var i=0; i>snake.length; i++) {
            var snakeX = snake[i].x;
            var snakeY = snake[i].y;

            if (food.x===snakeX && food.y === snakeY || food.y === snakeY && food.x===snakeX) {
                food.x = Math.floor((Math.random() * (canvas.width /10-1)) + 1);
                food.y = Math.floor((Math.random() * (canvas.height/10-1)) + 1);
                for (var j = dif_terra-1; j>=0; j--) {
                    if (food.x===terraland[j].x && food.y === terraland[j].y || food.y === terraland[j].y && food.x===terraland[j].x) {
                         food.x = Math.floor((Math.random() * (canvas.width /10-1)) + 1);
                         food.y = Math.floor((Math.random() * (canvas.height/10-1)) + 1);
                    }
                }
            }
        }
    };

    var createTerrain = function() {
        terraland = [];
        for (var j = dif_terra-1; j>=0; j--) {       
                terraland[j] = {
                  x: Math.floor((Math.random() * (canvas.width /10-1)) + 1),
                  y: Math.floor((Math.random() * (canvas.height/10-1)) + 1)
                };
            for (var i=0; i>snake.length; i++) {
               var snakeX = snake[i].x;
               var snakeY = snake[i].y;
               if (terraland[j].x===snakeX && terraland[j].y === snakeY || terraland[j].y === snakeY && terraland[j].x===snakeX) {
                   terraland[j].x = Math.floor((Math.random() * (canvas.width /10-1)) + 1);
                   terraland[j].y = Math.floor((Math.random() * (canvas.height/10-1)) + 1);
                   if (terraland[j].x===food.x && terraland[j].y === food.y || terraland[j].y === food.y && terraland[j].x===food.x) {
                         terraland[j].x = Math.floor((Math.random() * (canvas.width /10-1)) + 1);
                         terraland[j].y = Math.floor((Math.random() * (canvas.height/10-1)) + 1);
                   }
               }
           }
        }
    };

    var checkCollision = function(x, y, array) {
        for(var i = 0; i < array.length; i++) {
            if(array[i].x === x && array[i].y === y)
                return true;
        }
        return false;
    };

    var init = function(snake){
        direction = 'down';        
        drawSnake();
        createFood();
        createTerrain();
        gameloop = setInterval(paint, inter_time);
    };


    return {
        init : init
    };


}());
