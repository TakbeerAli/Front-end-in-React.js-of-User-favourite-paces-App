import React from "react";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/UIElements/Button";

import PlaceItem from "./PlaceItem";

import "./PlaceList.css";

const PlaceList = props =>{  {/** if there is no data then show this message **/}
if(props.items.length === 0){  
    return   <div className="place-list center">
        <Card>
            <h2>No Places Found , You can create 1</h2>
            <Button to="/places/new">shared Place</Button>
        </Card>

        </div>
    
};

return (
    <ul className="place-list">{/** sending data to PlaceItem component **/}
                 

    {props.items.map(place =>(
        <PlaceItem                     
          key={place.id}
          id={place.id}
          image={place.imageUrl}
          title={place.title}
          description={place.description}
          address={place.address}
          createId={place.creator}
          coordinate={place.location}
        
         />
    ))}


    </ul>
)

};


export default PlaceList;