class MovableObject extends DrawableObject {
    index = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    heightY = 200;
    acceleration = 2.5;
    energy = 100;
    lastHurt = 0;
    offset = { top: 0, left: 0, right: 0, bottom: 0 };


    applyGravity() {
        let applyGarvityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);      
    }


    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return this.y < 350;
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


    isColliding(mo) {
        return (
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
        )

    }


    hit() {
        this.energy -= 5;
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
        return this.energy === 0;
    }
}
