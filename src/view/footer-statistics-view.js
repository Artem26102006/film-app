import { createElement } from "../render.js";

const createTemplate = () =>
  `<section class="footer__statistics">
        <p>130 291 movies inside</p>
    </section>`;

export default class FooterStatisticsView {
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
