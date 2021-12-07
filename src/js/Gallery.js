export default class Gallery {
  constructor(container) {
    this.container = container;
    this.board = null;
  }

  createGallery() {
    this.gallery = document.createElement("div");
    this.gallery.classList.add("gallery");
    this.bindToDOM();
  }

  static get markup() {
    return `
    
		  <div class="dnd__box">
        <input class="overlapped" type='file' accept="image/*" multiple>
        
        <h3 class="dnd__title">Drag and Drop files here or Click to select</h3>
      </div>
		  <div class="gallery-wrapper"></div>
		`;
  }

  bindToDOM() {
    this.container.insertAdjacentHTML("afterbegin", this.constructor.markup);
  }
}
