
function keymove(e) {
    switch(e.code) {
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

  console.log( `key ${e.code}`);
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
