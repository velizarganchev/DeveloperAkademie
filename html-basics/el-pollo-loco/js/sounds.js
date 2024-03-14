// Audioclips für verschiedene Spielsituationen
const start_page_sounds = new Audio('audio/music-start-page-elPolloLoco.mp3');
const level_sound = new Audio('audio/music-levelOne-elPolloLoco.mp3');
const game_over = new Audio('audio/game-over.mp3');
const walking_sound_character = new Audio('audio/walking.mp3');
const hurt_sound_character = new Audio('audio/hurt.mp3');
const sleep_sound_character = new Audio('audio/sleep.mp3');
const take_bottle_sound = new Audio('audio/take-bottle.mp3');
const take_coin_sound = new Audio('audio/take-coin.mp3');
const hurt_chicken_sound = new Audio('audio/hurt-or-dead-chicken.mp3');
const splash_bottle_sound = new Audio('audio/splash-bottle.mp3');
const endboss_start_walking = new Audio('audio/endboss-start-walking.mp3');

/**
 * Behandelt den Soundstatus (Ein/Aus).
 */
function handleSound() {
    sound = !sound;
    localStorage.setItem('sound', JSON.stringify(sound));

    let soundBtn = document.getElementById('sound-btn');
    if (sound) {
        // Spielt den passenden Sound je nach Spielstatus ab
        if (!startGame) {
            start_page_sounds.play();
        } else {
            level_sound.play();
        }
        soundBtn.innerHTML = '<i class="fa-solid fa-volume-off"></i>';
    } else {
        // Pausiert den passenden Sound je nach Spielstatus
        if (!startGame) {
            start_page_sounds.pause();
        } else {
            level_sound.pause();
        }
        soundBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    }
}
