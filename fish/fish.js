
var current_keycode = "KeyD";

function keymove(e) {
    current_keycode = e.code;
}
0.
function cmdmove (elem) {
    switch(current_keycode) {
        case   "KeyA":
            move_elem(elem, -10, 0);
            break;
        case   "KeyS":
            move_elem(elem, 0, 10);
            break;
        case   "KeyD":
            move_elem(elem, 10, 0);
            break;
        case   "KeyW":
            move_elem(elem, 0, -10);
            break;
        default:
            console.log(`other key ${e.code}`);
            break;
    }
}

document.addEventListener('keypress', keymove);

function move_elem(elem, dx , dy) {
    elem.style.left = (elem.offsetLeft + dx) + 'px';
    elem.style.top = (elem.offsetTop + dy) + 'px'; 
}

setInterval(move, 400);

function move() {
    var player = document.getElementById("player");

    cmdmove(player);
    randomMove(player);
    perlinMove(player);

    var bubbles = document.querySelectorAll('.bubble');
    for( b of bubbles) {
        perlinMove(b);
    }
}

function randomMove(elem) {
    move_elem(
        elem,
        (Math.random() - 0.5) * 5.0,
        (Math.random() - 0.5) * 5.0);
}

function randomPlace(){
    var wx = document.getElementById("sea").offsetWidth;
    var wy = document.getElementById("sea").offsetHeight;
    document.getElementById("player").style.left =
        Math.floor(wx * Math.random()) + 'px';
    document.getElementById("player").style.top =
    Math.floor(wy * Math.random()) + 'px';
    var n = Math.floor(20.0 + 40.0 * Math.random());
    var s = "";
    for(i = 0; i < n ; i++){
        t = Math.floor(100.0 * Math.random())
        l = Math.floor(100.0 * Math.random())
        s += `<div class="bubble" style="left: ${l}%; top: ${t}%;">o</div>`;
    }
    document.getElementById("food").innerHTML = s;
}


function perlinMove(elem) {
    var wx = document.getElementById("sea").offsetWidth;
    var wy = document.getElementById("sea").offsetHeight;
    var x = elem.offsetLeft;
    var y = elem.offsetTop;

    var dx = Math.sin(x * Math.PI * 2.0 / wx ) +
        Math.sin(0.3 + x * Math.PI * 4.0 / wx ) * 0.2 + 
        Math.sin(0.8 + x * Math.PI * 8.0 / wx ) * 0.4 +
        Math.sin(0.1 + y * Math.PI * 2.0 / wy )* 0.54 +
        Math.sin(0.5 + y * Math.PI * 4.0 / wy ) * 0.3;
   
        var dy = Math.sin(1.2 + x * Math.PI * 2.0 / wx ) +
        Math.sin(0.8 + x * Math.PI * 4.0 / wx ) * 0.2 + 
        Math.sin(0.25 + y * Math.PI * 8.0 / wy ) * 0.74 +
        Math.sin(0.9 + y * Math.PI * 2.0 / wy )* 0.54 +
        Math.sin(0.45 + y * Math.PI * 4.0 / wy ) * 0.8;

        move_elem(elem, dx * 15.0, dy * 15.0);
}

randomPlace();