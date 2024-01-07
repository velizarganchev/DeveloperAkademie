class Bottle extends MovableObject {
    width = 80;
    height = 100;
    y = 350;
    IMAGES = [
        '../img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        '../img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];

    constructor() {
        super().loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.x = 400 + Math.random() * 3000;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.animateImg(this.IMAGES)
        }, 500);
    }
}