import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (product === null || product === '' || product === undefined) return

     this.productIndex = this.cartItems.findIndex(item => item.product.id == product.id)     
     this.productIndex == -1 ?
     this.cartItems.push({product, count: 1}) :
     this.cartItems[this.productIndex].count += 1;
     this.onProductUpdate(this.cartItems); 
  }

  updateProductCount(productId, amount) {
    this.productIndex = this.cartItems.findIndex(item => item.product.id == productId)

    if (this.productIndex == -1) return

    this.cartItems[this.productIndex].count += amount

    if (this.cartItems[this.productIndex].count == 0) {
      this.cartItems.splice(this.productIndex, 1)
    }

    // if (this.cartItems[this.productIndex].count < 0) {
    //   this.cartItems[this.productIndex].count = 0
    // }

    this.onProductUpdate(this.cartItems, productId, amount);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((sum, current) => sum + current.count, 0 )
  }

  getTotalPrice() {
    return this.cartItems.reduce((sum, current) => sum + current.product.price*current.count, 0 )
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${(product.price*count).toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();    
    this.modal.setTitle('Your order');
      for (let item of this.cartItems) {
        this.modal.setBody(this.renderProduct(item.product, item.count));                            
      }
      this.modal.setBody(this.renderOrderForm());
      this.modal.open();
      this.buttonPlus = this.modal.elem.querySelectorAll('.cart-counter__button_plus')
      for (let element of this.buttonPlus) {
        element.addEventListener('click', (event) => {          
          let productId = event.target.closest('.cart-product').dataset.productId
          this.updateProductCount(productId, 1)
          this.modal.elem.remove()
          this.renderModal()
        })
      }
      this.buttonMinus = this.modal.elem.querySelectorAll('.cart-counter__button_minus')
      for (let element of this.buttonMinus) {
        element.addEventListener('click', (event) => {          
          let productId = event.target.closest('.cart-product').dataset.productId
          this.updateProductCount(productId, -1)
          this.modal.elem.remove()
          if (this.getTotalCount() > 0) {
            this.renderModal()            
          } else document.body.classList.remove('is-modal-open')          
        })
      }
      this.submitForm = this.modal.elem.querySelector('.cart-form')
      this.submitForm.addEventListener('submit', (event) => this.onSubmit(event))
  }

  onProductUpdate(cartItem) {
    // ...ваш код

    this.cartIcon.update(this);
  }

  onSubmit(event) {
    event.preventDefault();
    this.button = document.querySelector('button[type="submit"]');
    this.button.classList.add('is-loading');
    this.formData = new FormData(this.submitForm)
    this.result =fetch("https://httpbin.org/post", {
      method: "POST",
      body: this.formData
    });
    
    this.result.then(() => this.renderModalOnsubmit() )
  }

  renderModalOnsubmit () {
    this.currentModal = document.querySelector('.modal')
    this.currentModal.remove()
    this.modal = new Modal();
    this.modal.setTitle('Success!');
    this.modal.setBody(createElement(`
    <div class="modal__body-inner">
    <p>
    Order successful! Your order is being cooked :) <br>
    We’ll notify you about delivery time shortly.<br>
    <img src="/assets/images/delivery.gif">
    </p>
    </div>
    `))
    this.modal.open();
    this.cartItems = []
    this.cartIcon.update(this);
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();   

  }
}

