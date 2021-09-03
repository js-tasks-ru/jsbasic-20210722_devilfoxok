import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {    
  }

  async render() {

    this.carousel = new Carousel(slides);
    this.carouselContainerElement = document.body.querySelector('[data-carousel-holder]');
    this.carouselContainerElement.append(this.carousel.elem);

    this.cartIcon = new CartIcon();
    this.cartIconHolder = document.querySelector('[data-cart-icon-holder]');
    this.cartIconHolder.append(this.cartIcon.elem);

    this.ribbon = new RibbonMenu(categories);
    this.ribbonHolder = document.querySelector('[data-ribbon-holder]');
    this.ribbonHolder.append(this.ribbon.elem);

    this.stepSlider = new StepSlider({
      steps: 5
    });
    this.stepSliderHolder = document.querySelector('[data-slider-holder]');
    this.stepSliderHolder.append(this.stepSlider.elem);    
    
    this.cart = new Cart(this.cartIcon);

    let products = await this.productLoad()
    this.productGrid = new ProductGrid(products);
    this.productGridHolder = document.querySelector('[data-products-grid-holder]');        
    this.productGridHolder.append(this.productGrid.elem);  
    this.holderRemove()
    
    this.productGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbon.value
    });

    this.addEventListeners()
  }

  async productLoad() {
    let response = await fetch("products.json"); 
    this.products = await response.json();    
    return this.products;
  }

  holderRemove() {
    this.holder = document.querySelector('.products-grid.is-loading');    
    if (this.holder) {this.holder.remove()}
  }

  addEventListeners() {
    document.body.addEventListener('product-add', (event) => {

      this.addProductId = event.detail;
      this.productToAdd = this.products.find((product) => product.id === this.addProductId);

      if (this.productToAdd) {
        this.cart.addProduct(this.productToAdd);
      }
    })

    this.stepSlider = document.querySelector('.slider')

    if (this.stepSlider) {
      this.stepSlider.addEventListener('slider-change', (event) => {
        this.value = event.detail;
        // console.log(this.value)
        this.productGrid.updateFilter({
          maxSpiciness: this.value
        });
      })
    }
    this.ribbon = document.querySelector('.ribbon')

    if(this.ribbon) {
      this.ribbon.addEventListener('ribbon-select', (event) => {

        this.value = event.detail;
        this.productGrid.updateFilter({
          category: this.value
        });
      })
    }

    this.nutsCheckbox = document.getElementById('nuts-checkbox');
    this.nutsCheckbox.addEventListener('change', () => {
      this.productGrid.updateFilter({ noNuts: event.target.checked });
    });


    this.vegeterianCheckbox = document.getElementById('vegeterian-checkbox');
    this.vegeterianCheckbox.addEventListener('change', () => {
      this.productGrid.updateFilter({ vegeterianOnly: event.target.checked });
    });
  }

}
