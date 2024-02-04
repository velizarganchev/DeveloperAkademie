class StatusBarCoins extends DrawableObject {

    IMAGES = [
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ];
    percentage = 0;

    constructor() {
        super().loadImages(this.IMAGES);
        this.x = 0;
        this.y = 50;
        this.height = 50;
        this.width = 200;
        this.setPercentage(0);
    }


    setPercentage(percentage) {
        this.percentage += percentage;
        let index = this.resolveImageIndex();
        let path = this.IMAGES[index];
        this.img = this.imageCash[path];
    }


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