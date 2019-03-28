// Объект кнопки
function Button(x, y, w, h, state, image, text) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.state = state;
    this.imageShift = 0;
    this.image = image;
    this.text = text;
}

// Функция вывода кнопки
function drawButton(ctx, button) {
    // Выводим изображение кнопки
    ctx.drawImage(button.image, 0, button.imageShift, button.w, button.h, button.x, button.y, button.w, button.h);

    // и текст
    ctx.fillText(button.text, button.x + button.w / 2, 5 + button.y + button.h / 2);
}

// Получаем положение курсора мыши
function getMousePosition(e){
    if (!e){
        var e = window.event;
    } 
    if (e.pageX || e.pageY){
        return new vector2d(e.pageX, e.pageY);
    } else if (e.clientX || e.clientY){
        return new vector2d(e.clientX, e.clientY);
    } 
}

// Внутренние переменные
var canvas, ctx;
var data_width;
var data_height;
var colors = [];
var out_data = [];
var buttons = [];

// Заполняем массив опредленными занчениями
function fill_new_array(len, val) {
    var rv = new Array(len);
    while (--len >= 0) {
        rv[len] = val;
    }
    return rv;
}

// Подготавливаем палитру
function prepare_palette() {
    for (var i = 0; i < 64; ++i) {
        colors[i + 0] = {r: 0, g: 0, b: i << 1, a: i};
        colors[i + 64] = {r: i << 3, g: 0, b: 128 - (i << 2), a: i+64};
        colors[i + 128] = {r: 255, g: i << 1, b: 0, a: i+128};
        colors[i + 192] = {r: 255, g: 255, b: i << 2, a: i+192};
    }
}

// Вывод основной сцены
function drawScene() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Оцистка элемента 

    // Выводим огонь
    var data_cnt = data_width * (data_height - 1);
    for (var i = 0; i < data_width; i++) {
        out_data[data_cnt + i] = (0.6 > Math.random()) ? 255 : 20;
    }
    for (var y = 0; y < 100; y++){
        for (var x = 10; x < data_width - 10; x++){
            var s = data_cnt + x;

            var temp_data = out_data[s] + out_data[s + 1] + out_data[s - 1] + out_data[s - data_width];
            temp_data >>= 2;
            if (temp_data > 1){
                temp_data -= 1;
            }
            temp_data <<= 0;
            
            out_data[s - data_width] = temp_data;
            
            var id = s << 2;
            img_data.data[id + 0] = colors[temp_data].r;
            img_data.data[id + 1] = colors[temp_data].g;
            img_data.data[id + 2] = colors[temp_data].b;
            img_data.data[id + 3] = colors[temp_data].a;
        }
        data_cnt -= data_width;
    }
    ctx.putImageData(img_data, 0, 0);

    // PПодготоваливаем шрифт
    ctx.font = '26px DS-Digital';
    ctx.fillStyle = '#000000';
    ctx.textAlign = "center";

    // Выводим все кнопки
    for (var ib = 0; ib < buttons.length; ib++) { //
        drawButton(ctx, buttons[ib]);
    }
}

// Обработчик события Window Onload
if (window.attachEvent) {
    window.attachEvent('onload', main_init);
} else {
    if(window.onload) {
        var curronload = window.onload;
        var newonload = function() {
            curronload();
            main_init();
        };
        window.onload = newonload;
    } else {
        window.onload = main_init;
    }
}

// Инициализация
function main_init() {

    // Создаем объекты canvas и context
    canvas = document.getElementById('panel');
    ctx = canvas.getContext('2d');

    // Готовим данные для огня и палитру
    img_data = ctx.createImageData(canvas.width, canvas.height);
    data_width = img_data.width,
    data_height = img_data.height,
    prepare_palette();

    // Заполняем новый массив 0
    out_data = fill_new_array(data_width * data_height, 0)

    // Подготавливаем изображения кнопок
    var buttonImage = new Image();
    buttonImage.src = 'images/button.png';
    buttonImage.onload = function() {};

    // Подготавливаем 3 разных кнопки
    buttons.push(new Button(0, 10, 245, 62, 'normal', buttonImage, 'Кнопка #1'));
    buttons.push(new Button(250, 10, 245, 62, 'normal', buttonImage, 'Кнопка #2'));
    buttons.push(new Button(500, 10, 245, 62, 'normal', buttonImage, 'Кнопка #3'));
    buttons.push(new Button(750, 10, 245, 62, 'normal', buttonImage, 'Кнопка #4'));

    // Цикл для основной сцены
    setInterval(drawScene, 40);

    // обработчик события Onmousemove
    canvas.onmousemove = function(e) {
        var mouse = getMousePosition(e).sub(new vector2d(canvas.offsetLeft, canvas.offsetTop));

        for (var i = 0; i < buttons.length; i++) { // Применяем состояние 'hover' для кнопки
            if (buttons[i].state != 'pressed') {
                buttons[i].state = 'normal';
                buttons[i].imageShift = 0;
                if (mouse.x > buttons[i].x && mouse.x < buttons[i].x+buttons[i].w && mouse.y > buttons[i].y && mouse.y < buttons[i].y+buttons[i].h) {
                    buttons[i].state = 'hover';
                    buttons[i].imageShift = 136;
                }
            }
        }
    }

    // Обработчик события Onmousedown
    canvas.onmousedown = function(e) {
        var mouse = getMousePosition(e).sub(new vector2d(canvas.offsetLeft, canvas.offsetTop));

        for (var i = 0; i < buttons.length; i++) { // Применяем состояние 'pressed' для кнопки
            if (mouse.x > buttons[i].x && mouse.x < buttons[i].x+buttons[i].w && mouse.y > buttons[i].y && mouse.y < buttons[i].y+buttons[i].h) {
                buttons[i].state = 'pressed';
                buttons[i].imageShift = 68;
            }
        }
    }

    // Оработчик события Onmouseup
    canvas.onmouseup = function(e) {
        var mouse = getMousePosition(e).sub(new vector2d(canvas.offsetLeft, canvas.offsetTop));

        for (var i = 0; i < buttons.length; i++) { // Сброс состояний кнопки
            if (mouse.x > buttons[i].x && mouse.x < buttons[i].x+buttons[i].w && mouse.y > buttons[i].y && mouse.y < buttons[i].y+buttons[i].h) {
                alert(buttons[i].text + ' нажата.');
            }

            buttons[i].state = 'normal';
            buttons[i].imageShift = 0;
        }
    }
}