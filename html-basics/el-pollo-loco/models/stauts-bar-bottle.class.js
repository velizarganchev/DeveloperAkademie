/**
 * Represents the status bar for displaying the percentage of available bottles.
 */
class StatusBarBottle extends DrawableObject {
    /**
     * Collection of images representing different percentage levels for available bottles.
     */
    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ];

    /**
     * Current percentage value of available bottles displayed on the status bar.
     */
    percentage = 0;

    /**
     * Creates a new instance of the StatusBarBottle class.
     */
    constructor() {
        super().loadImages(this.IMAGES);
        this.x = 0;
        this.y = 100;
        this.height = 50;
        this.width = 200;
        this.setPercentage(0);
    }

    /**
     * Sets the percentage value for the status bar and updates the displayed image.
     * @param {number} percentage - The new percentage value for available bottles.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let index = this.resolveImageIndex();
        let path = this.IMAGES[index];
        this.img = this.imageCash[path];
    }

    /**
     * Resolves the appropriate image index based on the current available bottles percentage value.
     * @returns {number} - The index of the image to be displayed.
     */
    resolveImageIndex() {
        switch (true) {
            case this.percentage === 100:
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
