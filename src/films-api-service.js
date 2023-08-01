import ApiService from "./framework/api-service.js";

const Method = {
  GET: "GET",
  PUT: "PUT",
};

export default class FilmsApiService extends ApiService {
  get films() {
    return this._load({ url: "movies" }).then(ApiService.parseResponse);
  }

  updateFilm = async film => {
    const response = await this._load({
      url: `movies/film_${film.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(film)),
      headers: new Headers({ "Content-Type": "application/json" }),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  #adaptToServer = film => {
    const adaptedFilm = {
      ...film,
      "film_info": film.filmInfo,
      "user_details": {
        "watchlist": film.userDetails.watchlist,
        "already_watched": film.userDetails.alreadyWatched,
        "watching_date": film.userDetails.watchingDate,
        "favorite": film.userDetails.favorite,
      },
    };

    delete adaptedFilm.filmInfo;
    delete adaptedFilm.userDetails;

    return adaptedFilm;
  };
}
