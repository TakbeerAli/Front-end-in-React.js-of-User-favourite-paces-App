import { useCallback, useState, useRef, useEffect } from 'react';

export const  useHttpClient = () => {
  
 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState();

 // this is for cuting http request
 const activeHttpRequests =  useRef([]);

 const sendRequest = useCallback( async (url, method = 'GET', body = null, headers = {} ) => {
    setIsLoading(true);

    const httpAbortCtrl = new AbortController(); // this is the functionlity created by modern browser & this is for cuting http request

    activeHttpRequests.current.push(httpAbortCtrl);  // this is for cuting http request 
    try {

        const response = await fetch(url, {
            method,
            body,
            headers,
            signal: httpAbortCtrl.signal  
        });
    
        const responseData = await  response.json();
    
        {/*if we have 404 then show this message*/}
        if(!response.ok){
          throw new Error(responseData.message);
        }

        setIsLoading(false);
        return responseData;

    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      throw err;        
    }
    

 },[]);

 // this send error msg if there is any eror 
 const clearError = () =>{
     setError(null);

 };


// check for if the request is finished
 useEffect(() => {
    return () => {
        activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
    };
 },[])

 return { isLoading, error, sendRequest, clearError };

};