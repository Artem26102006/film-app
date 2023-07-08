import { render } from "./framework/render.js";
import HeaderProfileView from "./view/header-profile-view.js";
import FilterPresenter from "./presenter/filter-presenter.js";
import FooterStatisticsView from "./view/footer-statistics-view.js";

import ListOfFilmsPresenter from "./presenter/films-presenter.js";
import FilmsModel from "./modal/films-model.js";
import CommentsModel from "./modal/comments-model.js";
import FilterModel from "./modal/filter-model.js";

import {getUserStatus} from './utils/user.js';

const bodyElement = document.querySelector('body');
const header = bodyElement.querySelector(".header");
const main = bodyElement.querySelector(".main");
const footer = bodyElement.querySelector(".footer");

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel(filmsModel);
const filterModel = new FilterModel();

const listOfFilms = new ListOfFilmsPresenter(main, filmsModel, commentsModel, filterModel);
const filterPresenter = new FilterPresenter(main, filterModel, filmsModel);

const userStatus = getUserStatus(filmsModel.films);
const filmCount = filmsModel.films.length;


render(new HeaderProfileView(userStatus), header);
render(new FooterStatisticsView(filmCount), footer);

filterPresenter.init();
listOfFilms.init();