function initCarousel() {
  // ваш код...
  let arrowRight = document.querySelector('.carousel__arrow_right');
  let arrowLeft = document.querySelector('.carousel__arrow_left');
  let carousel = document.querySelector('.carousel__inner');
  let carouselWidth = carousel.offsetWidth
  let currentSlide = 0;
  if (currentSlide == 0)  {arrowLeft.style.display = 'none'}

  arrowRight.addEventListener('click', () => {
    
    if (currentSlide < 3){
    currentSlide += 1;
    carousel.style.transform = `translateX(-${carouselWidth * currentSlide}px)`;
    arrowLeft.style.display = '';
  }

   if (currentSlide == 3)  {arrowRight.style.display = 'none'}

})

  arrowLeft.addEventListener('click', () => {
    if (currentSlide > 0) {
    currentSlide -= 1;
    carousel.style.transform = `translateX(-${carouselWidth * currentSlide}px)`;
    arrowRight.style.display = '';    
  }

  if (currentSlide == 0)  {arrowLeft.style.display = 'none'}

})
}