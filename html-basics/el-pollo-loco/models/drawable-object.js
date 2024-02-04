class DrawableObject {
    x = 50;
    y = 290;
    img;
    width = 100;
    height = 150;
    imageCash = {};


    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (error) {
            console.warn('Error Loading Image', error);
            console.log('Could not load image', this.img.src);
        }
    }


    drawFrame(ctx) {
        if (this instanceof Charcter ||
            this instanceof Chicken ||
            this instanceof SmallChicken ||
            this instanceof Bottle ||
            this instanceof Coin ||
            this instanceof EndBoss) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    loadImages(array) {
        array.forEach(path => {
            let image = new Image();
            image.src = path;
            this.imageCash[path] = image;
        });
    }
}