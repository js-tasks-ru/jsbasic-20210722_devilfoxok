import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = createElement(`
    <!--Корневой элемент карусели-->
    <div class="carousel">
      <!--Кнопки переключения-->
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
  
      <div class="carousel__inner">
        <!--Верстка 1-ого слайда-->
        <div class="carousel__slide" data-id=${slides[0].id}>
          <img src="/assets/images/carousel/penang_shrimp.png" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€16.00</span>
            <div class="carousel__title">Penang shrimp</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
  
        <!--Верстка 2-ого слайда-->
        <div class="carousel__slide" data-id="${slides[1].id}">
          <img src="/assets/images/carousel/chicken_cashew.png" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€14.00</span>
            <div class="carousel__title">Chicken cashew</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
  
        <!--Верстка 3-ого слайда-->
        <div class="carousel__slide" data-id="${slides[2].id}">
          <img src="/assets/images/carousel/red_curry_vega.png" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€12.50</span>
            <div class="carousel__title">Red curry veggies</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
  
        
    </div>
  `)

  let arrowRight = this.elem.querySelector('.carousel__arrow_right');
  let arrowLeft = this.elem.querySelector('.carousel__arrow_left');
  let carousel = this.elem.querySelector('.carousel__inner');
  let carouselWidth
  let currentSlide = 0;
  if (currentSlide == 0)  {arrowLeft.style.display = 'none'}

  arrowRight.addEventListener('click', () => {
    
    if (currentSlide < 3){
    currentSlide += 1;
    carouselWidth = carousel.offsetWidth
    carousel.style.transform = `translateX(-${carouselWidth * currentSlide}px)`;
    arrowLeft.style.display = '';
  }

   if (currentSlide == 2)  {arrowRight.style.display = 'none'}

})

  arrowLeft.addEventListener('click', () => {
    if (currentSlide > 0) {
    currentSlide -= 1;
    carouselWidth = carousel.offsetWidth
    carousel.style.transform = `translateX(-${carouselWidth * currentSlide}px)`;
    arrowRight.style.display = '';    
  }

  if (currentSlide == 0)  {arrowLeft.style.display = 'none'}

})

let buttons = this.elem.querySelectorAll('.carousel__button');

for(let button of buttons) {
  button.addEventListener('click', this.onClick)
}


}
onClick = (event) => {
  let carouselEvent = new CustomEvent('product-add', {
    detail: event.target.closest('.carousel__slide').dataset.id,
    bubbles: true
  })
  this.elem.dispatchEvent(carouselEvent);
}
}
