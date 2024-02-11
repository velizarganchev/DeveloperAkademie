/**
 * Represents a cloud object in the game, extending the MovableObject class.
 */
class Cloud extends MovableObject {
    width = 500;
    height = 250;
    y = 20;

    /**
     * Cloud class constructor. Loads the cloud image and sets initial position.
     * @param {string} path - The path to the cloud image.
     */
    constructor(path, x) {
        super().loadImage(path);
        this.x = x;
        this.animate();
    }

    /**
     * Initiates continuous leftward movement animation for the cloud.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 40);
    }
}
