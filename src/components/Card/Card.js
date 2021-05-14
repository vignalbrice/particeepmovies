import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  AiOutlineLike,
  AiFillLike,
  AiFillDislike,
  AiOutlineDislike,
  FaTimesCircle,
} from "react-icons/all";
import {
  setToggleLikedMovie,
  setToggleDislikedMovie,
  deleteMovie,
} from "../../store/actions/app";
const Card = ({ item }) => {
  /** Récupération des films "likés" et "dislikés" via le store redux */
  const { likedMovies, dislikedMovies } = useSelector((state) => state);
  /** hooks useDispatch pour envoyer les actions */
  const dispatch = useDispatch();

  return (
    <div className="card">
      <div
        className="card-delete"
        onClick={() => dispatch(deleteMovie(item.id))}
      >
        <FaTimesCircle fontSize={32} />
      </div>
      <div
        className="card-wrapper"
        style={{ backgroundImage: `url(./images/${item.link})` }}
      >
        <div className="card-filter">
          <div className="card-header">
            <h2>{item.title}</h2>
            <h4>{item.category}</h4>
          </div>
          <div className="card-content">
            <div className="card-likes">
              {likedMovies.findIndex((el) => el.id === item.id) !== -1 ? (
                <>
                  <AiFillLike
                    fontSize={24}
                    onClick={() => dispatch(setToggleLikedMovie(item))}
                  />
                  <small>{item.likes + 1}</small>
                </>
              ) : (
                <>
                  <AiOutlineLike
                    fontSize={24}
                    onClick={() => dispatch(setToggleLikedMovie(item))}
                  />
                  <small>{item.likes}</small>
                </>
              )}
            </div>
            <div className="card-dislikes">
              {dislikedMovies.findIndex((el) => el.id === item.id) !== -1 ? (
                <>
                  <AiFillDislike
                    fontSize={24}
                    onClick={() => dispatch(setToggleDislikedMovie(item))}
                  />
                  <small>{item.dislikes + 1}</small>
                </>
              ) : (
                <>
                  <AiOutlineDislike
                    fontSize={24}
                    onClick={() => dispatch(setToggleDislikedMovie(item))}
                  />
                  <small>{item.dislikes}</small>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
