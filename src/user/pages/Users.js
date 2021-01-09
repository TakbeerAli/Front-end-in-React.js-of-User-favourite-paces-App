import React, { useEffect, useState } from 'react';
import UserList from "../components/UsersList";
import ErroModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const Users = () => {

 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState();
 const [loadedUsers, setLoadedUsers] = useState();
   
 //dont use asyn function on useEffect state bcz this is not good try to add function in useEffect then use asyn
    useEffect( () => {
      const sendRequest = async () => {
        setIsLoading(true);
        try {
          const response   = await  fetch('http://localhost:5000/api/users');
          const responseData = await  response.json();

          {/*if we have 404 then show this message*/}
          if(!response.ok){
            throw new Error(responseData.message);
          }
    
          setLoadedUsers(responseData.users);   
          
        } catch (err) {
           
           setError(err.message);
        }
        setIsLoading(false);
     
      };
      sendRequest();
    }, []);
    



  
    
const errorHandler = ()=>{
  setError(null);
}

  return (
   <React.Fragment>
   <ErroModal error={error} onClear={errorHandler}/>
   {isLoading && (
     <div className="Center">
       <LoadingSpinner/>
     </div>
   )}
  
  {/* if data is not loading and user are loded then show data and page */}
   {!isLoading && loadedUsers && <UserList items={loadedUsers} /> }
 
  </React.Fragment>
  ) // sending data to UserList component by USERS array
};

export default Users;
