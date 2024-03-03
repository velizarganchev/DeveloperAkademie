/**
 * Represents the end boss in the game, a movable object with specific properties and animations.
 */
class EndBoss extends MovableObject {
    id;
    x = 5450;
    width = 250;
    height = 375;
    y = 80;
    energy = 100;
    startWalking = false;
    firstAttack = false;
    healthStatusBar = false;
    speed = 20;

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];
    IMAGES_WALK = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    /**
     * Initializes the end boss with the first image in the sequence and loads all images.
     */
    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DEAD);
        this.id = 22 + (Math.random() * 1000).toFixed(0);
        this.animate();
    }

    /**
     * Animates the end boss by cycling through its images at a specific interval.
     */
    animate() {
        this.endBossImagesInterval = setInterval(() => {
            if (this.isHurt()) {
                this.animateImg(this.IMAGES_HURT);
            } else if (this.isDead()) {
                this.animateImg(this.IMAGES_DEAD);
            } else if (this.startWalking) {
                endboss_start_walking.play();
                endboss_start_walking.volume = 0.1;
                this.moveLeft();
            } else if (this.firstAttack) {
                this.attack();
            } else {
                this.animateImg(this.IMAGES_ALERT);
            }
        }, 1000 / 5);
    }

    /**
     * Moves the end boss to the left and plays the walking animation.
     */
    moveLeft() {
        super.moveLeft();
        this.animateImg(this.IMAGES_WALK);
    }

    /**
     * Plays the attack animation.
     */
    attack() {
        this.animateImg(this.IMAGES_ATTACK);
    }

    /**
     * Plays the dead animation, stops intervals, and handles any cleanup.
     */
    dead() {
        this.animateImg(this.IMAGES_DEAD);
        this.stopIntervals();
    }

    /**
     * Stops all intervals related to the end boss animations.
     */
    stopIntervals() {
        clearInterval(this.endBossImagesInterval);
    }
}
