import {getRandomItem, getRandomNum} from '../util.js';

const titles = [
  'Popeye the Sailor Meets Sindbad the Sailor',
  'The Man with the Golden Arm',
  'Sagebrush Trail',
  'The Dance of Life',
];

const posters = [
  'images/posters/popeye-meets-sinbad.png',
  'images/posters/the-man-with-the-golden-arm.jpg',
  'images/posters/sagebrush-trail.jpg',
  'images/posters/the-dance-of-life.jpg',
];

const genres = [
  'Animation',
  'Action',
  'Adventure',
  'Comedy',
  'Family',
  'Horror',
  'Thriller',
];

const names = [
  'Alice',
  'Ivan',
  'Sergey',
  'Dakota',
  'Nevada',
  'Fedor'
];

const surnames = [
  'Makoveev',
  'Ivanov',
  'Romanov',
  'Lee',
  'James',
  'Walker'
];

const countries = ['USA', 'Russia', 'Germany', 'Finland', 'France', 'Spain', 'Italy', 'China', 'Japan'];

const descrips = [
  'In this short, Sindbad the Sailor (presumably Bluto playing a "role") proclaims himself, in song, to be the greatest sailor, adventurer and…',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed vehicula lorem. Quisque eu dignissim sem, vitae sodales dolor. Duis act…',
  'Cumsan turpis nec elit congue, sit amet aliquet felis dapibus. Mauris auctor ornare tellus. Donec maximus quis nunc in sollicitudin. Quisqu…',
  'Curabitur lacinia, lacus a egestas auctor, massa enim commodo elit, neque mauris a nunc. Donec ipsum felis, ve facilisis tortor commodo etc…',
]

const generateFilm = () => ({
  title: getRandomItem(titles),
  alternativeTitle: getRandomItem(titles),
  totalRating: getRandomNum(0, 10),
  poster: getRandomItem(posters),
  ageRating: getRandomNum(0, 18),
  director: `${getRandomItem(names)} ${getRandomItem(surnames)}`,
  writers: Array.from({length: 2}, () => `${getRandomItem(names)} ${getRandomItem(surnames)}`),
  actors: Array.from({length: 2}, () => `${getRandomItem(names)} ${getRandomItem(surnames)}`),
  release: {
    date: "2019-05-11T00:00:00.000Z",
    releaseCountry: getRandomItem(countries),
  },
  runtime: getRandomNum(60, 180),
  genre: [...new Set(Array.from({length: getRandomNum(1, 3)}, () => getRandomItem(genres)))],
  description: getRandomItem(descrips),
});

export const generateFilms = () => {
  return Array.from({length: 5}, generateFilm);
};