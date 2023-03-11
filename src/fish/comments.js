import { getRandomItem, getRandomNum } from "../util.js";

const text =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.";

const emotions = ["smile", "sleeping", "puke", "angry"];

const names = ["Alice", "Ivan", "Sergey", "Dakota", "Nevada", "Fedor"];

const surnames = ["Makoveev", "Ivanov", "Romanov", "Lee", "James", "Walker"];

const getDate = () => {
  const date = new Date();

  date.setDate(date.getDate() - getRandomNum(5, 10));

  return date.toISOString();
};

const generateComment = () => ({
  author: `${getRandomItem(names)} ${getRandomItem(surnames)}`,
  text,
  date: getDate(),
  emotion: getRandomItem(emotions),
});

const getCommentCount = films =>
  films.reduce((count, film) => count + film.comments.length, 0);


const generateComments = films => {
  const commentCount = getCommentCount(films);

  return Array.from({ length: commentCount }, (_value, index) => {
    const commentItem = generateComment();

    return {
      id: String(index + 1),
      ...commentItem,
    };
  });
};

export { generateComments };
