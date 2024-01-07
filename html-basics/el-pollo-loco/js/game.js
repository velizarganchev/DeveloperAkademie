let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

window.addEventListener('keydown', (e) => {
    switch (e.code.toLowerCase()) {
        case 'space':
            keyboard.space = true;
            break;
        case 'arrowleft':
            keyboard.arrowleft = true;
            break;
        case 'arrowright':
            keyboard.arrowright = true;
            break;
        case 'arrowup':
            keyboard.arrowup = true;
            break;
        case 'arrowdown':
            keyboard.arrowdown = true;
            break;
        case 'keyd':
            keyboard.keyd = true;
            break;
    }
});

window.addEventListener('keyup', (e) => {

    switch (e.code.toLowerCase()) {
        case 'space':
            keyboard.space = false;
            break;
        case 'arrowleft':
            keyboard.arrowleft = false;
            break;
        case 'arrowright':
            keyboard.arrowright = false;
            break;
        case 'arrowup':
            keyboard.arrowup = false;
            break;
        case 'arrowdown':
            keyboard.arrowdown = false;
            break;
        case 'keyd':
            keyboard.keyd = false;
            break;
    }
})