import { getProduct, products } from "../../data/products.js";
import { cart, updateDeliveryOptionId, removeFromCart } from "../../data/cart.js";
import { formatMoney } from "../utils/priceCalc.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";




export function renderOrderSummary() {

  topUpdater();

  console.log('Cart:', JSON.parse(JSON.stringify(cart)));
  console.log('Products:', JSON.parse(JSON.stringify(products)));

  let cartSummaryHTML = "";

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matching = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    let deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");

    const dateString = deliveryDate.format("dddd, MMMM D");

    cartSummaryHTML +=
      `<div class="cart-item-container js-cart-item-container-${matching.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matching.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matching.name}
                </div>
                <div class="product-price">
                  $${formatMoney(matching.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matching.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                  
                ${deliveryOptionsHTML(matching, cartItem)}
              </div>
            </div>
          </div>`;
  });

  function deliveryOptionsHTML(matching, cartItem) {
    let html = "";

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");

      const dateString = deliveryDate.format("dddd, MMMM D");

      const priceString = deliveryOption.priceCents === 0 ? "FREE" : `$${formatMoney(deliveryOption.priceCents)} -`;

      

      const isChecked = String(deliveryOption.id) === String(cartItem.deliveryOptionId);


      html +=
        `
        <div class="delivery-option js-delivery-option"
          data-product-id="${matching.id}"
          data-delivery-option-id="${deliveryOption.id}">
          <input type="radio"
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matching.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      `;
    });

    return html;
  }

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  document.querySelectorAll(".js-delete-link")
    .forEach((link) => {
      link.addEventListener("click", () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);

        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();
        renderPaymentSummary();
        topUpdater();
      });
    });

  document.querySelectorAll(".js-delivery-option")
    .forEach((element) => {
      element.addEventListener("click", () => {
        const { productId, deliveryOptionId } = element.dataset;
        updateDeliveryOptionId(productId, deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
      });
    });

    function topUpdater(){
      let cartQuantity = 0;
    
        cart.forEach((items) => {
          cartQuantity += items.quantity;
        });
    
        const doc = document.querySelector(".return-to-home-link");
    
        doc.innerHTML = `${cartQuantity} items`;
    }
}





