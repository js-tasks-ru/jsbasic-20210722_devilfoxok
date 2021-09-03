import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 4 }) {
    this.value = value;
    this.elem = createElement(`
    <div class="slider">

    <!--Ползунок слайдера с активным значением-->
    <div class="slider__thumb" style="left: 0%;">
      <span class="slider__value">0</span>
    </div>

    <!--Заполненная часть слайдера-->
    <div class="slider__progress" style="width: 0%;"></div>

    <!--Шаги слайдера-->
    <div class="slider__steps">
    </div>
  </div>
  
    `)
    
    this.steps = steps;    
    this.elem.addEventListener('click', this.stepChange)
    this.elem.addEventListener('click', this.valueChange)
    let thumb = this.elem.querySelector('.slider__thumb');
    thumb.ondragstart = () => false;
    thumb.addEventListener('pointerdown', this.thumbDrug)

    let sliderSteps = this.elem.querySelector('.slider__steps');
    for (let i = 0; i < steps; i++) {
      let step = document.createElement('span');
      sliderSteps.append(step)
      if (i == 0)  {step.classList.add('slider__step-active')}
    }
  }

  stepChange = (event) => {
    let value = this.elem.querySelector('.slider__value')
    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');
    let percent = event.clientX - this.elem.getBoundingClientRect().left;
    let stages = this.steps - 1;
    let relative = percent / this.elem.offsetWidth * stages;
    let valueRound = Math.round(relative)
    value.innerHTML = valueRound
    thumb.style.left = `${Math.round(valueRound * 100 / stages)}%`
    progress.style.width = `${Math.round(valueRound * 100 / stages)}%`
  }

  valueChange = () => {
    this.value = this.elem.querySelector('.slider__value').innerHTML
    let newValue = new CustomEvent('slider-change', {
      detail: +this.value, 
      bubbles: true
    })
    this.elem.dispatchEvent(newValue)
  }

  thumbDrug = (event) => {
    
    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');
    let value = this.elem.querySelector('.slider__value')
    thumb.style.position = 'absolute'
    thumb.style.zIndex = 1000
    let slider = this.elem;
    slider.classList.add('slider_dragging')
    this.elem.append(thumb)
    let steps = this.steps

    moveAt(event.pageX);

  
  function moveAt(pageX) {
    if (pageX > slider.offsetWidth + slider.getBoundingClientRect().left) {
      thumb.style.left = slider.offsetWidth + 'px'
      progress.style.width = slider.offsetWidth + 'px'
      value.innerHTML = steps - 1;
    } else if (pageX < slider.getBoundingClientRect().left) {
      thumb.style.left = 0 + 'px'
      progress.style.width = 0 + 'px'
      value.innerHTML = 0
    } else {      
      let percent = pageX - slider.getBoundingClientRect().left;
      let stages = steps - 1;
      let relative = percent / slider.offsetWidth * stages;
      let valueRound = Math.round(relative)
      value.innerHTML = valueRound 
      thumb.style.left = `${Math.round(relative * 100 / stages)}%`;
      progress.style.width = `${Math.round(relative * 100 / stages)}%`;
       
    }      
  }

  function onMouseMove(event) {
    event.preventDefault()
    moveAt(event.pageX);      
  }

  function stopMove(event) {
    document.removeEventListener('pointermove', onMouseMove);
    document.removeEventListener('pointerup', stopMove);
    thumb.onpointerup = null;
    let percent = event.pageX - slider.getBoundingClientRect().left;
    let stages = steps - 1;
    let relative = percent / slider.offsetWidth * stages;
    let valueRound = Math.round(relative)
    if (valueRound < 0) {valueRound = 0}
    if (valueRound > 4) {valueRound = 4}
    thumb.style.left = `${Math.round(valueRound * 100 / stages)}%`
    progress.style.width = `${Math.round(valueRound * 100 / stages)}%`
    slider.classList.remove('slider_dragging')
    let newValue = new CustomEvent('slider-change', {
      detail: +value.innerHTML, 
      bubbles: true
    })
    slider.dispatchEvent(newValue)
  }

  document.addEventListener('pointermove', onMouseMove);

  document.addEventListener('pointerup', stopMove);
 }
}