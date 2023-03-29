import { generateFilms } from '../fish/films.js';

export default class FilmsModel {
    #films = generateFilms();

    get = () => this.#films;
}