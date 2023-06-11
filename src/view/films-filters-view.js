import AbstractView from "../framework/view/abstract-view.js";

const FILTER_TYPE_ALL_NAME = 'All movies';

const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites',
};

const createFilterItemTemplate = ({name, count}, isActive) => {
  const getFilterName = (filterName) =>
    (filterName === FilterType.ALL)
      ? FILTER_TYPE_ALL_NAME
      : `${filterName.charAt(0).toUpperCase()}${filterName.slice(1)}`;

  const getFilterTextContent = (filterName) =>
    (filterName !== FilterType.ALL)
      ? `<span class="main-navigation__item-count">${count}</span>`
      : '';

  return `
    <a
      href="#${name}"
      class="
        main-navigation__item
        ${(isActive) ? 'main-navigation__item--active' : ''}
      "
    >
      ${getFilterName(name)}
      ${getFilterTextContent(name)}
    </a>
  `;
};

const createFilmsFiltersViewTemplate = (filters) => {
  const filterItems = filters
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
    .join('');

  return `
    <nav class="main-navigation">
      ${filterItems}
    </nav>
  `;
};

export default class FilmsFiltersView extends AbstractView {
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters
  }

  get template() {
    return createFilmsFiltersViewTemplate(this.#filters);
  }
}
