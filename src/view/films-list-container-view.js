import { createElement } from "../render.js";

const createTemplate = () => `<div class="films-list__container"></div>`;

export default class FilmsListContainerView {
  getTemplate() {
    return createTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
