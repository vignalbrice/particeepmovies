import { TYPES } from "../types/types";

/** actions avec ses propriétés a envoyé au reducer "app" */
export const setMovies = (movies) => {
  return async (dispatch) => {
    dispatch({
      type: TYPES.SET_MOVIES,
      movies,
    });
  };
};
export const setInitMovies = (movies) => {
  return async (dispatch) => {
    dispatch({
      type: TYPES.SET_INIT_MOVIES,
      movies,
    });
  };
};

export const setFilteredMovies = (movies) => {
  return async (dispatch) => {
    dispatch({
      type: TYPES.SET_MOVIES_FILTERED,
      movies,
    });
  };
};

export const setCategories = (categories) => {
  return async (dispatch) => {
    dispatch({
      type: TYPES.SET_CATEGORIES,
      categories,
    });
  };
};

export const setToggleLikedMovie = (item) => {
  return async (dispatch) => {
    dispatch({
      type: TYPES.SET_TOGGLE_LIKE,
      id: item.id,
      movie: item,
    });
  };
};

export const setToggleDislikedMovie = (item) => {
  return async (dispatch) => {
    dispatch({
      type: TYPES.SET_TOGGLE_DISLIKE,
      id: item.id,
      movie: item,
    });
  };
};

export const deleteMovie = (id) => {
  return async (dispatch) => {
    dispatch({
      type: TYPES.DELETE_MOVIE,
      id,
    });
  };
};
