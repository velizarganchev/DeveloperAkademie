/**
 * Represents the end boss in the game, a movable object with specific properties and animations.
 */
class EndBoss extends MovableObject {

    x = 5450;
    width = 250;
    height = 375;
    y = 80;
    IMAGES = [
        '../img/4_enemie_boss_chicken/2_alert/G5.png',
        '../img/4_enemie_boss_chicken/2_alert/G6.png',
        '../img/4_enemie_boss_chicken/2_alert/G7.png',
        '../img/4_enemie_boss_chicken/2_alert/G8.png',
        '../img/4_enemie_boss_chicken/2_alert/G9.png',
        '../img/4_enemie_boss_chicken/2_alert/G10.png',
        '../img/4_enemie_boss_chicken/2_alert/G11.png',
        '../img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    /**
     * Initializes the end boss with the first image in the sequence and loads all images.
     */
    constructor() {
        super().loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.animate();
    }

    /**
     * Animates the end boss by cycling through its images at a specific interval.
     */
    animate() {
        setInterval(() => {
            this.animateImg(this.IMAGES)
        }, 1000 / 5);
    }
}
