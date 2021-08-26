import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = createElement(
      `<!--Корневой элемент RibbonMenu-->
      <div class="ribbon">
        <!--Кнопка прокрутки влево-->
        <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
    
        <!--Ссылки на категории-->
        <nav class="ribbon__inner">
          <a href="#" class="ribbon__item ribbon__item_active" data-id="">All</a>
          <a href="#" class="ribbon__item" data-id="salads">Salads</a>
          <a href="#" class="ribbon__item" data-id="soups">Soups</a>
          <a href="#" class="ribbon__item" data-id="chicken-dishes">Chicken dishes</a>
          <a href="#" class="ribbon__item" data-id="beef-dishes">Beef dishes</a>
          <a href="#" class="ribbon__item" data-id="seafood-dishes">Seafood dishes</a>
          <a href="#" class="ribbon__item" data-id="vegetable-dishes">Vegetable dishes</a>
          <a href="#" class="ribbon__item" data-id="bits-and-bites">Bits and bites</a>
          <a href="#" class="ribbon__item" data-id="on-the-side ribbon__item_active">On the side</a>
        </nav>
    
        <!--Кнопка прокрутки вправо-->
        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>`
    )
    let arrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    let arrowRight = this.elem.querySelector('.ribbon__arrow_right');
    let ribbonInner = this.elem.querySelector('.ribbon__inner');
    let ribbonItems = this.elem.querySelectorAll('.ribbon__item')
    arrowRight.addEventListener('click', () => this.moveRight());
    arrowLeft.addEventListener('click', () => this.moveLeft());
    ribbonInner.addEventListener('scroll', () => this.checkVisibility())   
    arrowLeft.classList.remove('ribbon__arrow_visible')
    for (let item of ribbonItems) {
      item.addEventListener('click', this.ribbonChoose)
    }
  }
  moveLeft () {
    let ribbonInner = this.elem.querySelector('.ribbon__inner');
    let result = ribbonInner.scrollBy(-350, 0);
  }

  moveRight () {
    let ribbonInner = this.elem.querySelector('.ribbon__inner');
    ribbonInner.scrollBy(350, 0);    
  }

  checkVisibility () {    
    let arrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    let arrowRight = this.elem.querySelector('.ribbon__arrow_right');
    let ribbonInner = this.elem.querySelector('.ribbon__inner');
    let scrollWidth = ribbonInner.scrollWidth;
    let scrollLeft = ribbonInner.scrollLeft;
    let clientWidth = ribbonInner.clientWidth;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;
    scrollRight < 1 ? arrowRight.classList.remove('ribbon__arrow_visible') 
    : arrowRight.classList.add('ribbon__arrow_visible')
    scrollLeft < 1 ? arrowLeft.classList.remove('ribbon__arrow_visible') 
    : arrowLeft.classList.add('ribbon__arrow_visible')
  }

  ribbonChoose = (event) => {
    let ribbonSelect = new CustomEvent('ribbon-select', {
      detail: event.target.closest('.ribbon__item').dataset.id, 
      bubbles: true,
      cancelable: true
    })
    event.preventDefault();
    this.elem.dispatchEvent(ribbonSelect);
    this.elem.querySelector('.ribbon__item_active').classList.remove('ribbon__item_active');
    event.target.closest('.ribbon__item').classList.add('ribbon__item_active');
  }

}
