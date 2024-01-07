class ThrowableObject extends MovableObject {
    width = 80;
    height = 80;
    constructor(x, y) {
        super().loadImage('../img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.trow();
    }

    trow() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }
}