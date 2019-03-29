function init_game_sn() {
    var m_snake = new Snake(350, 350, START_PLAYER_COLOR);
    setInterval(function gamely_sandbox() { draw(m_ball, m_player, m_enemy) }, 10);    
}

function exit_game_sn() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    delete (m_ball);
    delete (m_player);
    delete (m_enemy);
    document.location.reload();
}