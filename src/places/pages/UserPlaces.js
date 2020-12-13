import React from "react";
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

]

const UserPlaces = () =>{
{/** sending data to PlaceList component **/}
return <PlaceList  items={DUMMY_PLACES}/>  
};

export default UserPlaces;