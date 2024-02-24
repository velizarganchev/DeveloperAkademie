const COLLISION_INTERVAL = 200;
class World {
    character = new Charcter();
    healthStatusBar = new StatusBarHealth();
    healthEndBossStatusBar = new StatusBarHealthEndBoss();
    coinsStatusBar = new StatusBarCoins();
    bottleStatusBar = new StatusBarBottle();
    bottles = [];
    canTrow = true;
    ctx;
    canvas;
    keyboard;
    level = levelOne;
    endBoss = this.level.enemies.find(e => e instanceof EndBoss);
    camera_x = 0;

    /**
    * Constructor for the World class.
    * Initializes the canvas context, canvas element, keyboard input, and starts the main loop.
    * @param {HTMLCanvasElement} canvas - The canvas element.
    * @param {Keyboard} keyboard - The keyboard input handler.
    */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Associates the world instance with the character.
     * Used to establish a reference for communication between the character and the world.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
 * Main game loop that runs at regular intervals.
 * Handles collisions, checks for object throwing, and manages bottle timing.
 */
    run() {
        setInterval(() => {
            this.checkCollisions(); // Check for collisions between objects

            if (this.checkThrowObject()) {
                // If the character is attempting to throw an object, add a new bottle
                this.throwBottle();
            }

            if (this.endBossStartWalking()) {
                this.endBoss.startWalking = true;
            }

            if (this.firstAttackPosition()) {
                this.handleFirstAttack();
            }

            this.handleBrokenBottles();
        }, COLLISION_INTERVAL); // Main loop interval
    }

    /**
  * Handles the first attack behavior of the end boss.
  */
    handleFirstAttack() {
        this.endBoss.startWalking = false;
        this.endBoss.firstAttack = true;

        setTimeout(() => {
            this.endBoss.firstAttack = false;
            this.endBoss.startWalking = true;
        }, 3000); // 3000 milliseconds (3 seconds) delay
    }

    /**
     * Checks if the end boss should start walking.
     * @returns {boolean} - True if the end boss should start walking, false otherwise.
     */
    endBossStartWalking() {
        return -4934 > this.camera_x;
    }

    /**
     * Checks if the end boss is in the first attack position.
     * @returns {boolean} - True if the end boss is in the first attack position, false otherwise.
     */
    firstAttackPosition() {
        return this.endBoss.x < 4500;
    }

    /**
     * Initiates the throwing action for the throwable object.
     */
    throwBottle() {
        if (this.canTrow) {
            let bottle = new ThrowableObject(this.character.x, this.character.y);
            this.canTrow = false; // Disable throwing temporarily
            this.bottles.push(bottle);
            this.character.bottles.pop(); // Reduce the character's bottle count
            this.bottleStatusBar.setPercentage(this.character.bottles.length * 10); // Update bottle status bar
        }
    }

    /**
     * Handles broken bottles after a delay.
     */
    handleBrokenBottles() {
        if (this.bottles.length > 0) {
            this.checkEnemyCollisionsForBottle();

            if (this.bottles[0].isBroken) {
                this.canTrow = true; // Allow throwing again
                this.bottles.splice(0, 1); // Remove broken bottles from the list
            }
        }
    }

    /**
     * Checks collisions between the first bottle in the list and enemies.
     */
    checkEnemyCollisionsForBottle() {
        this.level.enemies.forEach((enemy) => {
            if (this.bottles[0].isColliding(enemy)) {
                this.bottles[0].isCollidingWhithEnemy = true;
                if (enemy instanceof EndBoss) {
                    if (enemy.isDead()) {
                        enemy.dead();
                        this.findAndRemoveEnemy(enemy.id);
                    } else {
                        this.healthEndBossStatusBar.setPercentage(enemy.energy);
                        enemy.hit(25);
                    }
                } else {
                    enemy.dead();
                    this.findAndRemoveEnemy(enemy.id);
                }
            }
        });
    }

    /**
     * Checks collisions with enemies, coins, and bottles, and handles corresponding actions.
     */
    checkCollisions() {
        this.checkEnemyCollisions();
        this.checkCoinCollisions();
        this.checkBottleCollisions();
    }

