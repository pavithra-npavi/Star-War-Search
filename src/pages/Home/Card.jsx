import React from "react";
import "./Card.css";
const Card = ({ item, index, handleData }) => {
  return (
    <div className="main-container">
      <div className="card_container">
        <p onClick={() => handleData(item.name)}>{item.name}</p>
        <p style={{color:"lightgrey" , fontSize:"10px"}}>{item.birth_year}</p>
        {/* <p >{item.gender}</p>  */}  
      </div>
    </div>
  );
};

export default Card;
