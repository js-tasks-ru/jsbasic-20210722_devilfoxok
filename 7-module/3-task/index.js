import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
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

  valueChange = (event) => {
    this.value = this.elem.querySelector('.slider__value').innerHTML
    let newValue = new CustomEvent('slider-change', {
      detail: +this.value, 
      bubbles: true
    })
    this.elem.dispatchEvent(newValue)
  }
}
