import { useEffect, useState } from "react";

export default function useFetch(url){

    const[data,setData]=useState(null)
    const[loading,setLoading]=useState(true)
    const[error,setError]=useState(null)

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(json => {
                console.log('Asset health data:', json);
                setData(json);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error loading asset health data:', err);
                setError('Failed to load asset health data');
                setLoading(false);
            })
    },[url])

    return { data,loading,error }
}