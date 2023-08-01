import Observable from "../framework/observable.js";
import { UpdateType } from "../const.js";
export default class CommentsModel extends Observable {
  #commentsApiService = null;
  #comments = [];

  constructor(commentsApiService) {
    super();
    this.#commentsApiService = commentsApiService;
  }

  comment = async (id) => {
    this.#comments = await this.#commentsApiService.get(id);
    return this.#comments;
  }
  // get = film => {
  //   this.#comments = film.comments.map(commentId =>
  //     this.#allComments.find(comment => comment.id === commentId)
  //   );

  //   return this.#comments;
  // };

  // addComment = (updateType, update) => {
  //   this.#allComments.push(update);
  //   console.log(this.#allComments);
  //   this._notify(updateType, update);
  // };

  // deleteComment = (updateType, update) => {
  //   const index = this.#allComments.findIndex(comment => {
  //     comment.id === update.id;
  //   });

  //   this.#allComments = [
  //     ...this.#allComments.slice(0, index),
  //     ...this.#allComments.slice(index + 1),
  //   ];

  //   this._notify(updateType);
  // };
}
