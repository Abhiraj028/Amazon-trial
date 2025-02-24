export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [];
}

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId){
const quantitySelector=Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

    let match;

    cart.forEach((items) => {
    if (productId === items.productId) {
        match = items;
    }
    });

    if (match) {
    match.quantity += quantitySelector;
    } else {
    cart.push({
        productId: productId,
        quantity: quantitySelector,
    });
    }
    saveToStorage();
}

export function removeFromCart(productId){
    const newCart = [];

    cart.forEach((cartItem)=>{
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }
    })

    cart = newCart;
    saveToStorage();
}