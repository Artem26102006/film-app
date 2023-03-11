import { formatStringToDate } from '../util.js';

const generateComment = comments => {
  return comments.map(comment => {
    const {emotion, date, text, author} = comment;
    return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
    </span>
    <div>
      <p class="film-details__comment-text">${text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${formatStringToDate(date)}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`;
  });
};

export const createFilmDetailsCommentsList = comments =>
  `<ul class="film-details__comments-list">
    ${generateComment(comments)}
  </ul>`;
