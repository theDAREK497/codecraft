(function (window, document, drawModule_snake, undefined) {   //controls

    document.onkeydown = function(event) {

        keyCode = window.event.keyCode;
        keyCode = event.keyCode;

        switch(keyCode) {

            case 37:
                if (direction !== 'right') {
                    direction = 'left';
                }
                console.log('left');
                break;

            case 39:
                if (direction !== 'left') {
                    direction = 'right';
                    console.log('right');
                }
                break;

            case 38:
                if (direction !== 'down') {
                    direction = 'up';
                    console.log('up');
                }
                break;

            case 40:
                if (direction !== 'up') {
                    direction = 'down';
                    console.log('down');
                }
                break;
        }
    }


})(window, document, drawModule_snake);

function init_game_sn() {
    dif_r = document.querySelector('input[name = radios]:checked').value;    
    switch(dif_r) {
        case 'easy': 
            inter_time=100;
            dif_terra=5;
            break;
        case 'normal':  
            inter_time=80;
            dif_terra=20;
            break;  
        case 'hard':  
            inter_time=60;
            dif_terra=40;
            break;
        default:
            inter_time=80;
            dif_terra=20;
            break;
    };
    m_btn_ar_st.disabled = true;
    m_btn_ar_ex.disabled = true;
    m_btn_sn_st.disabled = true;
    m_btn_sn_ex.disabled = false;
    drawModule_snake.init();
}

function exit_game_sn() {
    m_btn_ar_st.disabled = false;
    m_btn_ar_ex.disabled = true;
    m_btn_sn_st.disabled = false;
    m_btn_sn_ex.disabled = true;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.location.reload();
}