    /**
     * Checks collisions with enemies and handles corresponding actions.
     */
    checkEnemyCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                // If the character is not above ground, apply damage
                if (!this.character.isAboveGround()) {
                    this.character.hit(5);
                    this.healthStatusBar.setPercentage(this.character.energy);
                } else if (
                    this.character.isAboveGround() &&
                    this.character.speedY < 0 &&
                    (enemy instanceof Chicken || enemy instanceof SmallChicken)
                ) {
                    // If character is jumping on an enemy, defeat the enemy
                    enemy.dead();
                    this.character.jump();
                    this.findAndRemoveEnemy(enemy.id);
                }
            }
        });
    }

    /**
     * Checks collisions with coins and handles corresponding actions.
     */
    checkCoinCollisions() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                // If character collides with a coin, collect the coin
                this.character.takeCoin(coin);
                this.findAndRemoveCoin(coin.id);
                this.coinsStatusBar.setPercentage(this.character.coins.length * 10);
            }
        });
    }

    /**
     * Checks collisions with bottles and handles corresponding actions.
     */
    checkBottleCollisions() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                // If character collides with a bottle, collect the bottle
                this.character.takeBottle(bottle);
                this.findAndRemoveBottle(bottle.id);
                this.bottleStatusBar.setPercentage(this.character.bottles.length * 10);
            }
        });
    }




    /**
    * Finds and removes an enemy from the level based on the provided enemyId after a delay of 1000 milliseconds.
    * @param {string} enemyId - The unique identifier of the enemy to be removed.
    */
    findAndRemoveEnemy(enemyId) {
        setTimeout(() => {
            let enemyToRemove = this.level.enemies.findIndex((e) => e.id === enemyId);
            this.level.enemies.splice(enemyToRemove, 1);
        }, 1000);
    }

    /**
     * Finds and removes a coin from the level based on the provided coinId.
     * @param {string} coinId - The unique identifier of the coin to be removed.
     */
    findAndRemoveCoin(coinId) {
        let coinToRemove = this.level.coins.findIndex((c) => c.id === coinId);
        this.level.coins.splice(coinToRemove, 1);
    }

    /**
     * Finds and removes a bottle from the level based on the provided bottleId.
     * @param {string} bottleId - The unique identifier of the bottle to be removed.
     */
    findAndRemoveBottle(bottleId) {
        let bottleToRemove = this.level.bottles.findIndex((b) => b.id === bottleId);
        this.level.bottles.splice(bottleToRemove, 1);
    }

    /**
     * Checks if the character is attempting to throw an object (keyd is pressed) and if there are bottles available.
     * @returns {boolean} - True if the character is attempting to throw an object, false otherwise.
     */
    checkThrowObject() {
        return this.keyboard.keyd && this.character.bottles.length > 0 && this.canTrow;
    }



    /**
    * Reverses the direction of the object on the x-axis.
    * @param {Object} obj - The object to change direction.
    */
    changeDirectionBack(obj) {
        obj.x = obj.x * -1;
        this.ctx.restore();
    }

    /**
     * Changes the direction of the object on the x-axis.
     * @param {Object} obj - The object to change direction.
     */
    changeDirection(obj) {
        this.ctx.save();
        this.ctx.translate(obj.width, 0);
        this.ctx.scale(-1, 1);
        obj.x = obj.x * -1;
    }

    /**
     * Maps an object by drawing it on the canvas.
     * @param {Object} obj - The object to be drawn.
     */
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

    /**
     * Adds objects to the map and draws them on the canvas.
     * @param {Array} objects - An array of objects to be drawn.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.mapObj(o);
        });
    }

    /**
     * Draws the entire scene on the canvas, including backgrounds, status bars, characters, and objects.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);

        this.drawBackgrounds();
        this.drawStatusBars();

        this.mapObj(this.character);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.bottles);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Draws the status bars on the canvas.
     */
    drawStatusBars() {
        this.ctx.translate(-this.camera_x, 0);
        this.mapObj(this.healthStatusBar);
        this.mapObj(this.healthEndBossStatusBar);
        this.mapObj(this.coinsStatusBar);
        this.mapObj(this.bottleStatusBar);
        this.ctx.translate(this.camera_x, 0);
    }

    /**
     * Draws the background elements on the canvas.
     */
    drawBackgrounds() {
        this.addObjectsToMap(this.level.backgrounds);
        this.addObjectsToMap(this.level.clouds);
    }

}