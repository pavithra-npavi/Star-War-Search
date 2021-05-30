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
`;

const SuggestionBox = styled.div`
  display: flex;
  flex-direction: column;
  /* overflow: scroll; */
  height:1000vh;
  width: 580px;
  /* margin-top: -70px;
  margin-left: -20px; */
  /* border:10px solid white; */
  & * {
    flex: 1;
    padding: 5px;
    text-align: left;
    padding-left: 30px;
    height: 80px;
  }
`;

function HomePage() {
  const [query, setQuery] = useState("");
  const history = useHistory();
  const debouncedQuery = useDebouncer(query, 500);

  const { isLoading, isError, data } = useFetch(
    `https://swapi.dev/api/people/?search=${debouncedQuery || "luke"}`
  );

  const handleData = (url1) => {
    // console.log(url1);
    history.push(`/person/${url1}`);
  };

  const handleClear = () => {
    setQuery("");
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <div>
        <div className="logo">
          <img src={logo} alt="Star Wars Logo" />
        </div>

        <SearchBarWrapper>
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

        {/* <SuggestionBox> */}
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
                <Card key={item.url} handleData={handleData} item={item} />
              ))
            )}
          </div>
        {/* </SuggestionBox> */}
      </div>
    </>
  );
}

export default HomePage;
