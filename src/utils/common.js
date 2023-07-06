const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomValue = items => items[getRandomInteger(0, items.length - 1)];

const sortFilmsRating = (a, b) => {
  return b.filmInfo.totalRating - a.filmInfo.totalRating;
}

const sortFilmDate = (a, b) => {
  return new Date(b.filmInfo.release.date) - new Date(a.filmInfo.release.date)
}

export { getRandomInteger, getRandomValue, sortFilmsRating, sortFilmDate };
