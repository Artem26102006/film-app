import Observable from "../framework/observable.js";
import { UpdateType } from "../const.js";

export default class FilmsModel extends Observable {
  #filmsApiService = null;
  #films = [];

  constructor(filmsApiService) {
    super();
    this.#filmsApiService = filmsApiService;

    this.#filmsApiService.films.then(films => {
      // ...
    });
  }

  get films() {
    return this.#films;
  }

  init = async () => {
    try {
      const films = await this.#filmsApiService.films;
      this.#films = films.map(this.#adaptToClient);
    } catch (err) {
      this.#films = [];
    }

    this._notify(UpdateType.INIT);
  };

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
      filmInfo: {
        title: film["film_info"]["title"],
        alternativeTitle: film["film_info"]["alternative_title"],
        totalRating: film["film_info"]["total_rating"],
        poster: film["film_info"]["poster"],
        ageRating: film["film_info"]["age_rating"],
        director: film["film_info"]["director"],
        writers: film["film_info"]["writers"],
        actors: film["film_info"]["actors"],
        release: {
          date: film["film_info"]["date"],
          releaseСountry: film["film_info"]["release_country"],
        },
        runtime: film["film_info"]["runtime"],
        genre: film["film_info"]["genre"],
        description: film["film_info"]["description"],
      },
      userDetails: {
        watchlist: film["user_details"]["watchlist"],
        alreadyWatched: film["user_details"]["already_watched"],
        watchingDate: film["user_details"]["watching_date"],
        favorite: film["user_details"]["favorite"],
      },
    };

    delete adaptedFilm["film_info"];
    delete adaptedFilm["user_details"];

    return adaptedFilm;
  };
}
