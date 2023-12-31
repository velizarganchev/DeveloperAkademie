class Coin extends MovableObject {
    id;
    width = 80;
    height = 100;
    y = 300;
    IMAGES = [
        '../img/8_coin/coin_1.png',
        '../img/8_coin/coin_2.png',
    ];


    constructor() {
        super().loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.id = (Math.random() * 1000).toFixed(0);
        this.x = 500 + Math.random() * 4000;
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.animateImg(this.IMAGES)
        }, 500);
    }
}