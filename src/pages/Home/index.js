import React, { useState, useRef } from "react";
import logo from "./star-wars-logo.png";
import styled from "styled-components";
import "./index.css";
import { useDebouncer, useFetch } from "./CustomHooks/useHooks";
import Card from "./Card";
import { useHistory } from "react-router-dom";

const SearchBarWrapper = styled.div`
  padding: 10px;
  display: flex;
  position: realtive;
  width: 550px;
  margin: auto;
  border-bottom: none;
  max-height: 500px;
`;

const SuggestionBox = styled.div`
  display: ${({ len }) => (len !== 0 ? "flex" : "none")};
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  max-height: 250px;
  overflow: auto;
  /* border: 1px solid grey; */
  /* border-top: none; */
  width: 580px;
  /* margin: auto; */
  margin-top: -70px;
  margin-left: -20px;
  & * {
    flex: 1;
    padding: 5px;
    text-align: left;
    padding-left: 30px;
    height: 50px;
  }
`;

function HomePage() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const scrollRef = useRef();
  const history = useHistory();
  const debouncedQuery = useDebouncer(query, 500);

  
  const { isLoading, isError, data } = useFetch(
    `https://swapi.dev/api/people/?search=${debouncedQuery || "luke"}`
  );

 

  const handleData = (url1) => {
    console.log(url1);
    history.push(`/person/${url1}`);
  };

  const handleClear = () => {
    setQuery("");
  };
  
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleChangeActiveSuggestions = (e) => {
    console.log(e.keyCode, active);

    switch (e.keyCode) {
      case 40: {
        setActive((prev) => prev + 1);
        document.querySelector("#container").style.color = "red";
        break;
      }
      case 38: {
        if (active === 1) {
          setActive(0);
        } else if (active <= 0) {
          setActive(data.length);
        } else {
          setActive((prev) => prev - 1);
        }

        break;
      }
      case 13: {
        console.log("hey");
        break;
      }
      default: {
        return;
      }
    }
  };

  return (
    <>
      <div>
        <div className="logo">
          <img src={logo} alt="Star Wars Logo" />
        </div>

        <SearchBarWrapper onKeyPress={handleChangeActiveSuggestions}>
          <div className="main-container">
            <input
              className="search-input"
              placeholder="Search by name"
              value={query}
              onChange={handleChange}
            />
            <img
              src="https://www.iconsdb.com/icons/preview/yellow/search-xxl.png"
              alt="search-icon"
              className="search-icon"
              id="search-icon"
            />
            <div>
              {query && (
                <div className="closer" onClick={handleClear}>
                  X
                </div>
              )}
              {query && (
                <img
                  src="Spinner.gif"
                  alt="loader"
                  className="loader-icon"
                  id="loading"
                />
              )}
            </div>
          </div>
        </SearchBarWrapper>

        <SuggestionBox
          ref={scrollRef}
          active={active}
          len={data.length}
          limit={6}
        >
          <div id="container">
            {isLoading ? (
              <div>
                <img
                  src="Spinner.gif"
                  alt="loader"
                  style={{
                    backgroundColor: "transparent",
                    marginLeft: "230px",
                    height: "50px",
                  }}
                />
              </div>
            ) : isError ? (
              <div> Error... </div>
            ) : (
              data.results &&
              data.results?.map((item, index) => (
                <Card
                  key={item.url}
                  onKeyUp={handleChangeActiveSuggestions}
                  handleData={handleData}
                  item={item}
                  onMouseOver={() => setActive(index + 1)}
                />
              ))
            )}
          </div>
        </SuggestionBox>
      </div>
    </>
  );
}

export default HomePage;
