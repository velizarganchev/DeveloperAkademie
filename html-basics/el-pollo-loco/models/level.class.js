class Level {
    clouds;
    backgrounds;
    enemies;
    level_end_x = 5100;
    bottles;

    constructor(clouds, backgrounds, enemies, bottles) {
        this.clouds = clouds;
        this.backgrounds = backgrounds;
        this.enemies = enemies;
        this.bottles = bottles;
    }
}