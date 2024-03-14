// Konstanten für die IDs der HTML-Elemente
const CANVAS_ID = 'canvas';
const START_BTN_ID = 'start-btn';
const START_PAGE_ID = 'start-page-id';
const TITLE_ID = 'title';

// Referenz auf das HTML-Canvas-Element
let canvas;

// Referenz auf die Spielweltinstanz
let world;

// Keyboard-Objekt zur Handhabung der Benutzereingabe
let keyboard = new Keyboard();

// Flags für den Spielstatus
let startGame = false;
let gameOver = false;
let startPage = false;
let fullScreen = false;
let sound = false;
let showInfo = false;

/**
 * Initialisiert das Spiel durch Abrufen des Canvas-Elements und Erstellen einer neuen Welt.
 */
function initializeGame() {
    canvas = document.getElementById(CANVAS_ID);
    world = new World(canvas, keyboard);

    if (startGame) {
        if (world && gameOver === true) {
            world.resetGame();
            sound = !JSON.parse(localStorage.getItem('sound'));
        }
        handleSound();
        level_sound.volume = 0.2;
    }
}

/**
 * Startet das Spiel, indem die Startseite ausgeblendet und die Initialisierung durchgeführt wird.
 */
function start() {
    // HTML-Element mit der ID 'start-btn' abrufen
    let startBtn = document.getElementById(START_BTN_ID);

    // Deklaration und Initialisierung der Variable startGame
    startGame = true;
    startPage = false;
    sound = false;
    start_page_sounds.pause();

    // Initialisierungsfunktion aufrufen
    initializeGame();

    // Startseite ausblenden
    startBtn.style.display = 'none';
}

/**
 * Startet das Spiel neu, indem Flags zurückgesetzt und die Initialisierung aufgerufen wird.
 */
function restartGame() {
    startGame = true;
    sound = false;
    initializeGame();
}

/**
 * Wechselt zur Startseite zurück, setzt Flags zurück und zeigt den Startknopf an.
 */
function goToStartPage() {
    let startButton = document.getElementById(START_BTN_ID);
    game_over.pause();

    startGame = false;
    gameOver = false;
    startPage = true;

    startButton.style.display = 'block';

    sound = true;
    handleSound();
}

function handleInfo() {
    showInfo = !showInfo;
    let info = document.getElementById('info-div');

    if (showInfo) {
        info.style.display = 'block';
    } else {
        info.style.display = 'none';
    }
}

/**
 * Behandelt den Wechsel in den Vollbildmodus.
 */
function handleFullScreen() {
    // Lokale Variable für den Vollbildmodus umschalten
    fullScreen = !fullScreen;

    // Elemente abrufen
    let canvas = document.getElementById(CANVAS_ID);
    let startPage = document.getElementById(START_PAGE_ID);
    let title = document.getElementById(TITLE_ID);

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
