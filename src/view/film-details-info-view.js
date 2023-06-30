import { formatMinutesToTime, formatStringToDate } from "../util.js";

const generateGenreList = genres => {
  return genres
    .map(genre => {
      return `<span class="film-details__genre">${genre}</span>`;
    })
    .join("");
};

const generateGenreTitle = genres => {
  return genres.length > 1 ? "Genres" : "Genre";
};

export const createFilmDetailsInfo = ({
  title,
  alternativeTitle,
  director,
  writers,
  actors,
  description,
  totalRating,
  ageRating,
  release,
  genre,
  poster,
  runtime,
}) => {
  return `<div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./${poster}" alt="">

          <p class="film-details__age">${ageRating}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${alternativeTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${totalRating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${formatStringToDate(
                release.date
              )}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${formatMinutesToTime(
                runtime
              )}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${release.releaseСountry}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${generateGenreTitle(genre)}</td>
              <td class="film-details__cell">
                ${generateGenreList(genre)}
              </td>
            </tr>
          </table>

          <p class="film-details__film-description">
            ${description}
          </p>
        </div>
      </div>`;
};
