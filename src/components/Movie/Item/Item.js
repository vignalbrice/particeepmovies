import React from "react";
import Card from "../../Card/Card";

const Item = ({ item }) => {
  return (
    <div className="col">
      <Card item={item} />
    </div>
  );
};

export default Item;
