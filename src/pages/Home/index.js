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
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEX//wAAAAD8/ACHhwD39wD6+gD09ADy8gDs7AAmJgDX1wDn5wDKygBCQgBLSwDq6gCPjwDc3ACcnABeXgCnpwAbGwAeHgAXFwDNzQCCggBvbwAwMACgoABQUABZWQBlZQC1tQC+vgCwsABwcAAqKgBFRQASEgDZ2QANDQAyMgB3dwAiIgC6ugB8fABUVAA3NwCCgyydAAAQX0lEQVR4nNVd2YKiOhBlEUFABhAVaFRA23Zp9f//7rqRBAhCkqL1nrdxWuRAUltqkeTesZvPRnsnPpxUVT0dDnG8miwXzvjytRkdp/Nd3z8v9Xjt3ejiTGI1sC2JDs0wM/8wcS6zHu+iL4bz71j1c/tfA7cS/tmBG63GPd1JHwy3ziFJQ70LOQzDzt3Vpoe7AWe4XQW2abCxe0Kxwl/3DH1DwAwnuWcoXPSeGFpm8A16S5AMl+m/gQi74lUOf1xA0QPGcOMzbrzX+DmMgG4MhOHuskoh6d2h5BMQwQPAcLd0TXB+d45ZBLAlxRlOgiaFDgDTX76b4STvkd8NXr56J8Plb8/8brByobUqwnD/Cyo+G6EYwfYtDH3tT/jdoUV/znAU/8H6JGGdOBUkH8PZKvtbfjdkEy5fkovhd8BnWgvC8vd/xPDUj4Jvh2LHf8Fwlv+NBKXiX8BsyTEznJhC3pEoFJPVAGBkOE+G7+R3g672ydCx383vhvTSG8PYeze5B34m/TDcqm8UMWXo6rEHhpfgD620NgzyzsHHzgzP9ltlaBWKvQBmOHmXlm+E2THu2JHh5I/t7C6wulHsxvAAESUEh9LJhuvEMHo3lyacOnjGHRhO3XcTaYTmtmuNdobTv/TlWTHwW6PjrQzn/kfuwQJDfyrIcOe+3dR+jaHb4vm3MYw++g3e0BakamEYfZQh04CTAMPTu2++G17qxZcMJ/+HN3jF8JXf/4rh4kPcwXZ4Lwy4FwwvH+HQd4Pd7Ew1Mzym/5M1eoOSN0bEmxl+silTh9aoFhsZfr4iLEM7MDJcvSVuL4Jhg7RpYLgP333D7DDnLAyDd98uD3wGhmswMaroVpgGSRIEeZ5mdvhjGcO+ZPSAattQGV5gojLKPzuJ4uX4eBVzu912etxcxovlah353XIWmfFD04pUhiDHnz/JytnTt8buy4mDPgymtCNDAE1oud9tnunMgT9nHVJObSgMRSOHipF1PVdY2cAHBV49wajOcCS2RhUrcDryu2GZW6CCJ6+FpuoMI6GwhRd0jbYXWIBmVenrVobfIuF7I2c59yqwygE3ZPjVwnCb8F9cy+I28ULHbJ3BLVW3heGCf41aUfXxdcfeBRM5w4ofVWXIb482OKHfUZCFpmfd4JlhFkT0v4MLKPy+ZLjivaxej+ntRmffpC0J3VYdSjQ+h1qpZVlQYcj7IH9qrsvlpdWimO6ktqYjIKFqvmDIGT3UskoG6Pbshm1vZJidqusV6Bh2UHKGSwynfK9wGFTSPybdjE7NditPZgnjlobkcU2JoctlkA6SsvRyuhvVA9Mtr1WYhJ2SUCAZ7vkWSeWAy/Uo61P37DTw/brcGZplI+QC4tfYRPYbyZDPpyhr2K+wdpF/v+pkvB9t5X1K+/6g7PLMISgOiZdIMLxwbYKgdH9qJUKneP5zq+3OWdMDtEpB+RnEXszw4pea764TUtLHvZRVmmb9FkrkK361wQY+uZPHALpfweIUM9zwLA+blKLLEgvNSwptsFm3pBtpKak4VgB6MUUmBWa44rAMPdJ8iH9K/+UXbuI8/m1fHaUUp0jc19DR9RDDOYdTYZBSeU0urkGAnO1F3insZBIU54l4wB0JQMTwmz38peTEJozJ524e0P+oNOVBg0eEBjbiatEo7gAx5MgK8ojU+QVJEO+qUdb9bXjEnl6KO1NF8LRguGUXYANiEzqEcDAidAw0YbpRk7BvfObbqcKrMHTYL0FowjFhDXlIux19Rn/IJiiKG+HjMkP2gwoD55RtfvHHITKmv39ZHT4lwAagIyxs8jJD9nWPg69k2hQKBO1iDtuENJkFAkYPGCWGC+bvh9gMibEYxqEMlUttEykHwqbN86DmyTBl/TphFhFnjTaS+LyV3b9IzeyEUyIzkiGzEWFjTYHv5Aepee6jDwU7U46osPGOmGHMuq2JZLIx+q6Fzu8C/qCSgXeiqMYw1pghswlBWNzou0hMjH5ffbUNCbry4qf9r18iRQxnrJtaw27vufhMeUpn+SsVui0dPzyBpXDHXbDfGTInXhAiD73CwiI5it5Xjq4t6kbdt43E9axw4GFVhF60pw23E/YLLORlCLv7/pPhjnUb6jijMy0+K2w4V9gW0fBOTARPo/PtgyHzgZqH7Een2MHW8yOIyowQaaKFoItxMyFvDA+s18GLFOm9pxw9QxwhEbaboErU4wdDVqt7gLQy8lTNx2O/wBwgpcioF1WJ6p3hNGX82j9kkiJh93jqR6AqfRzRcATlcrK9MRyzSiwbL9LnDZh3l2kLVZoxxJJMUF9cjUuJQxsidY/8Qv/u1R/AMp0SZH8LmUdXw825MWSO0CAH4vzcdo+gtbCljIGNQtFqgcmNIauXMkRLaP2UnNnNiGfezi+ASwvHglc6XBlOWUWphxiqjw8G92UbA2b+aMhLmQtubf/KcM8qALPi12f54wPr5hbOQPO3sGUvqH+yuSR/s14DJarun9owvMmZXOxOKghQYo6gaWodJfnMug5QCOoZSVFuJukSNvE9QypXUJhKG0mesH4HRWgWD+1w017MxnsLcDhdNB97LMkx63eQzTZ5eE7GVd0fgKsUDRSzEw0qTiR2dYgYrh7S09vJR+gCIh3FlUUt05PErA4lFLV/vv2rERdBd8wYOlAMVWnHvAzQgcz68e8UzOLGGCzgGG6ZxTx6h4fHvxN2B7MV2hKOIXt2R5Whyv6QWqGd4RhOmVVqdR+ul/DVE5D7cMrsEaB9+JClykH4lKgOHUxbqBJzNBi/w8nDjmlsSC4ArA9FNb4qHZkPZZDd/zxs76OMybq8kyGy2pz+mtbgjPtU8EqqNGK2t5Bnw5cI1wk58i1EraUrQ+ZFhs4VRqngrzcDV/WKhkZ4GIbFj2/FU0KaABZs42JooV/vrWsGbpJwFL0UD0MFhfpW/RRKFvHXG9hTKCrgYSghm5E5ltwVuAJNOF2BiyFKhurBIL1DwYEoYceTi+EP+n2utOJ2GMio2Ar/wJUhu+czxLtENJeADpylzRxiqeFq03DkleJFlArfAQWaD3h9HsubPHwCD1/cYCHvZSR+HsnjPZHHCvs+lmmGDkgBQnhXH59DWg3wMkrglT5xeigaDpbucRqeq9goD3QPr/RNZJOeAQ7NVWnH44AZODMR3MEnsh4hFogq8QVCsHczh5Y1uD5yDHHkemWo8nwPiztxu6oCXAQFYk8cpCImyAgfybsZbP/dDBH8AokzLyXO4mai/mMNaboZ+LoxyGnPWJKXfN/0kcQ7Qtrf2FwS7M9RYCPJDp+8N3AaKGASxi8u/lyBaFr9KHHHk3AaKJmsLwaivGsH89jsuYTyDZhBlOCLp1ze8Y+oCQbqzhzsOPJpCpi4zcccpB/CkCgp3gOp2YgrJ6oA0T3smIrfjEZ2IwO43h2rG8OY93EZRIUyV41tGeTYKqiehsPzjSG/KAyJ6l3hXqBkuSaEyX1HeLkxPHL7KAr52C9irk5CdDuBsWZuCGZcOcIYA7J72EZA8ys+2T8ezl9xH1nQAr2vhqWeD9yDOq1SN5IIrHPqLV/7xlAkYmaVGqStua6k2KWL7OGSc0znwZAnkIHglbqzfTNUNhfQK1OqdipYglU6fdbMCJnOYanHzJx1Jqli15rHjgDK8R8oamYE82HCco+9RcJyquy5lOFNmwDQCrwz/BJTP2a5WeF0GXR9YpbvUBscj6IscN1U9OzwXnzzqD8UPEPyKp32tuNOtWK6e6nwWyIraXbV//OLoOeZyYihqHzWT9VXMY2ojcyIr9Qn/U1dTUrLHZlOIkLnUV30YHgUtuST+tQ+JwktakddRbdsyvb7vhtFWbmTm0hPam+DGYof00kZrdn0Jcpt0zMGmnJjqija8J8XZsGa1n5w9dSlaXk6zopfRmQywVD8FEvyVOrwxe3+fHB9PwmCIPF9N3Y2VNmy94uXpVQGHUx47ZFnAVrRUwHAgx10bj1bR2wjSaBUO5Dy9qkzdiWGINa8FfB1vxyTDUy1WufIJd9bfHaILBhyt4QsQbF4JhMnBrmCBnUZxNcX81xmOIdqA2tFbF1aN1WHRKFMU+cxSXS5zBDw+MFyndYxU0/sJ0Fd4SWUPzyyUyxWE2LoAFZMGPlh3D4RbbakN8j8oQ3jYD6HGhRXQQwhomUYWhicFvSG7A+MlmpTD+iBT9MnC0bLEgWscb+2A/B59dDM/AN16uvOOSWZ1+w+GFRxdWaiqCDNhRn2kMKlGV6YJm4UTxbOeDxeLFbryE1+Q09//TQt6rwRJoq45RTRN7GnXEptMNR14wFdHw66GPkWdYATS9gTh8gkvgv0DYM6UqV7uT8RySX7l/aQOcINndq8vmsbYCJrq8SQuZq0T/yjv8Vu68wkYkelPsKinWVAUQ0cPLdSF3FTOuMpMRx/1Agkk0px2eEteqTxXu7n/VkjgngpKiW7r8xw9lkjOeud3u8U28SFVTL7Kl3nudKH+oNX6Wj+wLllM5VnWlZnI3ySOJVK6TUEvl9S/Cn/cZUhjCcMB4uqFyevKFaWdpUhfEmvIOhK49RMsTLeoj5n5uOG5nk0G3XXmN9iVF96jeH8k2y3OzzaOLXGfiW1SY/1aUi9FcJwg/oWXfqLsGseKWVm16mP/HshWJS9SD+aN+rvmzZ3radaHwEM6m+RemajUKJYNIabD1OKV2g1itQE4to4qwaG7A1b+4d+KEuQOc2EpqzRphmWPVTYi8JQS/FJhxbpr47resEQuqEOBAyXiE7uaM3QM+qpVsOk1UV/hejc0H18XhBT7JJ/eyqVpnnAp0/T+1doqLTzQDO8GmbINzEUmaHXH+zvubzb0Lu9UzfhC4aA+YGgMCyLLujTptHjzZPHO8V8PgbN4+ObGYIMtPkr0H2sNobgLcr6g1GbPtqN4adFbRqhvDpbf8nwE20bGprEaAeG288KoDaAdizelaE8/TxPqobgNYUWhvJX+oHGDQmlPsWZjaE8/kzNX0BJqQfpLAzlMUDJeG9Q0kZN352hvP/gvZjT/QlGhvz1e70jadmDXRnSQwYfAL/91jsy5J0y2y80tf2+uzOU1b5aQnHDOrXfNQtDzoKf/mBSU25EGFamjL4b1LRyQYayaPUDJKpzsmEYyiOgkm1hDNSuCayMDIVKAwDhUbKIoRjKm/cb4kreFHMCYXjVjG+O3ljdtKAAw6tMfaP2H3SXofwM5bn/ttfoue3p4wAMZXnSOCa9VwxSJhEjwlD+4psyKgYvYhMxQgyv6v+vUzYGfnclD8IQZHY2A1JqYVy/DG9FZX9k4wxMau5X/wzlXRT+QeBfDzv6ST0wlOVZlPXMUc9ObKViwAz75jhMDwxGdj8MryInDnrK9rOCuEOoqX+Gsjz9jnpwOszo+1VtWFeAMLxidwZWHhm92wI7oBhesTuFOog1p+khtbSLD4AMr7i4ZkMiQWcMrNDlq5duACzDKxw3M7kFjxFmbutBBCPAGV4xPiRpS1cMCoZh6q85bc9X6IPhFXNnrSbdB9BYWaLGYwjJWUdPDG/Y7p1l7Oa298ILUTw7UOOl88Xu2XZFjwwf2M1no6+LM4kPkUogWl95Xb5GszmQUmjEf529+9aU4JapAAAAAElFTkSuQmCC"
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
