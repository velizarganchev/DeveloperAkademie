class World {
    character = new Charcter();
    healthStatusBar = new StatusBarHealth();
    coinsStatusBar = new StatusBarCoins();
    bottleStatusBar = new StatusBarBottle();
    bottles = [];
    ctx;
    canvas;
    keyboard;
    level = levelOne;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }


    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            if (this.checkThrowObject()) {
                let bottle = new ThrowableObject(this.character.x, this.character.y);
                this.bottles.push(bottle);
                this.character.bottles -= 10;
                this.bottleStatusBar.setPercentage(this.character.bottles);
            }
        }, 200);
    }


    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.healthStatusBar.setPercentage(this.character.energy);
            }
        });
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.character.takeCoin();
                this.findIndexOfCoin(coin.id)
                this.coinsStatusBar.setPercentage(this.character.coins);
            }

        });
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.character.takeBottle();
                this.findIndexOfBottle(bottle.id);
                this.bottleStatusBar.setPercentage(this.character.bottles);
            }

        });
    }

    findIndexOfCoin(coinId) {
        let coinToRemove = this.level.coins.findIndex((c) => c.id === coinId);
        this.level.coins.splice(coinToRemove, 1);
    }


    findIndexOfBottle(bottleId) {
        let bottleToRemove = this.level.bottles.findIndex((b) => b.id === bottleId);
        this.level.bottles.splice(bottleToRemove, 1);
    }

    checkThrowObject() {
        return this.keyboard.keyd && (this.character.bottles / 10) > 0;
    }

    mapObj(obj) {
        if (obj.otherDirection) {
            this.changeDirection(obj);
        }
        obj.draw(this.ctx);
        obj.drawFrame(this.ctx);
        if (obj.otherDirection) {
            this.changeDirectionBack(obj);
        }
    }


    changeDirectionBack(obj) {
        obj.x = obj.x * -1;
        this.ctx.restore();
    }


    changeDirection(obj) {
        this.ctx.save();
        this.ctx.translate(obj.width, 0);
        this.ctx.scale(-1, 1);
        obj.x = obj.x * -1;
    }


    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.mapObj(o);
        });
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);

        this.drawBackgrounds();
        this.drawStatusBars();

        this.mapObj(this.character);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.bottles)

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    drawStatusBars() {
        this.ctx.translate(-this.camera_x, 0);
        this.mapObj(this.healthStatusBar);
        this.mapObj(this.coinsStatusBar);
        this.mapObj(this.bottleStatusBar);
        this.ctx.translate(this.camera_x, 0);
    }

    drawBackgrounds() {
        this.addObjectsToMap(this.level.backgrounds);
        this.addObjectsToMap(this.level.clouds);
    }
}