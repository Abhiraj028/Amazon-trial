import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatMoney } from "../utils/priceCalc.js";



export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);

    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });

  

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  

  const taxCents = totalBeforeTaxCents * 0.1;
  

  const totalCents = totalBeforeTaxCents + taxCents;

  
  

  const paymentHTML = 
   `<div class="payment-summary-title">
        Order Summary
    </div>

    <div class="payment-summary-row">
        <div class="items-num">Items (0):</div>
        <div class="payment-summary-money">$${formatMoney(productPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${formatMoney(shippingPriceCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatMoney(totalBeforeTaxCents)}</div>
    </div>

    <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatMoney(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${formatMoney(totalCents)}</div>
    </div>

    <button class="place-order-button button-primary">
        Place your order
    </button>`;

    document.querySelector('.js-payment-summary')
    .innerHTML = paymentHTML;

    numUpdater();
}

function numUpdater(){
    let cartQuantity = 0;
  
      cart.forEach((items) => {
        cartQuantity += items.quantity;
      });
  
      const doc = document.querySelector(".items-num");
  
      doc.innerHTML = `Items (${cartQuantity})`;
  }