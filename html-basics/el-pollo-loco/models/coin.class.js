/**
 * Represents a coin object in the game, extending the MovableObject class.
 */
class Coin extends MovableObject {
    id;
    width = 80;
    height = 100;
    offset = { top: + 62, left: + 62, right: + 62, bottom: + 62 };
    
    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];

    /**
     * Coin class constructor. Loads the coin image, sets initial position, and initiates animation.
     */
    constructor() {
        super().loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.id = (Math.random() * 1000).toFixed(0);
        this.x = 500 + Math.random() * 4000;
        this.y = 100 + Math.random() * 250;
        this.animate();
    }

    /**
     * Initiates continuous animation by periodically switching between coin images.
     */
    animate() {
        setInterval(() => {
            this.animateImg(this.IMAGES);
        }, 500);
    }
}
