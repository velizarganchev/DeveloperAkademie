/**
 * Represents a background object that extends the MovableObject class.
 */
class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    /**
     * Creates a new instance of the BackgroundObject class.
     * @param {string} path - The path to the image file for the background object.
     * @param {number} x - The initial x-coordinate of the background object.
     * @param {number} y - The initial y-coordinate of the background object.
     */
    constructor(path, x, y) {
        super().loadImage(path);
        this.x = x;
        this.y = 480 - this.height;
    }
}
