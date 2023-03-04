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
  'Cartoon',
  'Western',
  'Musical',
  'Drama',
  'Comedy',
];

const genresList = genres.

const descrips = [
  'In this short, Sindbad the Sailor (presumably Bluto playing a "role") proclaims himself, in song, to be the greatest sailor, adventurer and…',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed vehicula lorem. Quisque eu dignissim sem, vitae sodales dolor. Duis act…',
  'Cumsan turpis nec elit congue, sit amet aliquet felis dapibus. Mauris auctor ornare tellus. Donec maximus quis nunc in sollicitudin. Quisqu…',
  'Curabitur lacinia, lacus a egestas auctor, massa enim commodo elit, neque mauris a nunc. Donec ipsum felis, ve facilisis tortor commodo etc…',
]

const generateFilm = () => ({
  title: getRandomItem(titles),
  alternativeTitle: "Laziness Who Sold Themselves",
  totalRating: getRandomNum(1, 10),
  poster: getRandomItem(posters),
  ageRating: 0,
  director: "Tom Ford",
  writers: ["Takeshi Kitano"],
  actors: ["Morgan Freeman"],
  release: {
    date: "2019-05-11T00:00:00.000Z",
    releaseCountry: "Finland",
  },
  runtime: 77,
  genre: ['Cartoon', 'Comedy'],
  description: getRandomItem(descrips),
});

export const generateFilms = () => {
  return Array.from({length: 5}, generateFilm);
};