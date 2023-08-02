import Observable from "../framework/observable.js";
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

  addComment = async (comment, film) => {
    try {
      const response = await this.#commentsApiService.addNewComment(comment, film);
      console.log(response)
      this.#comments = response.comments;

    } catch {
      throw new Error('Can\'t add comment');
    }
  };

  deleteComment = async (update) => {
    const index = this.#comments.indexOf(update);

    try {
      await this.#commentsApiService.deleteComment(update);

      this.#comments = [
        ...this.#comments.slice(0, index),
        ...this.#comments.slice(index + 1),
      ];

    } catch(err) {
      throw new Error("Error");
    }
  };
}
