import FilmsSortView from "../view/films-sort-view.js";
import FilmsView from "../view/films-view.js";
import FilmsListView from "../view/films-list-view.js";
import FilmsListContainerView from "../view/films-list-container-view.js";
import FilmCardView from "../view/film-card-view.js";
import FilmButtonMoreView from "../view/film-button-more-view.js";
import FilmDetailsView from "../view/film-details-view.js";
import { render } from "../render.js";

export default class ListOfFilmsPresenter {
  #films = new FilmsView();
  #filmsList = new FilmsListView();
  #filmsListContainer = new FilmsListContainerView();
  #sortComponent = new FilmsSortView();
  #FilmButtonMoreView = new FilmButtonMoreView();
  #container = null;
  #filmsModel = null;
  #commentsModel = null;
  #mockFilms = [];

  init = (container, filmsModel, commentsModel) => {
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;

    this.#mockFilms = [...this.#filmsModel.films];

    render(this.#sortComponent, this.#container);
    render(this.#films, this.#container);
    render(this.#filmsList, this.#films.element);
    render(this.#filmsListContainer, this.#filmsList.element);

    for (let i = 0; i < this.#mockFilms.length; i++) {
      this.#renderFilm(this.#mockFilms[i])
    }

    render(this.#FilmButtonMoreView, this.#filmsList.element);

    // const comments = [...this.#commentsModel.get(this.#mockFilms[0])];
    // render(new FilmDetailsView(this.#mockFilms[0], comments), this.#container.parentElement);
  };

  #renderFilm = (film) => {
    const filmComponent = new FilmCardView(film);
    const comments = [...this.#commentsModel.get(film)];
    const filmDetailsComponent = new FilmDetailsView(film, comments);
    console.log(filmDetailsComponent)

    render(filmComponent, this.#filmsListContainer.element)
  }
}
