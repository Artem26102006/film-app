import Observable from "../framework/observable.js";
import { generateFilms } from "../fish/films.js";

export default class FilmsModel extends Observable {
  #filmsApiService = null;
  #films = generateFilms();

  constructor(filmsApiService) {
    super();
    this.#filmsApiService = filmsApiService;

    this.#filmsApiService.films.then((films) => {
      console.log(films.map(this.#adaptToClient))
      // ... 
    });
  }

  get films() {
    return this.#films;
  }

  update = (updateType, update) => {
    const index = this.#films.findIndex(item => item.id === update.id);

    if (index === -1) {
      return items;
    }

    this.#films = [
      ...this.#films.slice(0, index),
      update,
      ...this.#films.slice(index + 1),
    ];
    
    this._notify(updateType, update);
  };

  #adaptToClient = film => {
    const adaptedFilm = {
      ...film,
      filmInfo: film['film_info'],
      userDetails: {
        watchlist: film['user_details']['watchlist'],
        alreadyWatched: film['user_details']['already_watched'],
        watchingDate: film['user_details']['watching_date'],
        favorite: film['user_details']['favorite'],
      },
    };

    delete adaptedFilm['film_info'];
    delete adaptedFilm['user_details'];

    return adaptedFilm;
  };
}
