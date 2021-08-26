import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem = createElement(`
    <div class="modal">
    <!--Прозрачная подложка перекрывающая интерфейс-->
    <div class="modal__overlay"></div>

    <div class="modal__inner">
      <div class="modal__header">
        <!--Кнопка закрытия модального окна-->
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>

        <h3 class="modal__title">
          Вот сюда нужно добавлять заголовок
        </h3>
      </div>

      <div class="modal__body">
        A сюда нужно добавлять содержимое тела модального окна
      </div>
    </div>

  </div>
    `)

    let closeButton = this.elem.querySelector('.modal__close');
    closeButton.addEventListener('click', this.close)
    
  }
  open = () => {
    document.body.append(this.elem);
    document.body.classList.add('is-modal-open')
    document.addEventListener('keydown', this.handleClose)
  }
  
  setTitle = (titleText) => {
    let titl = this.elem.querySelector('.modal__title')
    titl.innerHTML = titleText
  }

  setBody = (e) => {
    let modalBody = this.elem.querySelector('.modal__body')
    modalBody.innerHTML = '';
    modalBody.append(e)
  }

  

  close = () => {
    this.elem.remove();
    document.body.classList.remove('is-modal-open')
    document.removeEventListener('keydown', this.handleClose)
  }

  handleClose = (event) => {    
      if (event.code === 'Escape' ) {
        this.close()
      }
  }
}
