class SmallChicken extends MovableObject {
    y = 370;
    heightY = 370;
    acceleration = 0.2
    width = 46;
    height = 63;
    IMAGES_WALKING = [
        '../img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];


    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 500 + Math.random() * 4200;
        this.speed = 0.25 + Math.random() * 0.25;
        this.applyGravity();
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.animateImg(this.IMAGES_WALKING)
        }, 1000 / 10);
        setInterval(() => {
            this.moveLeft();
            if (!this.isAboveGround()) {
                this.fly();
            }
        }, 1000 / 30);
    }


    fly() {
        this.speedY = 5 + Math.random() * 2;
    }
}