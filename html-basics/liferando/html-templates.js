function generateMainItemHtml(dish) {
    return /*html*/`
    <div class="popular-item">
        <div class="item-info">
           <div class="item-info-title">
               <h3>${dish.title}</h3>
           </div>
           <div class="item-info-sub-title">
               <span>${dish.subTitle}</span>
           </div>
           <div class="item-info-size">
            ${dish.size.length <= 1 ?
            `<span>Wahl aus: Ø ${dish.size[0]} oder Ø ${dish.size[1]}.</span>`
            :
            `<span>Wahl aus: ${dish.size[0]},${dish.size[1]}  oder ${dish.size[2]}.</span>`
        }
           </div>
           <div class="item-info-price">
               <span> ${dish.price[0]} <i class="fa-solid fa-euro-sign"></i></span>
           </div>
        </div>
        <div class="item-add-btn" onclick="addToCart(${dish.id})">
           <button>
               <i class="fa-solid fa-plus"></i>
           </button>
        </div>
    </div>`
}


function showEmptyCart() {
    return /*html*/`
    <div class="empty-cart-container">
        <div class="empty-cart">
            <div class="empty-cart-icon">
                <i class="fa-solid fa-bag-shopping"></i>
            </div>
            <div class="empty-cart-title">
                <h3>Fülle deinen Warenkorb</h3>
            </div>
            <div class="empty-cart-text">
                <span>Füge einige leckere Gerichte aus der</span>
                <span>Speisekarte hinzu und bestelle dein Essen.</span>
            </div>
        </div>
    </div>
    `;
};

function generateCartItemHtml(dish) {
    return /*html*/`
    <div id="cartItem${dish.id}" class="cart-products">
        <div class="cart-item-quantity">
            <span>${dish.quantity}</span>
        </div>
        <div class="product-info">
            <div class="cart-name-price-container">
                <div class="cart-item-name">${dish.title}</div>
                <div class="cart-price">${dish.quantity * dish.price.toFixed(2)}</div>
            </div>
            <div class="cart-item-size">${dish.size}</div>
            <div class="cart-actions-container">
                <div class="cart-annotatuon-container">Anmerkung hinzufügen</div>
                <div class="cart-buttons-quantity-container">
                    <div class="cart-quantity-button" onclick="decreaseQuantity(${dish.id})">
                        <i class="fa-solid fa-minus"></i>
                    </div>
                    <div class="cart-quantity">${dish.quantity}</div>
                    <div class="cart-quantity-button" onclick="increaseQuantity(${dish.id})">
                        <i class="fa-solid fa-plus"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
}


function generateTotalAmounHtml(sum) {
    let total = 0;
    let deliveryTrue = false;
    if (deliveryCheck()) {
        total = sum + delivery;
        deliveryTrue = true;
    } else {
        total = sum;
    }
    return /*html*/`
    <div class="subtotal-container">
        <div class="subtotal-text">Zwischensumme</div>
        <div class="subtotal-sum">${sum.toFixed(2)} <i class="fa-solid fa-euro-sign"></i></div>
    </div>
    <div class="delivery-costs-container">
        <div class="delivery-costs">Lieferkosten</div>
        <div class="delivery-costs-sum">${deliveryTrue ? 2.50.toFixed(2) : 0} <i class="fa-solid fa-euro-sign"></i></div>
    </div>
    <div class="total-container">
        <div class="total-text">Gesamt</div>
        <div class="total-sum">${total.toFixed(2)} <i class="fa-solid fa-euro-sign"></i></div>
    </div>
    <div class="pay-button-container">
        <button onclick="pay()">Bezahlen (${total.toFixed(2)} <i class="fa-solid fa-euro-sign"></i>)</button>
    </div>
    `;
}


function generatePayHtml() {
    return /*html*/`
    <div class="overlay">
        <div class="overlay-container">
            <button class="pay-overlay-close-btn">
                <i class="fa-solid fa-xmark" onclick="payClosseButton()"></i>
            </button>
            <h1>Thanks for your order !</h1>
            <div class="pay-overlay-icon">
                <i class="fa-solid fa-trophy"></i>
            </div>
        </div>
    </div>
    `
};