/**
 * Represents a Chicken enemy in the game, extending the MovableObject class.
 */
class Chicken extends MovableObject {
    id;
    y = 330;
    width = 80;
    height = 100;
    currX = 400;
    offset = { top: -10, left: +10, right: +10, bottom: +10 };
    walking;
    move;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGES_DEAD = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

    /**
     * Chicken class constructor. Loads initial images, sets initial position, speed, and starts animation.
     */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.id = (Math.random() * 1000).toFixed(0);
        this.x = 800 + Math.random() * 4800;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    /**
     * Initiates continuous animation for chicken movement.
     */
    animate() {
        // Interval for image changes during walking animation.
        this.walking = setInterval(() => {
            this.animateImg(this.IMAGES_WALKING);
        }, 1000 / 5);

        // Interval for continuous leftward movement.
        this.move = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }

    dead() {
        this.stopIntervals();
        this.animateImg(this.IMAGES_DEAD);

    }

    stopIntervals() {
        clearInterval(this.walking);
        clearInterval(this.move);
        // Sound
    }
}
