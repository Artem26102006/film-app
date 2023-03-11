import { createElement } from '../render.js';
import { createFilmDetailsInfo } from './film-details-info-view.js';
import { createFilmDetailsControls } from './film-details-controls-view.js';
import { createFilmDetailsCommentsList } from './film-details-comments-list-view.js';
import { createFilmDetailsNewComment } from './film-details-new-comment.js';

const createTemplate = ({filmInfo}, comments) =>
`<section class="film-details">
  <div class="film-details__inner">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>

      ${createFilmDetailsInfo(filmInfo)}  

      ${createFilmDetailsControls()}

    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        ${createFilmDetailsCommentsList(comments)}

        ${createFilmDetailsNewComment()}

      </section>
    </div>
  </div>
</section>`;

export default class FilmDetailsView {
  constructor(film, comments) {
    this.film = film
    this.comments = comments;
  }

  getTemplate() {
    return createTemplate(this.film, this.comments);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
