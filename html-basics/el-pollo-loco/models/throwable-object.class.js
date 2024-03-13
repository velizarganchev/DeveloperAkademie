/**
 * Represents a throwable object, such as a salsa bottle, in the game.
 */
class ThrowableObject extends MovableObject {
    /**
     * Indicates whether the throwable object is broken.
     */
    isBroken = false;
    isCollidingWhithEnemy = false;
    width = 80;
    height = 80;
    direction;
    /**
     * Collection of images representing the rotation of the throwable object.
     */
    IMAGES_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    /**
     * Collection of images representing the splash effect when the throwable object breaks.
     */
    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    /**
     * Offset values for positioning the throwable object within the game.
     */
    // offset = { top: +40, left: +40, right: +20, bottom: +40 };

    /**
     * Creates a new instance of the ThrowableObject class.
     * @param {number} x - The initial x-coordinate of the throwable object.
     * @param {number} y - The initial y-coordinate of the throwable object.
     */
    constructor(x, y, direction) {
        super().loadImage(this.IMAGES_ROTATION[0]);
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.trow();
    }

    /**
     * Initiates the throwing action for the throwable object.
     */
    trow() {
        this.speedY = 30;
        this.applyGravity();

        let moveInterval = setInterval(() => {
            if (!this.direction) {
                this.x += 7;
            } else {
                this.x -= 7;
            }
        }, 25);

        let trowBottleInterval = setInterval(() => {
            splash_bottle_sound.pause()
            if (this.isAboveGround() && !this.isCollidingWhithEnemy) {
                this.animateImg(this.IMAGES_ROTATION);
            } else if (!this.isAboveGround() || this.isCollidingWhithEnemy) {
                this.animateImg(this.IMAGES_SPLASH);
                splash_bottle_sound.play();
                this.isBroken = true;
                clearInterval(moveInterval);
                clearInterval(trowBottleInterval);
            }
        }, 1000 / 20);
    }
}
