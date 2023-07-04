import Observable from '../framework/observable.js';
import { generateFilms } from '../fish/films.js';

export default class FilmsModel extends Observable {
    #films = generateFilms();

    get films() {
        return this.#films;
    }

    updateItem = (items, update) => {
        const index = items.findIndex(item => item.id === update.id);
      
        if (index === -1) {
          return items;
        }
      
        return [...items.slice(0, index), update, ...items.slice(index + 1)];
      };
}