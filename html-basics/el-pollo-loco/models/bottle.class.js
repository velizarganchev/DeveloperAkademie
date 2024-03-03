/**
 * Represents a bottle object that extends the MovableObject class.
 */
class Bottle extends MovableObject {
    id;
    width = 80;
    height = 100;
    y = 340;
    offset = { top: + 55, left: + 60, right: + 45, bottom: + 55 };

    IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];


    /**
     * Creates a new instance of the Bottle class.
     */
    constructor() {
        super().loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.id = (Math.random() * 1000).toFixed(0);
        this.x = 400 + Math.random() * 3500;
        this.animate();
    }


    /**
     * Animates the bottle by cycling through its images.
     */
    animate() {
         setInterval(() => {
            this.animateImg(this.IMAGES);
        }, 500);
    }
}
