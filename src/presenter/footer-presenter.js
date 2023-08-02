import FooterStatisticsView from "../view/footer-statistics-view.js";
import { render, replace, remove } from "../framework/render.js";

export default class FooterPresenter {
  #container = null;
  #filmsModel = null;
  #footerComponent = null;
  #countFilms = null;
  
  constructor(container, filmsModel) {
    this.#container = container;
    this.#filmsModel = filmsModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
  }

  init = () => { 
    this.#countFilms = this.#filmsModel.films.length;

    const prevHeaderProfileComponent = this.#footerComponent;

    this.#footerComponent = new FooterStatisticsView(this.#countFilms);

    if (prevHeaderProfileComponent === null) {
      render(this.#footerComponent, this.#container)
      return;
    }

    replace(this.#footerComponent, prevHeaderProfileComponent);

    remove(prevHeaderProfileComponent);
  };

  #handleModelEvent = () => {
    this.init();
  }
}