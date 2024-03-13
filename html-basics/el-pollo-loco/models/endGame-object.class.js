/**
 * Represents a background object that extends the MovableObject class.
 */
class GameObject extends MovableObject {
    width = 720;
    height = 480;
    x = 0;
    y = 0;

    /**
     * Creates a new instance of the EndGameObject class.
     * @param {string} path - The path to the image file for the endGame object.
     */
    constructor(path) {
        super().loadImage(path);
    }
}
