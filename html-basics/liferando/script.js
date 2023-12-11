let cartItems = [];
let sum = 0;
let delivery = 2.50;

function render() {
    showDishes();
    showCart();
}


function showDishes() {
    for (let i = 0; i < dishes.length; i++) {
        const dish = dishes[i];
        let popular = document.getElementById('popular-dish');
        let gardenFeeling = document.getElementById('garden-feeling-dish');
        if (dish.subCategory.includes('popular')) {
            popular.innerHTML += generateMainItemHtml(dish);
        } else if (dish.subCategory.includes('garden-feeling')) {
            gardenFeeling.innerHTML += generateMainItemHtml(dish);
        }
    }
}


function showCart() {
    let cartDiv = document.getElementById('cart-div');
    cartDiv.innerHTML = '';
    let cartNodeItems = document.createElement('div');
    cartNodeItems.classList.add('cart-dishes-container');
    let totalAmount = document.createElement('div');
    totalAmount.classList.add('total-amount-container');
    loadCartItems();
    if (cartItems.length > 0) {
        for (let i = 0; i < cartItems.length; i++) {
            let cartDish = cartItems[i];
            cartNodeItems.innerHTML += generateCartItemHtml(cartDish);
            cartDiv.append(cartNodeItems);
            sum += cartDish.price * cartDish.quantity;
        }
        totalAmount.innerHTML += generateTotalAmounHtml(sum)
        cartDiv.appendChild(totalAmount);
    } else {
        cartDiv.innerHTML = ''
        cartDiv.innerHTML += showEmptyCart();
    }
}


function addToCart(id) {
    let dish = dishes.find((d) => d.id === id);
    let exist = cartItems.find((d) => d.id === id);
    if (!exist) {
        let cartItem = {
            id: dish.id,
            title: dish.title,
            price: dish.price[0],
            size: dish.size[0],
            quantity: 1,
            deliveryCost: 1.99,
        }
        cartItems.push(cartItem);
    } else {
        increaseQuantity(dish.id)
    }
    saveCartItems();
    sum = 0;
    showCart();
}


function increaseQuantity(id) {
    let dishToIncrease = cartItems.find((d) => d.id === id);
    if (dishToIncrease && dishToIncrease.quantity >= 1) {
        dishToIncrease.quantity++;
        saveCartItems();
        sum = 0;
        showCart();
    }
}


function decreaseQuantity(id) {
    let dishToDecrease = cartItems.find((d) => d.id === id);
    if (dishToDecrease && dishToDecrease.quantity >= 1) {
        dishToDecrease.quantity--;
        saveCartItems();
        if (dishToDecrease.quantity < 1) {
            removeItemFromCart(dishToDecrease.id);
        }
        sum = 0;
        showCart();
    }
}


function removeItemFromCart(id) {
    let indexToRemove = cartItems.findIndex((d) => d.id === id);
    if (indexToRemove !== -1) {
        cartItems.splice(indexToRemove, 1);
        saveCartItems();
        sum = 0;
        showCart();
    }
}


function deliveryCheck() {
    let inputEl = document.getElementById('dt-toggle-on');
    return inputEl.checked;
}


function addChecked(id) {
    let inputEl = document.getElementById(id);
    inputEl.checked = true;
    sum = 0;
    showCart();
}


function saveCartItems() {
    let cartItemsAsString = JSON.stringify(cartItems);
    localStorage.setItem('cart', cartItemsAsString);
}


function loadCartItems() {
    let cartItemsAsString = localStorage.getItem('cart');
    if (cartItemsAsString) {
        cartItems = JSON.parse(cartItemsAsString);
    }
}


function openCart() {
    let leftElement = document.getElementById('left-element');
    let rightElement = document.getElementById('right-element');
    leftElement.style.display = 'none';
    rightElement.classList.remove('r-hide');
    rightElement.style.width = '100%';
}


function pay() {
    let payEl = document.getElementById('pay-overlay');
    payEl.innerHTML = '';
    cartItems = [];
    saveCartItems();
    sum = 0;
    showCart();
    payEl.innerHTML = generatePayHtml();
}


function payClosseButton() {
    let payEl = document.getElementById('pay-overlay');
    payEl.innerHTML = '';
}
