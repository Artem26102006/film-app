import { render } from '../render.js';
import { getRandomNum } from '../util.js';
import FilmsSortView from '../view/films-sort-view.js';
import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmCardView from '../view/film-card-view.js'
import FilmButtonMoreView from '../view/film-button-more-view.js';
import FilmDetailsView from '../view/film-details-view.js';

export default class ListOfFilmsPresenter {
    films = new FilmsView(); 
    filmsList = new FilmsListView();
    filmsListContainer = new FilmsListContainerView();

    init = (container, filmsModel, commentsModel) => {
        this.container = container;
        this.filmsModel = filmsModel;
        this.commentsModel = commentsModel;
        this.mockFilms = [...this.filmsModel.get()];

        render(new FilmsSortView(), this.container);
        render(this.films, this.container);
        render(this.filmsList, this.films.getElement());
        render(this.filmsListContainer, this.filmsList.getElement());

        for (let i = 0; i < this.mockFilms.length; i++) {
            render(new FilmCardView(this.mockFilms[i]), this.filmsListContainer.getElement());
        }

        const comments = [...this.commentsModel.get(this.mockFilms[0])];

        render(new FilmButtonMoreView(), this.filmsList.getElement());
        render(new FilmDetailsView(this.mockFilms[0], comments), this.container.parentElement);
    }
}