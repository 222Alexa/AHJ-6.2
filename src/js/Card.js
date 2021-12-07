export default class Card {
  constructor(name, url) {
    this.name = name;
    this.url = url;
  }

  init() {
    this.bindToDOM();
  }

  static template(name, url) {
    return `
    <div class="image-box">
      <h3 class="image__title">${name}</h3>
      <div class="image-card empty" data-url="${url}">
        
    </div>
      <button class="image-card__del">X</button>
  </div>

`;
  }

  bindToDOM() {
    const cardBox = document.querySelector(".gallery-wrapper");

    const cardImage = this.addTask(this.name, this.url);

    cardBox.insertAdjacentHTML("beforeend", cardImage);
  }

  addTask() {
    if (this.name && this.url) {
      const result = this.constructor.template(this.name, this.url);
      return result;
    }
    return false;
  }
}
