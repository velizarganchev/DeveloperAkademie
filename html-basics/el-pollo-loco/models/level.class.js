/**
 * Represents a game level containing various elements such as clouds, backgrounds, enemies, bottles, and coins.
 */
class Level {
    clouds;
    backgrounds;
    enemies;
    /**
     * X-coordinate indicating the end of the level.
     */
    level_end_x = 5100;
    bottles;
    coins;

    /**
     * Creates a new instance of the Level class.
     * @param {Array} clouds - Collection of clouds in the level.
     * @param {Array} backgrounds - Collection of background objects in the level.
     * @param {Array} enemies - Collection of enemies in the level.
     * @param {Array} bottles - Collection of bottles in the level.
     * @param {Array} coins - Collection of coins in the level.
     */
    constructor(clouds, backgrounds, enemies, bottles, coins) {
        this.clouds = clouds;
        this.backgrounds = backgrounds;
        this.enemies = enemies;
        this.bottles = bottles;
        this.coins = coins;
    }
}
