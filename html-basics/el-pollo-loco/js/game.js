/**
 * Reference to the HTML canvas element.
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * Reference to the game world instance.
 * @type {World}
 */
let world;

/**
 * Keyboard object to handle user input.
 * @type {Keyboard}
 */
let keyboard = new Keyboard();

/**
 * Initializes the game by obtaining the canvas element and creating a new world.
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

/**
 * Event listener for handling keydown events and updating the corresponding properties in the keyboard object.
 * @param {KeyboardEvent} e - The keydown event object.
 */
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

/**
 * Event listener for handling keyup events and updating the corresponding properties in the keyboard object.
 * @param {KeyboardEvent} e - The keyup event object.
 */
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
});
