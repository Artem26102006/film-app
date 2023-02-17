import { render } from './render.js';
import HeaderProfileView from './view/header-profile-view.js';
import FilmsFiltersView from './view/films-filters-view.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
import ListOfFilmsPresenter from './presenter/films-presenter.js';

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');
const listOfFilms = new ListOfFilmsPresenter();

render(new HeaderProfileView(), header);
render(new FilmsFiltersView(), main);
render(new FooterStatisticsView(), footer);
listOfFilms.init(main);