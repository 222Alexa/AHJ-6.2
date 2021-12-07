export default class Storage {
  getPinCards() {
    return JSON.parse(localStorage.getItem("imageCards")) || [];
  }

  save(data) {
    localStorage.setItem("imageCards", JSON.stringify(data));
  }
}
