import FilmCardView from "../view/film-card-view.js"
import { remove, render } from '../framework/render.js'

export default class FilmPresenter {
  #film = null;
  #filmsListContainer = null;
  #setBtnClickHandler = null;

  constructor(listContainer, setBtnClickHandler) {
    this.#filmsListContainer = listContainer;
    this.#setBtnClickHandler = setBtnClickHandler;
  }

  init = film => {
    this.#film = film;
    const filmComponent = new FilmCardView(this.#film);

    filmComponent.setFilmClickHandler(this.#setBtnClickHandler, film);
    render(filmComponent, this.#filmsListContainer);
  }
}