class Charcter extends MovableObject {
    y = 80;
    width = 150;
    height = 235;
    speed = 10;
    coins = [];
    bottles = [];
    IMAGES_IDLE = [
        '../img/2_character_pepe/1_idle/idle/I-1.png',
        '../img/2_character_pepe/1_idle/idle/I-2.png',
        '../img/2_character_pepe/1_idle/idle/I-3.png',
        '../img/2_character_pepe/1_idle/idle/I-4.png',
        '../img/2_character_pepe/1_idle/idle/I-5.png',
        '../img/2_character_pepe/1_idle/idle/I-6.png',
        '../img/2_character_pepe/1_idle/idle/I-7.png',
        '../img/2_character_pepe/1_idle/idle/I-8.png',
        '../img/2_character_pepe/1_idle/idle/I-9.png',
        '../img/2_character_pepe/1_idle/idle/I-10.png',
    ];
    IMAGES_LONGIDLE = [
        '../img/2_character_pepe/1_idle/long_idle/I-11.png',
        '../img/2_character_pepe/1_idle/long_idle/I-12.png',
        '../img/2_character_pepe/1_idle/long_idle/I-13.png',
        '../img/2_character_pepe/1_idle/long_idle/I-14.png',
        '../img/2_character_pepe/1_idle/long_idle/I-15.png',
        '../img/2_character_pepe/1_idle/long_idle/I-16.png',
        '../img/2_character_pepe/1_idle/long_idle/I-17.png',
        '../img/2_character_pepe/1_idle/long_idle/I-18.png',
        '../img/2_character_pepe/1_idle/long_idle/I-19.png',
        '../img/2_character_pepe/1_idle/long_idle/I-20.png',
    ]
    IMAGES_WALKING = [
        '../img/2_character_pepe/2_walk/W-21.png',
        '../img/2_character_pepe/2_walk/W-22.png',
        '../img/2_character_pepe/2_walk/W-23.png',
        '../img/2_character_pepe/2_walk/W-24.png',
        '../img/2_character_pepe/2_walk/W-25.png',
        '../img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        '../img/2_character_pepe/3_jump/J-31.png',
        '../img/2_character_pepe/3_jump/J-32.png',
        '../img/2_character_pepe/3_jump/J-33.png',
        '../img/2_character_pepe/3_jump/J-34.png',
        '../img/2_character_pepe/3_jump/J-35.png',
        '../img/2_character_pepe/3_jump/J-36.png',
        '../img/2_character_pepe/3_jump/J-37.png',
        '../img/2_character_pepe/3_jump/J-38.png',
        '../img/2_character_pepe/3_jump/J-39.png',
    ];
    IMAGES_HURT = [
        '../img/2_character_pepe/4_hurt/H-41.png',
        '../img/2_character_pepe/4_hurt/H-42.png',
        '../img/2_character_pepe/4_hurt/H-43.png',
    ];
    IMAGES_DEAD = [
        '../img/2_character_pepe/5_dead/D-51.png',
        '../img/2_character_pepe/5_dead/D-52.png',
        '../img/2_character_pepe/5_dead/D-53.png',
        '../img/2_character_pepe/5_dead/D-54.png',
        '../img/2_character_pepe/5_dead/D-55.png',
        '../img/2_character_pepe/5_dead/D-56.png',
        '../img/2_character_pepe/5_dead/D-57.png',
    ];
    offset = { top: 5, left: 5, right: 5, bottom: 5 };
    world;
    walking_sound = new Audio('../audio/walking.mp3');


    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.animate();
    }


    animate() {
        let chAnimateMoveInterval = setInterval(() => {
            this.walking_sound.pause();
            if (this.canMoveRight()) {
                this.moveRight();
            }
            if (this.canMoveLeft()) {
                this.moveLeft();
            }
            if (this.canJump()) {
                this.jump();
                this.index = 0;   
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);


        let chAnimateImgInterval = setInterval(() => {
            if (this.isDead()) {
                this.animateImg(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.animateImg(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.animateImg(this.IMAGES_JUMPING);
            } else if (this.world.keyboard.arrowright === true || this.world.keyboard.arrowleft === true) {
                this.animateImg(this.IMAGES_WALKING);
            }
        }, 1000 / 10);
    }


    canJump() {
        return (this.world.keyboard.space || this.world.keyboard.arrowup) && !this.isAboveGround();
    }


    moveLeft() {
        super.moveLeft();
        this.otherDirection = true;
        this.walking_sound.play();
    }


    moveRight() {
        super.moveRight();
        this.otherDirection = false;
        this.walking_sound.play();
    }


    canMoveLeft() {
        return this.world.keyboard.arrowleft && this.x > 0;
    }


    canMoveRight() {
        return this.world.keyboard.arrowright && this.x < this.world.level.level_end_x;
    }


    takeCoin(coin) {
        if (this.coins.length < 10) {
            this.coins.push(coin);
        }
    }


    takeBottle(bottle) {
        if (this.bottles.length < 10) {
            this.bottles.push(bottle);
        }
    }


    jump() {
        this.speedY = 30;
    }
}
