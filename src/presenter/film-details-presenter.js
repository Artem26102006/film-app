import FilmDetailsView from '../view/film-details-view.js';
import { remove, render, replace } from '../framework/render.js'

export default class FilmDetailsPresenter {
  #filmDetailsComponent = null;
  #container = null;
  #filmComments = null;
  #closeBtnFilmDetails = null;
  #escClose = null;
  #film = null;
  #comments = null

  constructor(container, filmComments, closeBtnFilmDetails, escCLose) {
    this.#container = container;
    this.#filmComments = filmComments;
    this.#closeBtnFilmDetails = closeBtnFilmDetails;
    this.#escClose = escCLose;
  }

  init = (film) => {
    this.#comments = [...this.#filmComments.get(film)];
    this.#film = film;
    
    const prevFilmDetailsComponent = this.#filmDetailsComponent;

    this.#filmDetailsComponent = new FilmDetailsView(this.#film, this.#comments);

    document.body.classList.add("hide-overflow");
    document.addEventListener("keydown", this.#escClose);

    this.#filmDetailsComponent.setFilmDetailsClickHandler(this.#closeBtnFilmDetails);

    if (prevFilmDetailsComponent === null) {
      render(this.#filmDetailsComponent, this.#container.parentElement);
      return;
    }

    replace(this.#filmDetailsComponent, prevFilmDetailsComponent);

    remove(prevFilmDetailsComponent);
  }

  destroy = () => {
    remove(this.#filmDetailsComponent);
  };
}
