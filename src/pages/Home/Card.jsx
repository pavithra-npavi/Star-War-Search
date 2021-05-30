import React from "react";
import "./Card.css";
const Card = ({ item, index, handleData }) => {
  return (
    <div className="main-container">
      <div className="card_container">
        <p onClick={() => handleData(item.name)}>{item.name}</p>
      </div>
    </div>
  );
};

export default Card;
