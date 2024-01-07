class Level {
    clouds;
    backgrounds;
    enemies;
    level_end_x = 5100;
    bottles;
    coins;

    constructor(clouds, backgrounds, enemies, bottles, coins) {
        this.clouds = clouds;
        this.backgrounds = backgrounds;
        this.enemies = enemies;
        this.bottles = bottles;
        this.coins = coins;
    }
}