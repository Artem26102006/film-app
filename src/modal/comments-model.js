import Observable from "../framework/observable.js";
export default class CommentsModel extends Observable {
  #commentsApiService = null;
  #comments = [];
  #filmsModel = null;

  constructor(commentsApiService, filmsModel) {
    super();
    this.#commentsApiService = commentsApiService;
    this.#filmsModel = filmsModel;
  }

  comment = async id => {
    this.#comments = await this.#commentsApiService.get(id);
    return this.#comments;
  };

  addComment = async (updateType, comment, film) => {
    try {
      const response = await this.#commentsApiService.addNewComment(
        comment,
        film
      );

      this.#comments = response.comments;

      this.#filmsModel.updateOnClient({
        updateType,
        update: this.#adaptToClient(response.movie),
      });
    } catch {
      throw new Error("Can't add comment");
    }
  };

  deleteComment = async (updateType, film, update) => {
    const index = this.#comments.findIndex(comment => comment.id === update.id);

    try {
      await this.#commentsApiService.deleteComment(update);

      const updateFilm = {
        ...film,
        comments: [
          ...film.comments.slice(0, index),
          ...film.comments.slice(index + 1),
        ],
      };

      this.#filmsModel.updateOnClient({
        updateType,
        update: updateFilm,
      });
    } catch (err) {
      throw new Error("Error");
    }
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
          date: film["film_info"]["release"]["date"],
          releaseCountry: film["film_info"]["release"]["release_country"],
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
