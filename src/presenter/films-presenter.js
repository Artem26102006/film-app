import { render } from "../framework/render.js";
import FilmsSortView from "../view/films-sort-view.js";
import FilmsView from "../view/films-view.js";
import FilmsListView from "../view/films-list-view.js";
import FilmsListContainerView from "../view/films-list-container-view.js";
import FilmButtonMoreView from "../view/film-button-more-view.js";
import NoFilmView from "../view/no-film-view.js";
import FilmDetailsPresenter from "./film-details-presenter.js";

const FILM_COUNT_PER_STEP = 5;

export default class ListOfFilmsPresenter {
  #films = new FilmsView();
  #filmsList = new FilmsListView();
  #filmsListContainer = new FilmsListContainerView();
  #sortComponent = new FilmsSortView();
  #filmButtonMoreComponent = new FilmButtonMoreView();
  #noFilmComponent = new NoFilmView();
  #renderedFilmCount = FILM_COUNT_PER_STEP;
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

  #renderSortFilms = () => {
    render(this.#sortComponent, this.#container);
  };

  #renderFilmsSection = () => {
    render(this.#films, this.#container);
  };

  #renderFilmsList = () => {
    render(this.#filmsList, this.#films.element);
  };

  #renderFilmsContainer = () => {
    render(this.#filmsListContainer, this.#filmsList.element);
  };

  #renderFilmButtonMore = () => {
    render(this.#filmButtonMoreComponent, this.#filmsList.element);

    this.#filmButtonMoreComponent.setButtonClickHandler(this.#handLoadMoreButtonClick);
  };

  #renderNoFilms = () => {
    render(this.#noFilmComponent, this.#filmsListContainer.element);
  }

  #renderFilms = () => {
    this.#renderSortFilms();
    this.#renderFilmsSection();
    this.#renderFilmsList();
    this.#renderFilmsContainer();

    if (this.#mockFilms.length === 0) {
      this.#renderNoFilms();
    } else {
      for (
        let i = 0;
        i < Math.min(this.#mockFilms.length, FILM_COUNT_PER_STEP);
        i++
      ) {
        const film = this.#mockFilms[i];
        this.#renderFilm(film);
      }

      if (this.#mockFilms.length > FILM_COUNT_PER_STEP) {
        this.#renderFilmButtonMore();
      }
    }
  };

  #handLoadMoreButtonClick = () => {
    this.#mockFilms
      .slice(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach(film => this.#renderFilm(film));

    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.#mockFilms.length) {
      this.#filmButtonMoreComponent.element.remove();
      this.#filmButtonMoreComponent.removeElement();
    }
  };

  #renderFilm = film => {
    const filmComponent = new FilmDetailsPresenter(this.#container, this.#commentsModel, this.#filmsListContainer.element);
    filmComponent.init(film);
  };
}
