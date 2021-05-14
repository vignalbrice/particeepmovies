import React from "react";
import Item from "../Item/Item";
import PropTypes from "prop-types";

const List = ({ movies }) => {
  return (
    <div className="movies-list">
      {movies.map((item, index) => (
        <Item item={item} key={item.id} />
      ))}
    </div>
  );
};

List.propTypes = {
  movies: PropTypes.array.isRequired,
};
export default List;
