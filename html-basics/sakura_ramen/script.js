let menus = ['Pizza Salami', 'Pageti Bolognese', 'Pilze Suppe'];
let prices = [1.99, 2.65, 2.99];
let amounts = [2, 5, 1];

function getValueFromInput(inputId) {
    let inputValue = document.getElementById(inputId).value;
    if (inputValue) {
        return inputValue;
    }
}


function getMenuFromInput() {
    let menu = getValueFromInput('menu');
    return menu.trim();
}

function getPriceFromInput() {
    let price = getValueFromInput('price');
    return Number(price);
}

function onAddMenu() {
    let menu = getMenuFromInput();
    let price = getPriceFromInput();
    let menuIndex = getMenuIndex(menu);
    if (menuIndex === -1) {
        menus.push(menu);
    } else {
        amounts[menuIndex]++;
    }

    prices.push(price);
    amounts.push(1);
}

function getMenuIndex(menu) {
    return menus.indexOf(menu);
}
















