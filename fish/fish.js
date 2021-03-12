
var current_keycode = "KeyD";

function keymove(e) {
    current_keycode = e.code;
}

function cmdmove () {
    switch(current_keycode) {
        case   "KeyA":
            move_player(-10, 0);
            break;
        case   "KeyS":
            move_player(0, 10);
            break;
        case   "KeyD":
            move_player(10, 0);
            break;
        case   "KeyW":
            move_player(0, -10);
            break;
        default:
            console.log(`other key ${e.code}`);
            break;
    }
}

document.addEventListener('keypress', keymove);

function move_player(dx , dy) {
    var foo = document.getElementById("player").offsetLeft;
    console.log(foo);
    document.getElementById("player").style.left =
        (document.getElementById("player").offsetLeft + dx) + 'px';
    document.getElementById("player").style.top =
        (document.getElementById("player").offsetTop + dy) + 'px'; 
}

setInterval(move, 400);

function move() {
    cmdmove();
    randomMove();
    perlinMove();
}

function randomMove() {
    move_player(
        (Math.random() - 0.5) * 5.0,
        (Math.random() - 0.5) * 5.0);
}

function perlinMove() {
    var wx = document.getElementById("sea").offsetWidth;
    var wy = document.getElementById("sea").offsetHeight;
    var x = document.getElementById("player").offsetLeft;
    var y = document.getElementById("player").offsetTop;

    var dx = Math.sin(x * Math.PI * 2.0 / wx ) +
        Math.sin(0.3 + x * Math.PI * 4.0 / wx ) * 0.2 + 
        Math.sin(0.8 + x * Math.PI * 8.0 / wx ) * 0.4 +
        Math.sin(0.1 + x * Math.PI * 2.0 / wy )* 0.54 +
        Math.sin(0.5 + x * Math.PI * 4.0 / wy ) * 0.3;
   
        var dy = Math.sin(1.2 + x * Math.PI * 2.0 / wx ) +
        Math.sin(0.8 + x * Math.PI * 4.0 / wx ) * 0.2 + 
        Math.sin(0.25 + y * Math.PI * 8.0 / wy ) * 0.74 +
        Math.sin(0.9 + x * Math.PI * 2.0 / wy )* 0.54 +
        Math.sin(0.45 + x * Math.PI * 4.0 / wy ) * 0.8;

        move_player(dx * 15.0, dy * 15.0);
}
