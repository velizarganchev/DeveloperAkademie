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


let startGame = false;

let fullScreen = false;

/**
 * Initializes the game by obtaining the canvas element and creating a new world.
 */
function init() {
    canvas = document.getElementById('canvas');
    if (startGame) {
        world = new World(canvas, keyboard);
        handleSound();
        level_sound.volume = 0.2;
    }
}

/**
 * Initiates the game by hiding the start page and performing initialization.
 */
function start() {
    // Retrieve the HTML element with the ID 'start-page-id'
    let startBtn = document.getElementById('start-btn');

    // Declaration and initialization of the variable startGame
    startGame = true;

    // Call the initialization function
    init();

    // Hide the start page
    startBtn.style.display = 'none';
}

function handleFullScreen() {
    fullScreen = !fullScreen;

    let canvas = document.getElementById('canvas');
    let startPage = document.getElementById('start-page-id');
    let title = document.getElementById('title');

    if (fullScreen) {
        title.style.display = 'none';
        canvas.style.width = '100vw';
        canvas.style.height = '100vh';
        canvas.style.backgroundSize = '100vw 100vh';
        canvas.style.borderRadius = '0px'
        startPage.style.width = '100vw';
        startPage.style.height = '100vh';
        startPage.style.borderRadius = '0px';
    } else {
        title.style.display = 'block';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.borderRadius = '10px'
        canvas.style.backgroundSize = '720px 480px';
        startPage.style.width = '720px';
        startPage.style.height = '480px';
        startPage.style.borderRadius = '10px';
    }

}

