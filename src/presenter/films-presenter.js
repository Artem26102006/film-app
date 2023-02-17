import { render } from '../render.js';
import FilmsSortView from '../view/films-sort-view.js';
import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmCard from '../view/film-card-view.js'
import FilmButtonMoreView from '../view/film-button-more-view.js';
import FilmDetailsView from '../view/film-details-view.js';

export default class ListOfFilmsPresenter {
    films = new FilmsView(); 
    filmsList = new FilmsListView();
    filmsListContainer = new FilmsListContainerView();

    init = (container) => {
        this.container = container;
        render(new FilmsSortView(), this.container);
        render(this.films, this.container);
        render(this.filmsList, this.films.getElement());
        render(this.filmsListContainer, this.filmsList.getElement());

        for (let i = 0; i < 5; i++) {
            render(new FilmCard(), this.filmsListContainer.getElement());
        }

        render(new FilmButtonMoreView(), this.filmsList.getElement());
        render(new FilmDetailsView(), this.container.parentElement);
    }
}