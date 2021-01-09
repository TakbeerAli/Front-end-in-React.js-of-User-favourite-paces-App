import React,{useState, useContext} from 'react';
import Input from "../../shared/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/UIElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import { VALIDATOR_EMAIL,VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm }from "../../shared/hooks/form-hook";
import { AuthContext } from '../../shared/context/auth-context';

import  './Auth.css';



const Auth = () =>{

     const auth = useContext(AuthContext); {/* concept is not cleared */}

    const [isLoginMode, setIsLoginMode] = useState(true);
    const [isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState();
    const [formState, inputHandler,setFormData] = useForm({
        email:{
            value:'',
            isValid:false
        },
        password:{
            value:'',
            isValid:false
        }
    },false);

    {/*This is for to switch btw login and siginup and correct both form & add extra User Name Field*/}
    const switchModeHandler = () =>{
        if(!isLoginMode){ 
            setFormData({
                ...formState.inputs,
                  name: undefined
            },
            formState.inputs.email.isValid && formState.inputs.password.isValid
            );
        }else {

           
           setFormData(
               {
                   ...formState.inputs,
                   name:{
                       value:'',
                       isValid: false
                        }
               },false );
        }

        setIsLoginMode(prevMod => !prevMod); 

    };

    const authSubmitHandler = async event =>{
        event.preventDefault();
        setIsLoading(true);
        if(isLoginMode){
             
            try {
               
                const response = await fetch('http://localhost:5000/api/users/login',{
                  method: 'POST',
                  headers: {
                      'Content-Type':'application/json'
                  },
                  body:JSON.stringify({
                      email:formState.inputs.email.value,
                      password:formState.inputs.password.value
                  })
          });
               const responseData = await response.json();
               if (!response.ok){
                  throw new Error(responseData.message);  {/* if there is 404 error or form data same then stop auth and show code */}
               }
  
                console.log(responseData);
                 setIsLoading(false); {/* when data is loded then turn off loader */}
                  auth.login(); {/* when data is correct then show the dashbord */}
              } catch (err) {
                    
                    setIsLoading(false); // when content is loded then don't show loading msg
                    setError(err.message || 'Something went wrong, please try again. '); {/*if there is any error show msg*/} 
              }


        }else{ 
        {/* This is sending data from front-end to backend*/}

            try {
               
              const response = await fetch('http://localhost:5000/api/users/singup',{
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    name:formState.inputs.name.value,
                    email:formState.inputs.email.value,
                    password:formState.inputs.password.value
                })
        });
             const responseData = await response.json();
             if (!response.ok){
                throw new Error(responseData.message);  {/* if there is 404 error or form data same then stop auth and show code */}
             }

              console.log(responseData);
               setIsLoading(false); {/* when data is loded then turn off loader */}
                auth.login(); {/* when data is correct then show the dashbord */}
            } catch (err) {
                  
                  setIsLoading(false); // when content is loded then don't show loading msg
                  setError(err.message || 'Something went wrong, please try again. '); {/*if there is any error show msg*/} 
            }
        }
        
    };

    {/*this is for to pass error to error null mean remove */}
    const  errorHandler = () => {
        setError(null);
    };
      

 return (
 <React.Fragment>
  <ErrorModal  error={error} onClear={errorHandler} />
 <Card className="authentication">
 {isLoading && <LoadingSpinner asOverlay />}
 <h2>Login Form</h2>
 <hr/>
     <form onSubmit={authSubmitHandler}>
     {!isLoginMode && 
         <Input
             element="input"
             id="name"
             type="text"
             label="Your Name"
             validators={[VALIDATOR_REQUIRE()]}
             errorText="Please Enter a name"
             onInput={inputHandler}
         />
     }
        <Input 
          element="input" 
          id="email"
          type="email"
          label="E-mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please Enter a correct Email"
          onInput={inputHandler}
           />

       <Input 
          element="input" 
          id="password"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please Enter a correct password min 5 char"
          onInput={inputHandler}
           />

           <Button type="submit" disabled={!formState.isValid}>
               {isLoginMode ? 'LOGIN' : 'SIGNUP'}
           </Button>
        </form>
        {/*If islogin mode true mean we are on login page then show signup else login*/}
        <Button inverse onClick={switchModeHandler}>    SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}</Button>
 </Card>

 </React.Fragment>
 )
};

export default Auth;