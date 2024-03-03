class Collision {
    world;

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
        this.world.level.enemies.forEach((enemy, index) => {
            if (enemy.spliceble) {
                this.world.level.enemies.splice(index, 1);
            } else {
                if (this.world.character.isColliding(enemy)) {
                    this.handleCharacterCollision(enemy, index);
                } else if (this.world.bottles.length > 0 && this.world.bottles[0].isColliding(enemy)) {
                    this.handleBottleCollision(enemy, index);
                }
            }
        });
    }

    /**
     * Handles collision between the character and an enemy.
     * @param {Enemy} enemy - The enemy object involved in the collision.
     */
    handleCharacterCollision(enemy, index) {
        if (!this.world.character.isAboveGround()) {
            this.handleCharacterGroundCollision();
        } else if (this.world.character.speedY < 0 && (enemy instanceof Chicken || enemy instanceof SmallChicken)) {
            this.handleCharacterJumpCollision(enemy, index);
        }
    }

    /**
     * Handles collision between the character and the ground.
     */
    handleCharacterGroundCollision() {
        this.world.character.hit(5);
        this.world.healthStatusBar.setPercentage(this.world.character.energy);
    }

    /**
     * Handles collision between the character and an enemy during a jump.
     * @param {Enemy} enemy - The enemy object involved in the collision.
     */
    handleCharacterJumpCollision(enemy, index) {
        hurt_chicken_sound.play();
        hurt_chicken_sound.volume = 0.1;
        enemy.dead();
        this.world.character.jump();
        this.world.removeEnemy(index);
    }

    /**
     * Handles collision between a bottle and an enemy.
     * @param {Enemy} enemy - The enemy object involved in the collision.
     */
    handleBottleCollision(enemy, index) {
        if (!this.world.bottles[0].isCollidingWhithEnemy) {
            this.world.bottles[0].isCollidingWhithEnemy = true;
            if (enemy instanceof EndBoss) {
                this.handleEndBossCollision(enemy, index);
            } else {
                this.handleRegularEnemyCollision(enemy, index);
            }
        }
    }

    /**
     * Handles collision between a bottle and the end boss.
     * @param {EndBoss} endBoss - The end boss object involved in the collision.
     */
    handleEndBossCollision(endBoss, index) {
        if (endBoss.energy > 0) {
            endBoss.hit(20);
            this.world.healthEndBossStatusBar.setPercentage(endBoss.energy);
            hurt_chicken_sound.play();
            hurt_chicken_sound.volume = 0.1;
        }
        if (endBoss.energy <= 0) {
            this.world.removeEnemy(index);
        }
    }

    /**
     * Handles collision between a bottle and a regular enemy.
     * @param {Enemy} enemy - The regular enemy object involved in the collision.
     */
    handleRegularEnemyCollision(enemy, index) {
        hurt_chicken_sound.play();
        hurt_chicken_sound.volume = 0.1;
        enemy.dead();
        this.world.removeEnemy(index);
    }


    /**
     * Checks collisions with coins and handles corresponding actions.
     */
    checkCoinCollisions() {
        this.world.level.coins.forEach((coin) => {
            if (this.world.character.isColliding(coin)) {
                // If character collides with a coin, collect the coin
                this.world.character.takeCoin(coin);
                this.world.findAndRemoveCoin(coin.id);
                this.world.coinsStatusBar.setPercentage(this.world.character.coins.length * 10);
            }
        });
    }

    /**
     * Checks collisions with bottles and handles corresponding actions.
     */
    checkBottleCollisions() {
        this.world.level.bottles.forEach((bottle) => {
            if (this.world.character.isColliding(bottle)) {
                // If character collides with a bottle, collect the bottle
                this.world.character.takeBottle(bottle);
                this.world.findAndRemoveBottle(bottle.id);
                this.world.bottleStatusBar.setPercentage(this.world.character.bottles.length * 10);
            }
        });
    }
}