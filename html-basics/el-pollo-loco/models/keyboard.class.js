/**
 * Represents a virtual keyboard, tracking the state of various keys.
 */
class Keyboard {
    arrowleft = false;
    arrowright = false;
    arrowup = false;
    arrowdown = false;
    space = false;
    keyd = false;

    constructor() {
        this.bindPressKeyEvents();
        this.bindPressBtnEvents();
    }


    bindPressBtnEvents() {
        document.getElementById('btn-left').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.arrowleft = true;
        });

        document.getElementById('btn-left').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.arrowleft = false;
        })

        document.getElementById('btn-right').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.arrowright = true;
        });

        document.getElementById('btn-right').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.arrowright = false;
        })

        document.getElementById('btn-jump').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.space = true;
        });

        document.getElementById('btn-jump').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.space = false;
        })

        document.getElementById('btn-throw').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.keyd = true;
        });

        document.getElementById('btn-throw').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.keyd = false;
        })
    }


    bindPressKeyEvents() {
        window.addEventListener('keydown', (e) => {
            switch (e.code.toLowerCase()) {
                case 'space':
                    keyboard.space = true;
                    break;
                case 'arrowleft':
                    keyboard.arrowleft = true;
                    break;
                case 'arrowright':
                    keyboard.arrowright = true;
                    break;
                case 'arrowup':
                    keyboard.arrowup = true;
                    break;
                case 'arrowdown':
                    keyboard.arrowdown = true;
                    break;
                case 'keyd':
                    keyboard.keyd = true;
                    break;
            }
        });

        window.addEventListener('keyup', (e) => {
            switch (e.code.toLowerCase()) {
                case 'space':
                    keyboard.space = false;
                    break;
                case 'arrowleft':
                    keyboard.arrowleft = false;
                    break;
                case 'arrowright':
                    keyboard.arrowright = false;
                    break;
                case 'arrowup':
                    keyboard.arrowup = false;
                    break;
                case 'arrowdown':
                    keyboard.arrowdown = false;
                    break;
                case 'keyd':
                    keyboard.keyd = false;
                    break;
            }
        });
    }
}