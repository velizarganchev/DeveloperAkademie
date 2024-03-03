/**
 * Represents a movable object in the game that extends the basic drawable object.
 */
class MovableObject extends DrawableObject {
    /**
     * Index used for animation frames.
     */
    index = 0;

    /**
     * Speed of the movable object.
     */
    speed = 0.15;

    /**
     * Flag indicating the direction of movement.
     */
    otherDirection = false;

    /**
     * Vertical speed of the movable object.
     */
    speedY = 0;

    /**
     * Height of the object when above the ground.
     */
    heightY = 200;

    /**
     * Acceleration value for applying gravity.
     */
    acceleration = 2.5;

    /**
     * Energy level of the movable object.
     */
    energy = 100;

    /**
     * Timestamp of the last hurt moment.
     */
    lastHurt = 0;

    spliceble = false;

    /**
     * Offset values for positioning the movable object within the game.
     */
    offsety = 0;   //!!!!!!!!
    offset = { top: 0, left: 0, right: 0, bottom: 0 };

    /**
     * Applies gravity to the movable object, making it fall or rise.
     */
    applyGravity() {
        let applyGravityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is above the ground based on its type.
     * @returns {boolean} - True if the object is above the ground, false otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return this.y < 350;
        }
        return this.y < this.heightY;
    }

    /**
     * Moves the object to the right.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Animates the object using a set of images.
     * @param {string[]} images - Array of image paths for animation frames.
     */
    animateImg(images) {
        let i = this.index % images.length;
        let key = images[i];
        this.img = this.imageCash[key];
        this.index++;
    }

    /**
     * Checks if the object is colliding with another movable object.
     * @param {MovableObject} mo - The other movable object.
     * @returns {boolean} - True if there is a collision, false otherwise.
     */
    isColliding(mo) {
        return (
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
        );
    }

    /**
     * Handles a hit event, reducing the energy level of the object.
     */
    hit(hitIndex) {
        this.energy -= hitIndex;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHurt = new Date().getTime();
        }
    }

    /**
     * Checks if the object is currently in a hurt state.
     * @returns {boolean} - True if the object is hurt, false otherwise.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHurt;
        timePassed /= 1000;
        return timePassed < 1;
    }

    /**
     * Checks if the object is dead (energy level is zero).
     * @returns {boolean} - True if the object is dead, false otherwise.
     */
    isDead() {
        return this.energy <= 0;
    }

    startDead() {
        setTimeout(() => {
            this.spliceble = true;
        }, 1500);
    }

}
