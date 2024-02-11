/**
 * Represents a Chicken enemy in the game, extending the MovableObject class.
 */
class Chicken extends MovableObject {
    y = 370;
    width = 46;
    height = 63;
    currX = 400;
    IMAGES_WALKING = [
        '../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    offset = { top: -10, left: +10, right: +10, bottom: +10 };

    /**
     * Chicken class constructor. Loads initial images, sets initial position, speed, and starts animation.
     */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 800 + Math.random() * 4800;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    /**
     * Initiates continuous animation for chicken movement.
     */
    animate() {
        // Interval for image changes during walking animation.
        setInterval(() => {
            this.animateImg(this.IMAGES_WALKING);
        }, 1000 / 5);

        // Interval for continuous leftward movement.
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}
