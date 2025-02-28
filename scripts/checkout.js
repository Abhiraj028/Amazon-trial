import {renderOrderSummary} from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProducts } from '../data/products.js';
import { loadCart } from '../data/cart.js';

// loadProducts(()=>{
//     loadCart(() =>{
//         renderOrderSummary();
//         renderPaymentSummary();
//     });
// });


// new Promise((resolve) => {
//     loadProducts(() => {
//         resolve();
//     })
// }).then(() => {
//     return new Promise((resolve) =>{
//         loadCart(() =>{
//             resolve();
//         })
//     })
// }).then(() =>{
//     renderOrderSummary();
//     renderPaymentSummary();
// })
 
Promise.all([
    new Promise((resolve) =>{
        loadProducts(()=>{
            resolve("Inside resolve vigga");
        })
    }),

    new Promise((resolve)=>{
        loadCart(()=>{
            resolve("Inside resolve pt2 blicka");
        })
    })
]).then((values)=>{
    console.log(values);
    renderOrderSummary();
    renderPaymentSummary();
})
