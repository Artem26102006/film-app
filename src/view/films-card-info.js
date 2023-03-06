import { humanizeFilmDueDate, formatMinutesToTime } from "../util.js"
export const createFilmCardInfo = ({title, totalRating, poster, description, genre, release, runtime}) => {
  const date = release.date !== null ? humanizeFilmDueDate(release.date) : '';
  return (`
    <a class="film-card__link">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${date}</span>
        <span class="film-card__duration">${formatMinutesToTime(runtime)}</span>
        <span class="film-card__genre">${genre[0]}</span>
      </p>
      <img src="./${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <span class="film-card__comments">5 comments</span>
    </a>
  `)
}