/**
 * Represents a small chicken enemy in the game.
 */
class SmallChicken extends MovableObject {
    id;
    y = 360;
    heightY = 350;
    /**
     * Acceleration factor for the small chicken.
     */
    acceleration = 0.2;

    width = 60;
    height = 80;
    offset = { top: -10, left: +5, right: +15, bottom: -50 };

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGES_DEAD = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];

    /**
     * Creates a new instance of the SmallChicken class.
     */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.id = (Math.random() * 1000).toFixed(0);
        this.x = 500 + Math.random() * 4200;
        this.speed = 0.25 + Math.random() * 0.25;
        this.applyGravity();
        this.animate();
    }

    /**
     * Animates the small chicken's movement and flying behavior.
     */
    animate() {
        this.walking = setInterval(() => {
            this.animateImg(this.IMAGES_WALKING);
        }, 1000 / 10);
        this.move = setInterval(() => {
            this.moveLeft();
            if (!this.isAboveGround()) {
                this.fly();
            }
        }, 1000 / 30);
    }

    /**
     * Simulates the flying behavior of the small chicken.
     */
    fly() {
        this.speedY = 3 + Math.random() * 2;
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
