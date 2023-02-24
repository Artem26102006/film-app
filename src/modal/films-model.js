import { generateFilm } from '../fish/films-data.js';

export default class FilmsModel {
    films = Array.from({length: 5}, generateFilm);

    getFilms = () => this.films;
}