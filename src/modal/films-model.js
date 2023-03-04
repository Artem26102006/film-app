import { generateFilms } from '../fish/films-data.js';

export default class FilmsModel {
    films = generateFilms();

    getFilms = () => this.films;
}