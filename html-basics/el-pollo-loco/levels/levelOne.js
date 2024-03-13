class LevelGenerator {
    static generateCloudLayers(numLayers, cloudsPerLayer) {
        const cloudLayers = [];
        let position = -300;

        for (let i = 1; i <= numLayers; i++) {
            for (let j = 1; j <= cloudsPerLayer; j++) {
                const cloud = new Cloud(`img/5_background/layers/4_clouds/${j % 2 === 0 ? 2 : 1}.png`, position);
                cloudLayers.push(cloud);
                position += 500;
            }
        }

        return cloudLayers;
    }

    static generateBackgroundObjects() {
        return [
            new BackgroundObject('img/5_background/layers/air.png', -719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/air.png', 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 5),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 5),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 5),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 5),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 6),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 6),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 6),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 6),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 7),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 7),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 7),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 7),
            // ... (repeat the pattern for other layers and images)
        ];
    }

    static generateEnemies() {
        return [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new SmallChicken,
            new SmallChicken,
            new SmallChicken,
            new SmallChicken,
            new EndBoss(),
        ];
    }

    static generateItems(itemClass, numItems) {
        return Array.from({ length: numItems }, () => new itemClass());
    }

    static generateLevel(numCloudLayers, cloudsPerLayer, numItems) {
        const cloudLayers = LevelGenerator.generateCloudLayers(numCloudLayers, cloudsPerLayer);
        const backgroundObjects = LevelGenerator.generateBackgroundObjects();
        const enemies = LevelGenerator.generateEnemies();
        const bottles = LevelGenerator.generateItems(Bottle, numItems);
        const coins = LevelGenerator.generateItems(Coin, numItems);

        return new Level(cloudLayers, backgroundObjects, enemies, bottles, coins);
    }
}


// Initialize an empty array to store cloud layers
const cloudLayers = [];

// Define the number of cloud layers
const numLayers = 5;

// Define the number of clouds per layer
const cloudsPerLayer = 3;

// Set the starting position for the first cloud layer
let position = -300;

levelOne = {};

// Iterate over the number of cloud layers
for (let i = 1; i <= numLayers; i++) {
    for (let j = 1; j <= cloudsPerLayer; j++) {
        // Create a new cloud with a dynamic image path based on the layer and cloud number
        const cloud = new Cloud(`img/5_background/layers/4_clouds/${j % 2 === 0 ? 2 : 1}.png`, position);
        cloudLayers.push(cloud);
        position += 500;
    }
}


const bottles = Array.from({ length: 10 }, () => new Bottle());
const coins = Array.from({ length: 10 }, () => new Coin());

levelOne = new Level(
    cloudLayers,
    [
        new BackgroundObject('img/5_background/layers/air.png', -719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/air.png', 719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 4),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 4),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 4),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 4),
        new BackgroundObject('img/5_background/layers/air.png', 719 * 5),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 5),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 5),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 5),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 6),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 6),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 6),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 6),
        new BackgroundObject('img/5_background/layers/air.png', 719 * 7),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 7),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 7),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 7),
    ],
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new SmallChicken,
        new SmallChicken,
        new SmallChicken,
        new SmallChicken,
        new EndBoss(),
    ],
    bottles,
    coins
);
