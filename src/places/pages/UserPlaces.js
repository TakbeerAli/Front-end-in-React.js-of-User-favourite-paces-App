import React from "react";
import { useParams } from "react-router-dom";
import PlaceList from "../components/PlaceList"; 



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

]

const UserPlaces = () =>{

{/** sending data to PlaceList component **/}
const  userId = useParams().userId;  {/** take userID value from url **/}
const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId); {/** match  the urlid with creator id and then show filter record **/}
return <PlaceList  items={loadedPlaces}/>   ;  {/** sending data to PlaceList component **/}
};

export default UserPlaces;