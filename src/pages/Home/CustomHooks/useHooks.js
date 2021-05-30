import axios from "axios"
import {useEffect, useState} from  "react"


function useFetch (url){
    const [isLoading, setIsloading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [data, setData] = useState([])
    // console.log(data ,"fetched data ");

    //fetching data from api using name 
    const getRequest=()=>{
        setIsloading(true)
        axios.get(url)
        .then(res=>{setData(res.data)})
        .catch(err=>{setIsError(true)})
        .finally(()=>{
            setIsloading(false)
        }) 
    }

    // renderign on page load

    useEffect(() => {
        getRequest()
    
    }, [url])
    return {isLoading , isError , data}
}


// Debouncer function
const useDebouncer= (query, delay)=>{
    const [debouncedQuery, setDebouncedQuery] = useState(query)

    useEffect(()=>{
        const handler = setTimeout(() => {
            setDebouncedQuery(query)
        }, delay);
        return()=>{
            clearTimeout(handler)
        }
    },[query,delay])
    return debouncedQuery;
}


export {useFetch , useDebouncer}