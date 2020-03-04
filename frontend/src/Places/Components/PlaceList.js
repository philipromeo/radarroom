import React from "react";

import Button from "../../Shared/Components/FormElements/Button";
import Card from "../../Shared/Components/UIElements/Card";
import PlaceItem from "./PlaceItem";
import "./PlaceList.css";
import Auth from "../../Users/Pages/Auth";

const PlaceList = props => {
  if (Auth.userId === props.creator && props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. Maybe create one?</h2>
          <Button to="/places/new">Share Place</Button>
        </Card>
      </div>
    );
  } else {
    return (
      <ul className="place-list">
        {props.items.map(place => (
          <PlaceItem
            key={place.id}
            id={place.id}
            image={place.image}
            title={place.title}
            description={place.description}
            address={place.address}
            leaseTime={place.leaseTime}
            price={place.price}

            //date={place.date} 
            //placesAvailble={place.placesAvailbles}
            
            creatorId={place.creator}
            coordinates={place.location}
            onDelete={props.onDeletePlace}
          />
        ))}
      </ul>
    );
  }
};

export default PlaceList;
