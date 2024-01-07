class MovableObject extends DrawableObject {
    index = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    heightY = 200;
    acceleration = 2.5;
    energy = 100;
    lastHurt = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        }
        return this.y < this.heightY;
    }


    moveRight() {
        this.x += this.speed;
    }


    moveLeft() {
        this.x -= this.speed;
    }


    animateImg(images) {
        let i = this.index % images.length;
        let key = images[i];
        this.img = this.imageCash[key];
        this.index++;
    }


    isColliding(obj) {
        return this.x + this.width >= obj.x && this.x <= obj.x + obj.width &&
            this.y + this.height >= obj.y &&
            this.y <= obj.y + obj.height;
    }


    hit() {
        this.energy -= 5;
        this.isHit = true;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHurt = new Date().getTime();
        }
    }


    isHurt() {
        let timepassed = new Date().getTime() - this.lastHurt;
        timepassed /= 1000;
        return timepassed < 1
    }


    isDead() {
        return this.energy == 0;
    }
}
