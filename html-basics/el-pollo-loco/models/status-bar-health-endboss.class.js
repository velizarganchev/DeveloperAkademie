/**
 * Represents the status bar for displaying the percentage of health.
 */
class StatusBarHealthEndBoss extends DrawableObject {
    /**
     * Collection of images representing different percentage levels for health.
     */
    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange100.png',
    ];

    /**
     * Current percentage value of health displayed on the status bar.
     */
    percentage = 100;

    /**
     * Creates a new instance of the StatusBarHealth class.
     */
    constructor() {
        super().loadImages(this.IMAGES);
        this.x = 510;
        this.y = 40;
        this.height = 50;
        this.width = 200;
        this.setPercentage(100);
    }

    /**
     * Sets the percentage value for the status bar and updates the displayed image.
     * @param {number} percentage - The new percentage value for health.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let index = this.resolveImageIndex();
        let path = this.IMAGES[index];
        this.img = this.imageCash[path];
    }

    /**
     * Resolves the appropriate image index based on the current health percentage value.
     * @returns {number} - The index of the image to be displayed.
     */
    resolveImageIndex() {
        switch (true) {
            case this.percentage === 100:
                return 5;
            case this.percentage >= 80:
                return 4;
            case this.percentage >= 60:
                return 3;
            case this.percentage >= 40:
                return 2;
            case this.percentage >= 20:
                return 1;
            default:
                return 0;
        }
    }
}
