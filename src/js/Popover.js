export default class Popover {
  constructor(container) {
    this.container = container;
  }

  init() {
    this.bindToDOM();
  }

  static get markUp() {
    return `
	<div class="tooltip">
		<div class="tooltip_content">
			<h3 class="tooltip_title"></h3>
			<p class="tooltip_text"></p>
		</div>
</div>
`;
  }

  get tooltip() {
    return this.container.querySelector(".tooltip");
  }

  get tooltipText() {
    return this.container.querySelector(".tooltip_text");
  }

  set tooltipText(text) {
    return (this.container.querySelector(".tooltip_text").textContent = text);
  }

  bindToDOM() {
    this.container.insertAdjacentHTML("beforeend", this.constructor.markUp);
  }
}
