import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from '../utils/money.js';




describe('test suite: renderOrderSummary', ()=>{
  const productId1='e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2='15b6fc6f-327a-4ec4-896f-486349e85a3d';

  const productName1=getProduct(productId1).name
  const productName2=getProduct(productId2).name
  const productPrice1=formatCurrency(getProduct(productId1).price)
  const productPrice2=formatCurrency(getProduct(productId2).price)

  beforeEach(()=>{
    spyOn(localStorage, 'setItem');

    document.querySelector('.js-test-container').innerHTML=`
      <div class="js-order-summary"></div>
      <div class="js-checkout-header"></div>
      <div class="js-payment-summary"></div>
      <div class="js-return-to-home-link"></div>
    `;

    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      },{
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }]);
    });

    loadFromStorage();
    renderOrderSummary();
  })

  afterEach(()=>{
    document.querySelector('.js-test-container').innerHTML='HELLO WORLD';
  })

  it('display the cart',()=>{
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);
    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain('Quantity: 2');
    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain('Quantity: 1');
    expect(
      document.querySelector(`.js-product-name-${productId1}`).innerText
    ).toEqual(productName1);
    expect(
      document.querySelector(`.js-product-name-${productId2}`).innerText
    ).toEqual(productName2);
    expect(
      document.querySelector(`.js-product-price-${productId1}`).innerText
    ).toEqual(`$${productPrice1}`);
    expect(
      document.querySelector(`.js-product-price-${productId2}`).innerText
    ).toEqual(`$${productPrice2}`);
  });

  it('removes a product', ()=>{
    document.querySelector(`.js-delete-link-${productId1}`).click();

    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1);

   expect(
    document.querySelector(`.js-cart-item-container-${productId1}`)
   ).toEqual(null);

   expect(
    document.querySelector(`.js-cart-item-container-${productId2}`)
   ).not.toEqual(null);
   expect(
    document.querySelector(`.js-product-name-${productId2}`).innerText
  ).toEqual(productName2);
  expect(
    document.querySelector(`.js-product-price-${productId2}`).innerText
  ).toEqual(`$${productPrice2}`);

   expect(cart.length).toEqual(1);
   expect(cart[0].productId).toEqual(productId2);
  });




  it('updates the delivery option',()=>{
    document.querySelector(`.js-delivery-option-${productId1}-3`).click();

  expect(
    document.querySelector(`.js-delivery-option-input-${productId1}-3`).checked
  ).toEqual(true);

  expect(cart.length).toEqual(2);
  expect(cart[0].productId).toEqual(productId1);
  expect(cart[0].deliveryOptionId).toEqual('3');
  expect(document.querySelector('.js-payment-summary-shipping').innerText).toEqual('$14.98');
  expect(document.querySelector('.js-payment-summary-total').innerText).toEqual('$63.50');
  });
})