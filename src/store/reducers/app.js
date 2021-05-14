import { TYPES } from "../types/types";
import { produce } from "immer";

/** State Initial */
const initialState = {
  movies: [],
  initMovies: [],
  moviesFiltered: [],
  categories: [],
  likedMovies: [],
  dislikedMovies: [],
};
/** Reducer pour muter le state initial via l'action reçu */
const app = (state = initialState, action = {}) =>
  produce(state, (draft) => {
    switch (action.type) {
      /** Récupération des films amené à être changés */
      case TYPES.SET_MOVIES:
        draft.movies = action.movies;
        break;
      /** Récupération des films initiales */
      case TYPES.SET_INIT_MOVIES:
        draft.initMovies = action.movies;
        break;
      /** Récupération des films filtrés */
      case TYPES.SET_MOVIES_FILTERED:
        draft.moviesFiltered = action.movies;
        break;
      /** Récupération des catégories depuis les films */
      case TYPES.SET_CATEGORIES:
        draft.categories = action.categories;
        break;
      /** Action du bouton like pour like un film */
      case TYPES.SET_TOGGLE_LIKE:
        const likedMovieIndex = draft.likedMovies.findIndex(
          (item) => item.id === action.id
        );
        const isInDislikedMovieIndex = draft.likedMovies.findIndex(
          (item) => item.id === action.id
        );
        const movieLiked = { ...action.movie };
        if (isInDislikedMovieIndex !== 1) {
          draft.dislikedMovies = draft.dislikedMovies.filter(
            (item, index) => item.id !== action.id
          );
        }
        if (likedMovieIndex !== -1) {
          movieLiked.likes = --movieLiked.likes;
          draft.likedMovies = draft.likedMovies.filter((item, index) => {
            if (item.id !== action.id) {
              item.likes = movieLiked.likes;
              return item;
            }
          });
        } else {
          movieLiked.likes = ++movieLiked.likes;
          draft.likedMovies = [...draft.likedMovies, movieLiked];
        }
        break;
      /** Action du bouton dislike pour dislike un film */
      case TYPES.SET_TOGGLE_DISLIKE:
        const dislikedMovieIndex = draft.dislikedMovies.findIndex(
          (item) => item.id === action.id
        );
        const isInLikedMovieIndex = draft.likedMovies.findIndex(
          (item) => item.id === action.id
        );
        const movieDisLiked = { ...action.movie };

        if (isInLikedMovieIndex !== 1) {
          draft.likedMovies = draft.likedMovies.filter(
            (item, index) => item.id !== action.id
          );
        }
        if (dislikedMovieIndex !== -1) {
          draft.dislikedMovies = draft.dislikedMovies.filter((item, index) => {
            if (item.id !== action.id) {
              item.likes = movieDisLiked.likes;
              return item;
            }
          });
        } else {
          movieDisLiked.likes = movieDisLiked.likes;
          draft.dislikedMovies = [...draft.dislikedMovies, action.movie];
        }
        break;
      /** Suppression du film via l'Id */
      case TYPES.DELETE_MOVIE:
        draft.movies = draft.movies.filter((item, index) => {
          if (item.id !== action.id) {
            return item;
          }
        });
        draft.initMovies = draft.movies;
        const categories = [];
        // Récupération des categories depuis le mock des films
        draft.movies.map((el, i) => {
          categories.push(el.category);
        });
        // Filtrer les catégories distinctes depuis l'index de la valeur actuelle
        draft.categories = categories.filter((v, i, a) => a.indexOf(v) === i);
        break;
      default:
        return state;
    }
  });

export default app;
