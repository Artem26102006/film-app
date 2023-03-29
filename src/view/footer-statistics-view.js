import { createElement } from "../render.js";

const createFooterStatisticsViewTemplate = () =>
  `<section class="footer__statistics">
        <p>130 291 movies inside</p>
    </section>`;

export default class FooterStatisticsView {
  #element = null;

  get template() {
    return createFooterStatisticsViewTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
