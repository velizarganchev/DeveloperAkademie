/**
 * Represents the status bar for displaying the percentage of collected coins.
 */
class StatusBarCoins extends DrawableObject {
    /**
     * Collection of images representing different percentage levels.
     */
    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ];

    /**
     * Current percentage value displayed on the status bar.
     */
    percentage = 0;

    /**
     * Creates a new instance of the StatusBarCoins class.
     */
    constructor() {
        super().loadImages(this.IMAGES);
        this.x = 0;
        this.y = 50;
        this.height = 50;
        this.width = 200;
        this.setPercentage(0);
    }

    /**
     * Sets the percentage value for the status bar and updates the displayed image.
     * @param {number} percentage - The new percentage value.
     */
    setPercentage(percentage) {
        this.percentage += percentage;
        let index = this.resolveImageIndex();
        let path = this.IMAGES[index];
        this.img = this.imageCash[path];
    }

    /**
     * Resolves the appropriate image index based on the current percentage value.
     * @returns {number} - The index of the image to be displayed.
     */
    resolveImageIndex() {
        switch (true) {
            case this.percentage >= 100:
                return 5;
            case this.percentage > 80:
                return 4;
            case this.percentage > 60:
                return 3;
            case this.percentage > 40:
                return 2;
            case this.percentage > 20:
                return 1;
            default:
                return 0;
        }
    }
}
