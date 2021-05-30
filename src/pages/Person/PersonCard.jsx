import React from "react";
import { useHistory } from "react-router";
import "./PersonCard.css";
const PersonCard = ({ item }) => {
    const history = useHistory()
  var srcImg = "";
  const handleClick =() =>{
      history.push("/")
  }

  if (item.gender == "male") {
    srcImg =
      "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/male-sign_2642.png";
  } else {
    srcImg =
      "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/female-sign_2640.png";
  }

  return (
    <>
      <div className="App">
        <div className="divCard">
          <span className="Cardspan">
            <span> 👁️ {item.eye_color.toUpperCase()} </span>{" "}
          </span>
          <img
            className="cardImg"
            src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/274/crossed-swords_2694-fe0f.png"
            alt="profile"
          ></img>
          <h3>
            {" "}
            Name : {item.name} {item.height}
          </h3>

          <p>
            {" "}
            Gender :{" "}
            <img
              src={srcImg}
              alt="gender"
              style={{
                width: "30px",
                alignItems: "baseline",
                top: "9px",
                position: "relative",
              }}
            />{" "}
          </p>
          <a
            href={item.homeworld}
            style={{ textDecoration: "none" }}
            className="cardInterface"
          >
            {" "}
            <p>
              {" "}
              Home{" "}
              <img
                style={{ width: "25px", top: "9px", position: "relative" }}
                src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/whatsapp/273/globe-showing-europe-africa_1f30d.png"
                alt="world"
              />{" "}
            </p>{" "}
          </a>
          <div className="buttonDiv">
            <button>
              {" "}
              <a href={item.films}>Films</a>{" "}
            </button>
            <button className="follow">
              {" "}
              <a href={item.species}> Species</a>
            </button>
            <h6>SPECIFICATION</h6>
          </div>

          <div className="cardSkills">
            <p> Height :{item.height} </p>
            <p>
              {" "}
              Body <span> 🏋️ {item.mass} </span>
            </p>

            <p> Skin Color: {item.skin_color.toUpperCase()}</p>
            <br />

            <p> 🐾 {item.birth_year}</p>
            <br />
            <p>Links to Starships && Vehicles ⬇️ </p>
            <a href={item.starships}>
              {" "}
              <p> Star Ships </p>
            </a>

            <a href={item.vehicles}>
              {" "}
              <p> Vehicles </p>
            </a>
          </div>
        </div>
        <button onClick={handleClick} className="backButton">HOME PAGE</button>
      </div>
    </>
  );
};

export default PersonCard;
