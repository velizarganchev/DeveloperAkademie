/**
 * Represents a drawable object in the game.
 */
class DrawableObject {
    x = 50;
    y = 290;
    img;
    width = 100;
    height = 150;
    imageCash = {};

    /**
     * Draws the object on the canvas using its image.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (error) {
            console.warn('Error Loading Image', error);
            console.log('Could not load image', this.img.src);
        }
    }

    /**
     * Draws a red frame around certain game objects for highlighting.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     */
    drawFrame(ctx) {
        if (
            this instanceof Chicken ||
            this instanceof SmallChicken ||
            this instanceof Bottle ||
            this instanceof Coin
        ) {
            ctx.beginPath();
            // ctx.lineWidth = '5';
            // ctx.strokeStyle = 'red';
            // ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }

        if (
            this instanceof Charcter ||
            this instanceof EndBoss
        ) {
            ctx.beginPath();
            // ctx.lineWidth = '5';
            // ctx.strokeStyle = 'blue';
            // ctx.rect(this.x + 20, this.y + 90, this.width -60, this.height -100);
            ctx.stroke();
        }

    }

    /**
     * Loads an image from the specified path and assigns it to the object.
     * @param {string} path - The path to the image.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads an array of images and stores them in the imageCash property.
     * @param {string[]} array - An array of image paths.
     */
    loadImages(array) {
        array.forEach((path) => {
            let image = new Image();
            image.src = path;
            this.imageCash[path] = image;
        });
    }
}
