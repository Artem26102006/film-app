import Observable from "../framework/observable.js";
import { generateComments } from "../fish/comments.js";

export default class CommentsModel extends Observable {
  #filmsModel = null;
  #allComments = [];
  #comments = [];

  constructor(filmsModel) {
    super();
    this.#filmsModel = filmsModel;
    this.#generateAllComments();
  }

  #generateAllComments() {
    this.#allComments = generateComments(this.#filmsModel.films);
  }

  get = film => {
    this.#comments = film.comments.map(commentId =>
      this.#allComments.find(comment => comment.id === commentId)
    );

    return this.#comments;
  };

  addComment = (updateType, update) => {
    this.#allComments.push(update);
    console.log(this.#allComments);
    this._notify(updateType, update);
  };

  deleteComment = (updateType, update) => {
    const index = this.#allComments.findIndex(commnet => {
      commnet.id === update.id;
    });

    this.#allComments = [
      ...this.#allComments.slice(0, index),
      ...this.#allComments.slice(index + 1),
    ];

    this._notify(updateType);
  };
}
