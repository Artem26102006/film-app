import HeaderProfileView from "../view/header-profile-view.js";
import {getUserStatus} from '../utils/user.js';
import { render, replace, remove } from "../framework/render.js";

export default class HeaderProfilePresenter {
  #container = null;
  #filmsModel = null;
  #headerProfileComponent = null;
  #userStatus = null;
  
  constructor(container, filmsModel) {
    this.#container = container;
    this.#filmsModel = filmsModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
  }

  init = () => { 
    this.#userStatus = getUserStatus(this.#filmsModel.films);

    const prevHeaderProfileComponent = this.#headerProfileComponent;

    this.#headerProfileComponent = new HeaderProfileView(this.#userStatus);

    if (prevHeaderProfileComponent === null) {
      render(this.#headerProfileComponent, this.#container)
      return;
    }

    replace(this.#headerProfileComponent, prevHeaderProfileComponent);

    remove(prevHeaderProfileComponent);
  };

  #handleModelEvent = () => {
    this.init();
  }
}