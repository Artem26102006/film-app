import { render } from "./framework/render.js";
import HeaderProfileView from "./view/header-profile-view.js";
import FilmsFiltersView from "./view/films-filters-view.js";
import FooterStatisticsView from "./view/footer-statistics-view.js";

import ListOfFilmsPresenter from "./presenter/films-presenter.js";
import FilmsModel from "./modal/films-model.js";
import CommentsModel from "./modal/comments-modal.js";

import {getUserStatus} from './utils/user.js';
import {generateFilter} from './fish/filter.js';

const bodyElement = document.querySelector('body');
const header = bodyElement.querySelector(".header");
const main = bodyElement.querySelector(".main");
const footer = bodyElement.querySelector(".footer");
const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel(filmsModel);

const listOfFilms = new ListOfFilmsPresenter(main, filmsModel, commentsModel);

const userStatus = getUserStatus(filmsModel.films);
const filters = generateFilter(filmsModel.films);
const filmCount = filmsModel.films.length;


render(new HeaderProfileView(userStatus), header);
render(new FilmsFiltersView(filters), main);
render(new FooterStatisticsView(filmCount), footer);

listOfFilms.init();