class ThrowableObject extends MovableObject {

    speedX = 30;
    width = 80;
    height = 80;
    constructor(x, y) {
        super().loadImage('../img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.trow();
    }

    trow() {
        this.speedY = 20;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }
}