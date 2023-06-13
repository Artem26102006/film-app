import FilmDetailsView from '../view/film-details-view.js';
import FilmCardView from "../view/film-card-view.js"
import { render } from '../framework/render.js'

export default class FilmDetailsPresenter {
  #container = null;
  #filmDetailsComponent = null;
  #filmComments = null;
  #filmsListContainer = null;

  constructor(container, filmComments, listContainer) {
    this.#container = container;
    this.#filmComments = filmComments
    this.#filmsListContainer = listContainer;
  }

  init = (film) => {
    const filmComponent = new FilmCardView(film);

    filmComponent.setFilmClickHandler(this.#renderDetailsFilm, film);

    render(filmComponent, this.#filmsListContainer);
  }

  #renderDetailsFilm = (film) => {
    const comments = [...this.#filmComments.get(film)];
    this.#filmDetailsComponent = new FilmDetailsView(film, comments);

    document.body.classList.add("hide-overflow");
    document.addEventListener("keydown", this.#onEscKeyDown);

    this.#filmDetailsComponent.setFilmDetailsClickHandler(
      this.#removeFilmDetailsComponent
    );

    render(this.#filmDetailsComponent, this.#container.parentElement);
  }

  #removeFilmDetailsComponent = () => {
    this.#filmDetailsComponent.element.remove();
    this.#filmDetailsComponent = null;
    document.body.classList.remove("hide-overflow");
    document.removeEventListener("keydown", this.#onEscKeyDown);
  };

  #onEscKeyDown = evt => {
    if (evt.key === "Escape" || evt.key === "Esc") {
      evt.preventDefault();
      this.#removeFilmDetailsComponent();
      document.removeEventListener("keydown", this.#onEscKeyDown);
    }
  };
}
