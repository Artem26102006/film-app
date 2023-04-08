import FilmsSortView from "../view/films-sort-view.js";
import FilmsView from "../view/films-view.js";
import FilmsListView from "../view/films-list-view.js";
import FilmsListContainerView from "../view/films-list-container-view.js";
import FilmCardView from "../view/film-card-view.js";
import FilmButtonMoreView from "../view/film-button-more-view.js";
import FilmDetailsView from "../view/film-details-view.js";
import NoFilmView from '../view/no-film-view.js';
import { render } from "../render.js";

const FILM_COUNT_PER_STEP = 5;

export default class ListOfFilmsPresenter {
  #films = new FilmsView();
  #filmsList = new FilmsListView();
  #filmsListContainer = new FilmsListContainerView();
  #sortComponent = new FilmsSortView();
  #filmButtonMoreComponent = new FilmButtonMoreView();
  #noFilmComponent = new NoFilmView();
  #renderedFilmCount = FILM_COUNT_PER_STEP;
  #filmDetailsComponent = null;
  #container = null;
  #filmsModel = null;
  #commentsModel = null;
  #mockFilms = [];

  constructor(container, filmsModel, commentsModel) {
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init = () => {
    this.#mockFilms = [...this.#filmsModel.films];

    this.#renderFilms();
  };

  #renderFilms = () => {
    render(this.#sortComponent, this.#container);
    render(this.#films, this.#container);
    render(this.#filmsList, this.#films.element);
    render(this.#filmsListContainer, this.#filmsList.element);

    if (this.#mockFilms.length === 0) {
      render(this.#noFilmComponent, this.#filmsListContainer.element);
    } else {
      for (let i = 0; i < Math.min(this.#mockFilms.length, FILM_COUNT_PER_STEP); i++) {
        const film = this.#mockFilms[i];
        this.#renderFilm(film);
      }
  
      if (this.#mockFilms.length > FILM_COUNT_PER_STEP) {
        render(this.#filmButtonMoreComponent, this.#filmsList.element);
  
        this.#filmButtonMoreComponent.element.addEventListener("click", this.#handLoadMoreButtonClick);
      }
    }
  }

  #handLoadMoreButtonClick = evt => {
    evt.preventDefault();
    this.#mockFilms
      .slice(
        this.#renderedFilmCount,
        this.#renderedFilmCount + FILM_COUNT_PER_STEP
      )
      .forEach(film => this.#renderFilm(film));

    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.#mockFilms.length) {
      this.#filmButtonMoreComponent.element.remove();
      this.#filmButtonMoreComponent.removeElement();
    }
  };

  #renderFilm = film => {
    const filmComponent = new FilmCardView(film);
    const filmCard = filmComponent.element;

    filmCard.addEventListener("click", () => {
      this.#renderDetailsFilm(film);
      document.addEventListener("keydown", this.#onEscKeyDown);
    });

    render(filmComponent, this.#filmsListContainer.element);
  };

  #renderDetailsFilm = film => {
    const comments = [...this.#commentsModel.get(film)];
    this.#filmDetailsComponent = new FilmDetailsView(film, comments);

    document.body.classList.add("hide-overflow");

    const closeButtonFilmDetailsElement =
      this.#filmDetailsComponent.element.querySelector(
        ".film-details__close-btn"
      );

    closeButtonFilmDetailsElement.addEventListener("click", () => {
      this.#removeFilmDetailsComponent();
      document.removeEventListener("keydown", this.#onEscKeyDown);
    });

    render(this.#filmDetailsComponent, this.#container.parentElement);
  };

  #removeFilmDetailsComponent = () => {
    this.#filmDetailsComponent.element.remove();
    this.#filmDetailsComponent = null;
    document.body.classList.remove("hide-overflow");
  };

  #onEscKeyDown = evt => {
    if (evt.key === "Escape" || evt.key === "Esc") {
      evt.preventDefault();
      this.#removeFilmDetailsComponent();
      document.removeEventListener("keydown", this.#onEscKeyDown);
    }
  };
}
