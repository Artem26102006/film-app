import FilterPresenter from "./presenter/filter-presenter.js";
import HeaderProfilePresenter from "./presenter/header-profile-presenter.js";
import FooterPresenter from "./presenter/footer-presenter.js";
import ListOfFilmsPresenter from "./presenter/films-presenter.js";
import FilmsModel from "./modal/films-model.js";
import CommentsModel from "./modal/comments-model.js";
import FilterModel from "./modal/filter-model.js";
import FilmsApiService from "./films-api-service.js";
import CommentsApiService from "./comments-api-service.js";

const AUTHORIZATION = "Basic 3h04k90t3y";
const END_POINT = "https://17.ecmascript.pages.academy/cinemaddict";

const bodyElement = document.querySelector("body");
const header = bodyElement.querySelector(".header");
const main = bodyElement.querySelector(".main");
const footer = bodyElement.querySelector(".footer");

const filmsModel = new FilmsModel(
  new FilmsApiService(END_POINT, AUTHORIZATION)
);
const commentsModel = new CommentsModel(
  new CommentsApiService(END_POINT, AUTHORIZATION),
  filmsModel
);
const filterModel = new FilterModel();

const listOfFilms = new ListOfFilmsPresenter(
  main,
  filmsModel,
  commentsModel,
  filterModel
);
const filterPresenter = new FilterPresenter(main, filterModel, filmsModel);
const headerProfile = new HeaderProfilePresenter(header, filmsModel);
const footerStatic = new FooterPresenter(footer, filmsModel);

headerProfile.init();
footerStatic.init();
filterPresenter.init();
listOfFilms.init();
filmsModel.init();
