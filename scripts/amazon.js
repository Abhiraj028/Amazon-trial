//import statments

import {cart,addToCart} from "../data/cart.js";
import { products } from "../data/products.js";

updateCartQuantity();

// generates html for the products on front page
let line = "";

products.forEach((product) => {
  line += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src=${product.image}>
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          ${product.extraInfoHTML()}

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-Id ="${
            product.id
          }">
            Add to Cart
          </button>
        </div>`;
});

document.querySelector(".js-products-grid").innerHTML = line;



//adds functionality to add to cart

document.querySelectorAll(".js-add-to-cart-button").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;

//added to cart msg
    addedToCartNotification(productId);
    
// quantity selection    
    addToCart(productId);

    console.log(cart);

//top right cart quantity updation   
    updateCartQuantity();
  });
});


//functions for the functionality
 function updateCartQuantity(){
  let cartQuantity = 0;

    cart.forEach((items) => {
      cartQuantity += items.quantity;
    });

    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}

function addedToCartNotification(productId){
  const addedToCart = document.querySelector(`.js-added-${productId}`);
    let timeoutId;
    clearTimeout(timeoutId);
    addedToCart.classList.add("js-added");
      timeoutId = setTimeout(()=>{
      addedToCart.classList.remove("js-added");
    },2000);
}

