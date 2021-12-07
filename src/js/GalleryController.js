import Card from "./Card";
import Storage from "./Storage";
import Popover from "./Popover";

export default class CardController {
  constructor(gallery) {
    this.gallery = gallery;
    this.state = [];
  }

  init() {
    this.gallery.createGallery();
    this.container = document.querySelector(".dnd__box");
    this.cardsBox = document.querySelector(".gallery-wrapper");
    this.input = document.querySelector(".overlapped");
    this.addDropElEventListener();
    this.addSubscribe(this.container);
    this.galleryListeners(this.cardsBox);

    // this.storage = new Storage();
    // this.state = this.storage.getPinCards();
    // this.loadState(this.state);
  }

  addSubscribe(element) {
    element.addEventListener("click", this.onClick.bind(this));
    element.addEventListener("change", this.onUpload.bind(this));
  }

  galleryListeners(element) {
    element.addEventListener("click", this.onClickDeleteCard.bind(this));
  }

  addDropElEventListener() {
    const dropEl = document.querySelector(".dnd__box");

    dropEl.addEventListener("dragover", (evt) => {
      evt.preventDefault();
    });

    dropEl.addEventListener("drop", (evt) => {
      evt.preventDefault();

      let files = Array.from(evt.dataTransfer.files);

      files = files.filter((el) => el.type.match(/image\/./));

      files.forEach((e) => {
        this.onUpload({ target: evt.dataTransfer });
      });
    });
  }

  onClick(e) {
    console.log("onclick");
    e.preventDefault();

    this.input.dispatchEvent(new MouseEvent("click"));

    // console.log(this.file, "file");
    if (this.file) {
      this.addCard(this.file.name, this.url);
    }
  }

  onUpload(e) {
    console.log("upload");

    const { target } = e;

    this.file = target.files && target.files[0];

    // console.log(file.name, 'file');//обрезать расширение и исплоьзовать название в формировании карточки
    this.url = URL.createObjectURL(this.file);
    // console.log(url, "url");
    // console.log(file, "file");

    const reader = new FileReader();
    // console.log(reader, 'reader')

    reader.readAsDataURL(this.file);

    reader.onload = () => {
      this.addCard(this.file.name, reader.result);

      // console.log(reader.result, 'res')
      const searchUrl = [...document.querySelectorAll(".picture")].find(
        (el) => {
          return el.src === reader.result;
        }
      );
      // console.log(searchUrl, "searchUrl");
      setTimeout(() => URL.revokeObjectURL(this.file), 6000);
      setTimeout(() => searchUrl.dispatchEvent(new MouseEvent("click")));
    };
  }

  static templateImg(name, url) {
    return `
    <img class="picture" alt="${name}" src="${url}">
    `;
  }

  addCard(name, url) {
    const card = new Card(name, url);
    card.init();
    const imageCard = document.querySelectorAll(".image-card");
    const searchItem = [...imageCard].find((el) => {
      return el.classList.contains("empty");
    });

    const picture = this.constructor.templateImg(name, url);
    searchItem.insertAdjacentHTML("beforeend", picture);
    searchItem.classList.remove("empty");
    return card;
  }

  onClickDeleteCard(e) {
    if (!e.target.classList.contains("image-card__del")) {
      return;
    }
    e.preventDefault();
    e.target.parentElement.remove();
  }
}
