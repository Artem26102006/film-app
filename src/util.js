import dayjs from "dayjs";

const getRandomItem = (items) => {
    const list = [...items];
    const rand = Math.floor(Math.random() * list.length);
    return list[rand];
};

const getRandomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

const humanizeFilmDueDate = (dueDate) => {
    return dayjs(dueDate).format('YYYY');
};

export {getRandomItem, getRandomNum, humanizeFilmDueDate};