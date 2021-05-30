import React from 'react';
import './index.css';
import { useParams } from 'react-router';
import {useDebouncer, useFetch} from "../Home/CustomHooks/useHooks"
import PersonCard from './PersonCard';

function Person() {
  const { id} = useParams();
  const debouncedQuery = useDebouncer(id, 500);
  const { isLoading, isError, data } = useFetch(
    `https://swapi.dev/api/people/?search=${debouncedQuery || "luke"}`
  );


  return (
    <div className="person">
       <div id="container">
            {isLoading ? (
              <div> 
                Loading.....
                {/* <img src="Spinner.gif" alt="loader" style={{backgroundColor:"transparent" , marginLeft:"230px", height:"50px"}}/> */}
              </div>
            ) : isError ? (
              <div> Error... </div>
            ) : (
              data.results &&
              data.results?.map((item, index) => (
                <PersonCard
                  key={item.url}
                 
                  item={item}
                 style={{color:"white"}}
                />
              ))
            )}
          </div>
    </div>
  );
}

export default Person;
