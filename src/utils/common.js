import dayjs from "dayjs";

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomValue = items => items[getRandomInteger(0, items.length - 1)];

const updateItem = (items, update) => {
  const index = items.findIndex(item => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [...items.slice(0, index), update, ...items.slice(index + 1)];
};

const sortFilmsRating = (a, b) => {
  return b.filmInfo.totalRating - a.filmInfo.totalRating;
}

const sortFilmDate = (a, b) => {
  return new Date(b.filmInfo.release.date) - new Date(a.filmInfo.release.date)
}


export { getRandomInteger, getRandomValue, updateItem, sortFilmsRating, sortFilmDate };
