import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render();
  }
  render () {
    this.elem = createElement('<div class="products-grid"><div class="products-grid__inner"></div></div>')
    this.grid__inner = this.elem.querySelector('.products-grid__inner')
    for (let product of this.products) {  
      if (this.filters.noNuts == true && product.nuts) continue;
      if (this.filters.vegeterianOnly == true && !product.vegeterian) continue;
      if (this.filters.category && product.category != this.filters.category) continue;
      if (this.filters.maxSpiciness && product.spiciness > this.filters.maxSpiciness) continue;
      let card = new ProductCard(product);
      this.grid__inner.append(card.elem);       
    }    
  }
  updateFilter(filter) {
    Object.assign(this.filters, filter)
    this.render()
    let container = document.querySelector('.products-grid')
    container.innerHTML = ''
    container.append(this.elem)
  }
}
