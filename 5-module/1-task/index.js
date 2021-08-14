function hideSelf() {
  // ваш код...
  let hideButton = document.querySelector(".hide-self-button");
  hideButton.addEventListener('click', function() {
    hideButton.setAttribute('hidden', true);
  })
}
