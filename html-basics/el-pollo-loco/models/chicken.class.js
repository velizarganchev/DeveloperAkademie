class Chicken extends MovableObject {
    y = 370;
    width = 46;
    height = 63;
    currX = 400;
    IMAGES_WALKING = [
        '../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 800 + Math.random() * 4800;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    

    animate() {
        setInterval(() => {
            this.animateImg(this.IMAGES_WALKING)
        }, 1000 / 10);
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}