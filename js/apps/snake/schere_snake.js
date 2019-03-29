const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const RED_COLOR = "#FF0000";
const START_PLAYER_COLOR = "#0095DD";
const START_ENEMY_COLOR = "#DD9500";
var New_Color_Player = START_PLAYER_COLOR;

function init_game_sn() {
    var m_ball   = new Ball(canvas.width / 2, canvas.height - 30),
      m_player = new Paddle((canvas.width - PADDLE_WIDTH) / 2, canvas.height - PADDLE_HEIGHT * 3, PADDLE_HEIGHT, PADDLE_WIDTH, "#0095DD"),
      m_enemy  = new Paddle((canvas.width - PADDLE_WIDTH) / 2, PADDLE_HEIGHT * 3, PADDLE_HEIGHT, PADDLE_WIDTH, "#DD9500");
    setInterval(function gamely_sandbox() { draw(m_ball, m_player, m_enemy) }, 10);    
}

function exit_game_sn() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    delete (m_ball);
    delete (m_player);
    delete (m_enemy);
    document.location.reload();
}