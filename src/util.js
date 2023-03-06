import dayjs from "dayjs";

const getRandomItem = (items) => {
    const list = [...items];
    const rand = Math.floor(Math.random() * list.length);
    return list[rand];
};

const getRandomNum = (a = 0, b = 1) => {
    const lower = Math.ceil(Math.min(a, b));
    const upper = Math.floor(Math.max(a, b));
  
    return Math.floor(lower + Math.random() * (upper - lower + 1));
  };

const humanizeFilmDueDate = (dueDate) => {
    return dayjs(dueDate).format('YYYY');
};

const formatMinutesToTime = (minutes) => {
    const MINUTES_PER_HOUR = 60;
  
    return (minutes < MINUTES_PER_HOUR)
      ? `${minutes}m`
      : `${Math.floor(minutes / MINUTES_PER_HOUR)}h ${minutes % MINUTES_PER_HOUR}m`;
  };

export {getRandomItem, getRandomNum, humanizeFilmDueDate, formatMinutesToTime};