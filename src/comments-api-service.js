import ApiService from "./framework/api-service.js";

const Method = {
  GET: "GET",
  POST: "POST",
  DELETE: "DELETE",
  POST: "POST",
};

export default class CommentsApiService extends ApiService {
  get = id => {
    return this._load({ url: `comments/${id}` }).then(ApiService.parseResponse);
  };

  addNewComment = async (comment, film) => {
    const response = await this._load({
      url: `comments/${film.id}`,
      method: Method.POST,
      body: JSON.stringify(comment),
      headers: new Headers({'Content-Type': 'application/json'})
    });
    
    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  deleteComment = async comment => {
    await this._load({
      url: `comments/${comment.id}`,
      method: Method.DELETE,
      headers: new Headers({ "Content-Type": "application/json" }),
    });
  };
}
