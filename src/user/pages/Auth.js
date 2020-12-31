import React,{useState, useContext} from 'react';
import Input from "../../shared/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/UIElements/Button";
import { VALIDATOR_EMAIL,VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm }from "../../shared/hooks/form-hook";
import { AuthContext } from '../../shared/context/auth-context';

import  './Auth.css';



const Auth = () =>{

     const auth = useContext(AuthContext);

    const [isLoginMode, setIsLoginMode] = useState(true);
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

    const authSubmitHandler =event =>{
        event.preventDefault();
        console.log(formState.inputs);
        auth.login();
    };

 return <Card className="authentication">
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
};

export default Auth;