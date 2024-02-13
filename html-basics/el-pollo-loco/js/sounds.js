
const start_page_sounds = new Audio('../audio/music-start-page-elPolloLoco.mp3');
const level_sound = new Audio('../audio/music-levelOne-elPolloLoco.mp3');
const walking_sound = new Audio('../audio/walking.mp3');
const hurt_sound = new Audio('../audio/hurt.mp3');
const sleep_sound = new Audio('../audio/sleep.mp3');

let sound = false;

function handleSound() {
    sound = !sound;
    let soundBtn = document.getElementById('sound-btn');

    if (sound) {
        start_page_sounds.play();
        soundBtn.innerHTML = '<i class="fa-solid fa-volume-off"></i>'
    } else {
        start_page_sounds.pause();
        soundBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>'
    }

}