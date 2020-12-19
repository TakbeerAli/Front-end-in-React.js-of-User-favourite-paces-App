import React from "react";
import { useParams } from 'react-router-dom';
import Input from "../../shared/FormElements/Input";
import Button from "../../shared/FormElements/Button";
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_MAX}  from "../../shared/util/validators";
import {useForm} from "../../shared/hooks/form-hook";

const DUMMY_PLACES =[
    {
        id:'p1',
        title:'Empire of kurlus usaman',
        description:'this is the place of ghazi usman',
        imageUrl:'https://picsum.photos/200/300',
        address:'Turkey,02,istabul',
        coordinate:{
            lat:41.0082 ,
            lng:28.9784
        },
        creator:'u1'
    },
    {
        id:'p2',
        title:'Empire of kurlus usaman',
        description:'this is the place of ghazi usman',
        imageUrl:'https://picsum.photos/200/300',
        address:'Turkey,02,istabul',
        coordinate:{
            lat:41.0082 ,
            lng:28.9784
        },
        creator:'u2'
    },
    {
        id:'p3',
        title:'Empire of kurlus usaman',
        description:'this is the place of ghazi usman',
        imageUrl:'https://picsum.photos/200/300',
        address:'Turkey,02,istabul',
        coordinate:{
            lat:41.0082 ,
            lng:28.9784
        },
        creator:'u2'
    },

];

const UpdatePlace = () =>{ 
    const placeId = useParams().placeId; 
    const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);

    {/** this is custom hook we can import every where we need it for update and create  */}
    const [formState,inputHandler ]=useForm({
        title: {
          value: identifiedPlace.title,
          isValid: true
        },
        description: {
          value: identifiedPlace.description,
          isValid: true
        }
        
      }, true);

         {/**This is for to submit data to backend */}
const placeUpdateSubmitHandler = event => {
 event.preventDefault();
  console.log(formState.inputs);
     };

     {/**this is for if place not find then show this message */}
    if(!identifiedPlace){
        return(
            <div className="center">
                <h2>Could not find Place!</h2>
            </div>
        );
    }

    return <form  className="place-form" onSubmit={placeUpdateSubmitHandler}>
    <Input
     id="title"
     element="input" 
     type="text" 
     label="Title" 
     validators={[VALIDATOR_REQUIRE()]} 
     errorText="Please enter valid Titel" 
     onInput={inputHandler}
     
     initialValue={formState.inputs.title.value}  
     initialValid={formState.inputs.title.isValid}
     />

<Input
     id="description"
     element="textarea"
     label="Description" 
     validators={[VALIDATOR_MINLENGTH(5)]}
     errorText="Please enter valid description between 5 " 
     onInput={inputHandler}
     
     initialValue={formState.inputs.description.value} 
     initialValid={formState.inputs.description.isValid}
     />
     
     <Button type="submit" disabled={!formState.isValid}>
          UPDATE PLACE
     </Button>
</form>;
};



export default UpdatePlace;