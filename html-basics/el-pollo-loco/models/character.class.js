class Charcter extends MovableObject {
    y = 80;
    width = 150;
    height = 235;
    speed = 10;
    coins = 0;
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
        setInterval(() => {
            this.walking_sound.pause();
            if (this.canMoveRight()) {
                this.moveRight();
            }
            if (this.canMoveLeft()) {
                this.moveLeft();
            }
            if (this.canJump()) {
                this.jump();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);


        setInterval(() => {
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

    jump() {
        this.speedY = 30;
    }
}
