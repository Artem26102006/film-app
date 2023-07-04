const FILM_COUNT = 20;

const FILM_COUNT_PER_STEP = 5;

const EMOTIONS = ['smile', 'sleeping', 'puke', 'angry'];

const FILTER_TYPE_ALL_NAME = 'All movies';

const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites',
};

const UserStatusValue = {
  NOVICE: 0,
  FAN: 10,
  MOVIE_BUFF: 20,
};

const UserStatusTitle = {
  NOVICE: 'Novice',
  FAN: 'Fan',
  MOVIE_BUFF: 'Movie Buff',
};

const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  DELETE_FILM: 'DELETE_FILM',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export {
  FILM_COUNT,
  EMOTIONS,
  FILM_COUNT_PER_STEP,
  FILTER_TYPE_ALL_NAME,
  FilterType,
  UserStatusValue,
  UserStatusTitle,
  SortType,
  UpdateType,
  UserAction,
};
