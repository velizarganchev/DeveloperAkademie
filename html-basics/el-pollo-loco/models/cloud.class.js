class Cloud extends MovableObject {
    width = 500;
    height = 250;
    y = 20;

    constructor(path) {
        super().loadImage(path);
        this.x = 300;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 40);
    }
}