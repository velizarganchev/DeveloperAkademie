/**
 * Represents a small chicken enemy in the game.
 */
class SmallChicken extends MovableObject {
    y = 370;
    heightY = 370;

    /**
     * Acceleration factor for the small chicken.
     */
    acceleration = 0.2;
    
    width = 46;
    height = 63;
    IMAGES_WALKING = [
        '../img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    /**
     * Creates a new instance of the SmallChicken class.
     */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 500 + Math.random() * 4200;
        this.speed = 0.25 + Math.random() * 0.25;
        this.applyGravity();
        this.animate();
    }

    /**
     * Animates the small chicken's movement and flying behavior.
     */
    animate() {
        setInterval(() => {
            this.animateImg(this.IMAGES_WALKING);
        }, 1000 / 10);
        setInterval(() => {
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
        this.speedY = 5 + Math.random() * 2;
    }
}
